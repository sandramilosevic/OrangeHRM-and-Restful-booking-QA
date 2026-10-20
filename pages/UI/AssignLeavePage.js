import { Base } from '../../utils/UI/base';

export class LeavePage {
    constructor(page) {
        this.page = page;
        this.base = new Base(page);
    }

    async goToAssignLeave() {
        await this.base.navigate('Leave', 'Assign Leave', /assignLeave/);
    }

    async assignLeave(leave) {
        await this.base.autocomplete('Employee Name', leave.employeeName);
        await this.base.dropdown('Leave Type', leave.leaveType);
        await this.base.dateInput('From Date', leave.fromDate);
        await this.base.dateInput('To Date', leave.toDate);
        if (leave.partialDays) {
            await this.base.dropdown('Partial Days', leave.partialDays);
        }
        if (leave.startDay) {
            await this.base.dropdown('Start Day', leave.startDay);
        }
        await this.base.clickBtn('Assign');
        await this.base.confirmDialog();
    }
}