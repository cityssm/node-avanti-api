// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import assert from 'node:assert';
import { before, describe, it } from 'node:test';
import Debug from 'debug';
import { DEBUG_ENABLE_NAMESPACES } from '../debug.config.js';
import { AvantiApi, lookups as avantiLookups } from '../index.js';
import * as config from './config.js';
Debug.enable(DEBUG_ENABLE_NAMESPACES);
await describe('node-avanti-api', async () => {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let avanti;
    before(() => {
        avanti = new AvantiApi(config.config);
    });
    await it('Gets employees', async () => {
        const employees = await avanti.getEmployees({
            locations: [config.employees_locationCode],
            skip: 0,
            take: 10,
            active: 1
        });
        console.log(employees);
        assert.ok(employees.success);
        assert.ok((employees.response.employees?.length ?? 0) > 0);
    });
    await it.skip('Gets employee job data', async () => {
        const jobData = await avanti.getEmployeeJobData(config.timeEntry_empNo);
        console.log(jobData);
        assert.ok(jobData.success);
        assert.ok(Object.hasOwn(jobData.response, 'employeeJobInfo'));
    });
    await it('Gets employee personal info', async () => {
        const jobData = await avanti.getEmployeePersonalInfo(config.timeEntry_empNo);
        console.log(jobData);
        assert.ok(jobData.success);
        assert.ok(Object.hasOwn(jobData.response, 'surname'));
    });
    await it.skip('Gets employee earning codes', async () => {
        const earningCodes = await avanti.getEmployeeEarningCodes(config.timeEntry_empNo);
        console.log(earningCodes);
        assert.ok(earningCodes.success);
    });
    await it.skip('Gets time entries', async () => {
        const timeEntries = await avanti.getTimeEntries(config.timeEntry_viewId, config.timeEntry_templateId, {
            empNo: config.timeEntry_empNo,
            date: '2024-01-07',
            endDate: '2024-01-20'
        });
        console.log(timeEntries);
        assert.ok(timeEntries.success);
        assert.ok(timeEntries.response.length > 0);
    });
    await it.skip('Gets time entry templates', async () => {
        const timeEntryTemplates = await avanti.getTimeEntryTemplates({
            viewId: config.timeEntry_viewId,
            empNo: config.timeEntry_empNo
        });
        console.log(timeEntryTemplates);
        assert.ok(timeEntryTemplates.success);
        assert.ok(timeEntryTemplates.response.length > 0);
    });
    await it.skip('Gets report', async () => {
        const report = await avanti.getReport(config.reporter_reportId);
        console.log(report);
        assert.ok(report.success);
        assert.ok(report.response.length > 0);
    });
    await describe.skip('callApi()', async () => {
        await it('Calls API directly successfully', async () => {
            const response = await avanti.callApi('/v1/Employees', {
                method: 'post',
                bodyParameters: {
                    skip: 0,
                    take: 5,
                    sortDirection: 1
                }
            });
            console.log(response);
            assert.ok(response.success);
        });
        await it('Calls API directly without permission', async () => {
            const response = await avanti.callApi('/v1/CompanyInfo/Logo', {
                method: 'get',
                getParameters: {
                    height: 100,
                    width: 100
                }
            });
            console.log(response);
            assert.strictEqual(response.success, false);
            assert.ok(response.error.status !== undefined);
            assert.ok(response.error.status >= 400);
            assert.ok(response.error.status < 500);
        });
        await it('Calls API directly with a non-existent endpoint', async () => {
            const response = await avanti.callApi('/v1/FakeEndpoint', {
                method: 'get'
            });
            console.log(response);
            assert.strictEqual(response.success, false);
            assert.ok(response.error.status !== undefined);
            assert.ok(response.error.status >= 600);
            assert.ok(response.error.status < 700);
        });
    });
    await it.skip('Looks up phone types', () => {
        assert.ok(avantiLookups.phoneTypes[1].isWork);
    });
});
