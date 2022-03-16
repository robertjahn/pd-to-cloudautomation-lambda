# pd-to-cloudautomation-lambda

## Installing

- Clone this repo - `git clone https://github.com/martindstone/pd-to-cloudautomation-lambda.git`
- Change directory to the root of this project - `cd pd-to-cloudautomation-lambda`
- Install the dependencies - `npm install`
- zip up the contents of this directory (example on Mac: `zip -r myzip.zip *`)
- Create a Node 14 lambda in AWS with basic execution permissions, and upload the zip file
- Add an API Gateway trigger - choose Create an API, API Type: HTTP, Security: Open
- Make a note of the API Endpoint; you will use this as the webhook destination when you create your Event Rule in PagerDuty
- Create or copy a PagerDuty API Key (available in your PagerDuty domain in Integrations > API Access Keys > Create New Key)
- Get your Cloud Automation hostname (the host part of the URL you use to log in to Cloud Automation, e.g. `abc12345.cloudautomation.live.dynatrace.com`)
- Get your Cloud Automation API token by clicking on the little person at the top right of the Cloud Automation portal
- In your Lambda under Configuration > Environment variables, set the following variables:

  | Name | Value |
  | ---- | ----- |
  | cahost | _your Cloud Automation hostname_ |
  | catoken | _your Cloud Automation API token_ |
  | token | _your PagerDuty API key_ |

- Click Save
