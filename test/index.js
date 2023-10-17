import assert from 'node:assert';
import { AvantiApi, lookups as avantiLookups } from '../index.js';
import * as config from './config.js';
describe('node-avanti-api', () => {
    let avanti;
    before(() => {
        avanti = new AvantiApi(config.config);
    });
    it('Gets employees', async () => {
        const employees = await avanti.getEmployees({
            locations: [config.employees_locationCode],
            skip: 0,
            take: 10,
            active: 1
        });
        console.log(employees);
        assert.ok(employees.success);
        assert.ok(employees.response.employees.length > 0);
    });
    it('Gets employee job data', async () => {
        const jobData = await avanti.getEmployeeJobData(config.timeEntry_empNo);
        console.log(jobData);
        assert.ok(jobData.success);
        assert.ok(Object.hasOwn(jobData.response, 'employeeJobInfo'));
    });
    it('Gets employee personal info', async () => {
        const jobData = await avanti.getEmployeePersonalInfo(config.timeEntry_empNo);
        console.log(jobData);
        assert.ok(jobData.success);
        assert.ok(Object.hasOwn(jobData.response, 'surname'));
    });
    it('Gets time entries', async () => {
        const timeEntries = await avanti.getTimeEntries(config.timeEntry_viewId, config.timeEntry_templateId, { empNo: config.timeEntry_empNo, date: '2020-01-01' });
        console.log(timeEntries);
        assert.ok(timeEntries.success);
        assert.ok(timeEntries.response.length > 0);
    });
    it('Gets time entry templates', async () => {
        const timeEntryTemplates = await avanti.getTimeEntryTemplates({
            viewId: config.timeEntry_viewId,
            empNo: config.timeEntry_empNo
        });
        console.log(timeEntryTemplates);
        assert.ok(timeEntryTemplates.success);
        assert.ok(timeEntryTemplates.response.length > 0);
    });
    it('Gets report', async () => {
        const report = await avanti.getReport(config.reporter_reportId);
        console.log(report);
        assert.ok(report.success);
        assert.ok(report.response.length > 0);
    });
    describe('callApi()', () => {
        it('Calls API directly successfully', async () => {
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
        it('Calls API directly without permission', async () => {
            const response = await avanti.callApi('/v1/CompanyInfo/Logo', {
                method: 'get',
                getParameters: {
                    height: 100,
                    width: 100
                }
            });
            console.log(response);
            assert.strictEqual(response.success, false);
            assert.ok(response.error.status >= 400);
            assert.ok(response.error.status < 500);
        });
        it('Calls API directly with a non-existent endpoint', async () => {
            const response = await avanti.callApi('/v1/FakeEndpoint', {
                method: 'get'
            });
            console.log(response);
            assert.strictEqual(response.success, false);
            assert.ok(response.error.status >= 600);
            assert.ok(response.error.status < 700);
        });
    });
    it('Looks up phone types', () => {
        assert.ok(avantiLookups.phoneTypes[1].isWork);
    });
});
