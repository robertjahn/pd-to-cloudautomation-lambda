# pd-to-keptn-lambda

## Installing

- Clone this repo
- `npm install`
- zip up the contents of this directory (example on Mac: `zip -r myzip.zip *`)
- Create a Node 14 lambda in AWS with basic execution permissions, and upload the zip file
- Add an API Gateway trigger - choose Create an API, API Type: HTTP, Security: Open
- Make a note of the API Endpoint; you will use this as the webhook destination when you create your Event Rule in PagerDuty
- Create or copy a PagerDuty API Key (available in your PagerDuty domain in Integrations > API Access Keys > Create New Key)
- Get your Keptn hostname (the host part of the URL you use to log in to Cloud Automation, e.g. `abc12345.cloudautomation.live.dynatrace.com`)
- Get your Keptn API token by clicking on the little person at the top right of the Clout Automation portal
- In your Lambda under Configuration > Environment variables, set the following variables:

  | Name | Value |
  | ---- | ----- |
  | keptnhost | _your Keptn hostname_ |
  | keptntoken | _your Keptn API token_ |
  | token | _your PagerDuty API key_ |

- Click Save
