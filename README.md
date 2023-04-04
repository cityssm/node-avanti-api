# Avanti API for Node

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/avanti-api)](https://www.npmjs.com/package/@cityssm/avanti-api)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e0afb710da074164b3597febe9014a08)](https://app.codacy.com/gh/cityssm/node-avanti-api/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/fbc4a515303a0cdae005/maintainability)](https://codeclimate.com/github/cityssm/node-avanti-api/maintainability)

A wrapper around the [Avanti API](https://avanti.stoplight.io/docs/avanti-api).

**Note:**
At this time, this project focuses only on read-only endpoints and primarily on the
[`api/v1/Reporter` endpoint](https://avanti.stoplight.io/docs/avanti-api/ed0485a9c98bb-get-report-data).

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
import avanti from '@cityssm/avanti-api'

// Initialize the API
avanti.setConfiguration({
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
