import assert from 'node:assert'

import * as config from './config.js'

import * as avanti from '../index.js'

describe('node-avanti-api', () => {
  before(() => {
    avanti.setConfiguration(config.config)
  })

  it('Gets employees', async () => {
    const employees = await avanti.getEmployees({
      skip: 0,
      take: 10,
      active: 1
    })

    console.log(employees)

    assert.ok(employees.success)
    assert.ok(employees.response.employees.length > 0)
  })

  it('Gets time entries', async () => {
    const timeEntries = await avanti.getTimeEntries(
      config.timeEntry_viewId,
      config.timeEntry_templateId,
      { empNo: config.timeEntry_empNo, date: '2020-01-01' }
    )

    console.log(timeEntries)

    assert.ok(timeEntries.success)
    assert.ok(timeEntries.response.length > 0)
  })

  it('Gets time entry templates', async () => {
    const timeEntryTemplates = await avanti.getTimeEntryTemplates({
      viewId: config.timeEntry_viewId,
      empNo: config.timeEntry_empNo
    })

    console.log(timeEntryTemplates)

    assert.ok(timeEntryTemplates.success)
    assert.ok(timeEntryTemplates.response.length > 0)
  })

  it('Gets report', async () => {
    const report = await avanti.getReport(config.reporter_reportId)

    console.log(report)

    assert.ok(report.success)
    assert.ok(report.response.length > 0)
  })

  describe('callApi()', () => {
    it('Calls API directly successfully', async () => {
      const response = (await avanti.callApi('/v1/Employees', {
        method: 'post',
        bodyParameters: {
          skip: 0,
          take: 5,
          sortDirection: 1
        }
      }))

      console.log(response)
      assert.ok(response.success)
    })

    it('Calls API directly without permission', async () => {
      const response = await avanti.callApi('/v1/CompanyInfo/Logo', {
        method: 'get',
        getParameters: {
          height: 100,
          width: 100
        }
      })

      console.log(response)

      assert.strictEqual(response.success, false)
      assert.ok(response.error.status >= 400)
      assert.ok(response.error.status < 500)
    })

    it('Calls API directly with a non-existent endpoint', async () => {
      const response = await avanti.callApi('/v1/FakeEndpoint', {
        method: 'get'
      })

      console.log(response)

      assert.strictEqual(response.success, false)
      assert.ok(response.error.status >= 600)
      assert.ok(response.error.status < 700)
    })
  })
})
