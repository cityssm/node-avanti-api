import assert from 'node:assert';
import { config } from './config.js';
import * as avanti from '../index.js';
describe('node-avanti-api', () => {
    before(() => {
        avanti.setConfiguration(config);
    });
    it('Gets employees', async () => {
        const employees = await avanti.getEmployees({
            skip: 0,
            take: 10000,
            active: 1
        });
        console.log(employees);
        assert.ok(employees.employees.length > 0);
    });
});
