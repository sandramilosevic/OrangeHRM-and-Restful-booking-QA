import {test, expect} from '@playwright/test';
import urls from '../../data/API/urls.json';
import bookingData from '../../data/API/createData.json'

test("TC04 - Create new booking", async({request}) => {
    // url - /booking, method POST
    const response = await request.post(urls.booking, {data: bookingData, headers:{"Content-Type":"application/json", "Accept":"application/json"}});

    // response status should be 200 OK
    expect (response.status()).toBe(200);
    expect (response.ok()).toBeTruthy();

    const body = await response.json();
    const id = body.bookingid;
    
    expect(id).toBeDefined();
})