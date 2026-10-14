import { test, expect } from '../../fixtures/API/fixtures.js';
import urls from '../../data/API/urls.json';

test("TC02 - Return all bookings ID", async({request}) => {
    // url - /booking, method - GET
    const response = await request.get(urls.booking);

    // response status should be OK
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
});

test("TC03 - Return single booking details by ID", async({request, bookingId}) => {
    // url /booking/{id}, method - GET
    const response = await request.get(`${urls.booking}/${bookingId}`);

    // response status should be OK
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
})