import { LoginPage } from '../../pages/UI/LoginPage';
import loginData from '../../data/UI/loginData.json';
import urls from '../../data/UI/urls.json';

class EmployeeApi {
    constructor(page) {
        this.page = page;
        this.empNumbers = [];
        this.userIds = [];
    }

    async login() {
        const login = new LoginPage(this.page);
        await login.loginUser(loginData.admin.username, loginData.admin.password);
        await this.page.waitForURL(/dashboard/);
    }

    async setup() {
    await this.login();
    return this;
    }

    async createEmployee(firstName, lastName, middleName = '') {
        // creating employee with api request
        const response = await this.page.request.post(urls.apiEmployees, {
            data: { firstName, middleName, lastName, empPicture: null,
                    employeeId: String(Date.now()).slice(-6) },
        });
        const body = await response.json();
        this.empNumbers.push(body.data.empNumber);
        return body.data.empNumber;
    }

    async createUser(username, password, empNumber, userRoleId = 2) {
        // creating user with api request
    const response = await this.page.request.post(urls.apiUsers, {
        data: { username, password, status: true, userRoleId, empNumber },
    });
    const body = await response.json();
    this.userIds.push(body.data.id);
}
    async deleteUserByUsername(username) {
    const response = await this.page.request.get(`${urls.apiUsers}?username=${username}`);
    const body = await response.json();
    const ids = body.data.map((u) => u.id);
    if (ids.length) {
        await this.page.request.delete(urls.apiUsers, { data: { ids } });
    }
}

    async cleanup() {
        if (this.userIds.length)
            await this.page.request.delete(urls.apiUsers, { data: { ids: this.userIds } });
        if (this.empNumbers.length)
            await this.page.request.delete(urls.apiEmployees, { data: { ids: this.empNumbers } });
    }
}

module.exports = { EmployeeApi };