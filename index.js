const { default: axios } = require('axios');

exports.handler = async (event) => {
  if (event.requestContext.http.method != 'POST') {
    return { statusCode: 200, body: 'ok' };
  }
  let keptnhost, keptntoken, incidentID, token;
  try {
    keptnhost = process.env.keptnhost;
    keptntoken = process.env.keptntoken;
    token = process.env.token;
    const body = JSON.parse(event.body);
    incidentID = body.__pd_metadata.incident.id;
  } catch (e) {
    return { statusCode: 200, body: 'required environment not supplied' };
  }

  const url = `https://api.pagerduty.com/incidents/${incidentID}/alerts`;
  const headers = {
    'Authorization': `Token token=${token}`,
    'Accept': 'application/vnd.pagerduty+json;version=2',
  };
  const config = {
    url,
    headers,
    method: 'GET',
  };
  let alert, r;
  try {
    r = await axios.request(config);
    alert = r.data.alerts[0];
  } catch (e) {
    return ({
      statusCode: 200,
      body: `Couldn't get alerts from incident ${incidentID}`,
    });
  }
  let keptnBody;
  try {
    const project = alert.body.cef_details.source_origin;
    const stage = alert.body.cef_details.event_class;
    const service = alert.body.cef_details.source_component;
    const task = alert.body.cef_details.service_group;
    const shkeptncontext = alert.body.details.shkeptncontext;
    const triggeredid = alert.body.details.triggeredid;
    const incidentURL = alert.incident.html_url;
  
    keptnBody = {
      "data": {
        project,
        stage,
        service,
        "status": "succeeded",
        "result": "pass",
        openticket: {
          incidentURL,
        },
        labels: {
          incidentURL,
        },
      },
      "source": "pagerduty",
      "specversion": "1.0",
      "type": `sh.keptn.event.${task}.finished`,
      shkeptncontext,
      triggeredid,
    };
  } catch (e) {
    return ({
      statusCode: 200,
      body: 'error building keptn request body'
    });
  }

  try {
    r = await axios.request({
      url: `https://${keptnhost}/api/v1/event`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-token': keptntoken,
      },
      data: JSON.stringify(keptnBody),
    });  
  } catch (e) {
    return ({
      statusCode: 200,
      body: 'error sending request to keptn'
    })
  }

  return ({
    statusCode: 200,
    body: `keptn response status ${r.statusCode}`
  });
};
