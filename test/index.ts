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
    assert.ok(employees.employees.length > 0)
  })

  it('Gets time entries', async () => {
    const timeEntries = await avanti.getTimeEntries(
      config.timeEntry_viewId,
      config.timeEntry_templateId,
      { empNo: config.timeEntry_empNo, date: '2020-01-01' }
    )
    console.log(timeEntries)
    assert.ok(timeEntries.length > 0)
  })

  it('Gets time entry templates', async () => {
    const timeEntryTemplates = await avanti.getTimeEntryTemplates({
      viewId: config.timeEntry_viewId,
      empNo: config.timeEntry_empNo
    })
    console.log(timeEntryTemplates)
    assert.ok(timeEntryTemplates.length > 0)
  })

  it('Gets report', async () => {
    const report = await avanti.getReport(config.reporter_reportId)
    console.log(report)
    assert.ok(report.length > 0)
  })
})
