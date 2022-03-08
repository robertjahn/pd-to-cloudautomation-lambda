# pd-to-keptn-lambda

## Installing

- Clone this repo
- `npm install`
- zip up the contents of this directory (example on Mac: `zip -r myzip.zip *`)
- Create a Node 14 lambda in AWS with basic execution permissions, and upload the zip file
- Add an API Gateway trigger - choose Create an API, API Type: HTTP, Security: Open
- Make a note of the API Endpoint; you will use this as the webhook destination when you create your Event Rule in PagerDuty
