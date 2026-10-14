import { test as base, expect } from '@playwright/test';
import loginData from '../../data/API/loginData.json'
import urls from '../../data/API/urls.json'

export const test = base.extend({

    // Authentication fixture
    token: async ({ request }, use) => {
        const response = await request.post(urls.login, {
            data: loginData,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        expect(response.ok()).toBeTruthy();

        const json = await response.json();
        await use(json.token);
    },

    // Booking ID fixture
    bookingId: async ({ request }, use) => {
        const response = await request.get(urls.booking);

        expect(response.status()).toBe(200);

        const bookings = await response.json();

        expect(bookings.length).toBeGreaterThan(0);

        const id = bookings[0].bookingid;

        await use(id);
    },

});

export { expect };