import {Base} from '../../utils/UI/base';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.base = new Base(page);
    }
    async loginUser(username, password) {        
        await this.base.fillByPlaceholder('Username', username);
        await this.base.fillByPlaceholder('Password', password);
        await this.base.clickBtn('Login');
    }
}

