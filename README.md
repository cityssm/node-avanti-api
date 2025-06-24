# Avanti API for Node

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/avanti-api)](https://www.npmjs.com/package/@cityssm/avanti-api)
[![DeepSource](https://app.deepsource.com/gh/cityssm/node-avanti-api.svg/?label=active+issues&show_trend=true&token=HZ0BFvBA6JYP4qZAI5MNS6JL)](https://app.deepsource.com/gh/cityssm/node-avanti-api/)

An unofficial wrapper around the [Avanti API](https://avanti.stoplight.io/docs/avanti-api).

**Note:**
At this time, this project focuses only on read-only endpoints, primarily on the
[`api/v1/Reporter` endpoint](https://avanti.stoplight.io/docs/avanti-api/ed0485a9c98bb-get-report-data),
and employee data related endpoints.

## Installation

```sh
npm install @cityssm/avanti-api
```

## Usage

⭐ See the Avanti API documentation on
[Authentication and Authorization](https://avanti.stoplight.io/docs/avanti-api/014f7884ba799-authentication-and-authorization)
for instructions on creating the needed credentials.

Note that each endpoint needs to be properly initialized in Avanti as well.

⭐ If your company is on the
[latest Avanti Self Service Portal (ASSP)](https://help.avanti.ca/support/solutions/articles/36000498186-faq#FAQ-Q:HowdoIknowifmycompanyalreadyhasthelatestASSP?),
be sure to set `latestASSP` to `true`.
The current default is `false`, which will likely change in the `v1.0.0` release.

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
