import { test, expect } from '../../fixtures/API/fixtures.js';
import urls from '../../data/API/urls.json';
import updateData from '../../data/API/updateData.json';
import partialData from '../../data/API/partialUpdateData.json';

test("TC05 - Authotized user can update single booking", async({request, token, bookingId}) => {
    // Precondition - booking id exists, user is authorized
    // url /booking/{id}, method PUT
    const response = await request.put(`${urls.booking}/${bookingId}`, {data:updateData, headers: {"Content-Type":"application/json", "Accept":"application/json", "Cookie":`token=${token}`}});

    // response status should be 200 OK
    expect (response.status()).toBe(200);
    expect (response.ok()).toBeTruthy();  
});

test("TC06 - User who is not authorized can not update booking", async({request, bookingId}) => {
    // User is not authorized
    // url /booking/{id}, method PUT
    const response = await request.put(`${urls.booking}/${bookingId}`, {data:updateData, headers: {"Content-Type":"application/json", "Accept":"application/json"}});

    // response status should be 403 FORBIDDEN
    expect (response.status()).toBe(403);
});

test("TC07 - Authorized user can partial update single booking", async({request, token, bookingId}) => {
    // Precondition - user is authorized, booking id exists
    const response = await request.patch(`${urls.booking}/${bookingId}`, {data:partialData, headers: {"Content-Type":"application/json", "Accept":"application/json", "Cookie":`token=${token}`}});

    expect (response.status()).toBe(200);
    expect (response.ok()).toBeTruthy();
});

test("TC08 - User who is not authorized can not partial update single booking", async({request,bookingId}) => {
    // Precondition - user is not authorized, booking id exists
    const response = await request.patch(`${urls.booking}/${bookingId}`, {data:partialData, headers: {"Content-Type":"application/json", "Accept":"application/json"}});

    // response status should be 403
    expect (response.status()).toBe(403);
});