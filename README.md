# Avanti API for Node

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/avanti-api)](https://www.npmjs.com/package/@cityssm/avanti-api)
[![DeepSource](https://app.deepsource.com/gh/cityssm/node-avanti-api.svg/?label=active+issues&show_trend=true&token=HZ0BFvBA6JYP4qZAI5MNS6JL)](https://app.deepsource.com/gh/cityssm/node-avanti-api/)

An unofficial wrapper around the [Avanti API](https://help.avanti.ca/apidocs).

**Note:**
At this time, this project focuses only on read-only endpoints, primarily on the
[`api/v1/Reporter` endpoint](https://help.avanti.ca/apidocs/get-report-data),
and employee data related endpoints.

## Installation

```sh
npm install @cityssm/avanti-api
```

## Usage

⭐ See the Avanti API documentation on
[Authentication and Authorization](https://help.avanti.ca/apidocs/authentication-and-authorization)
for instructions on creating the needed credentials.

Note that each endpoint needs to be properly initialized in Avanti as well.

⭐ If your company is not yet on the
[latest Avanti Self Service Portal (ASSP)](https://help.avanti.ca/support/solutions/articles/36000498186-faq#FAQ-Q:HowdoIknowifmycompanyalreadyhasthelatestASSP?),
be sure to set `latestASSP` to `false`.
The current default is `true`.

```javascript
import { AvantiApi } from '@cityssm/avanti-api'

// Initialize the API
const avanti = new AvantiApi({
  tenant: 'avtesting',
  // latestASSP: false,
  client_id: '',
  client_secret: '',
  username: '',
  password: '',
  company: ''
})

// Export report data
const report = await avanti.getReport('CUSTOM_REPORT_ID')

// Output the data
console.log(report)
```
