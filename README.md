# Avanti API for Node

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/avanti-api)](https://www.npmjs.com/package/@cityssm/avanti-api)
[![DeepSource](https://app.deepsource.com/gh/cityssm/node-avanti-api.svg/?label=active+issues&show_trend=true&token=HZ0BFvBA6JYP4qZAI5MNS6JL)](https://app.deepsource.com/gh/cityssm/node-avanti-api/)
[![Maintainability](https://api.codeclimate.com/v1/badges/fbc4a515303a0cdae005/maintainability)](https://codeclimate.com/github/cityssm/node-avanti-api/maintainability)

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

```javascript
import { AvantiApi } from '@cityssm/avanti-api'

// Initialize the API
const avanti = new AvantiApi({
  base_api_url: 'https://myavanti.ca/avtesting-api',
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
