import { test, expect } from '../../fixtures/API/fixtures.js';
import urls from '../../data/API/urls.json';

test("TC09 - Authorized user can delete single booking", async ({ request, token, bookingId }) => {
    const response = await request.delete(
        `${urls.booking}/${bookingId}`,{headers: {Cookie: `token=${token}`}});

    // acording to API docs, status should be 200 OK, but it returns 201 CREATED
    // Bug ID - Bug01
    expect(response.status()).toBe(200);
});

test("TC10 - User who is not authorized can not delete booking", async ({ request, bookingId }) => {
    const response = await request.delete(
        `${urls.booking}/${bookingId}`
    );

    expect(response.status()).toBe(403);
});