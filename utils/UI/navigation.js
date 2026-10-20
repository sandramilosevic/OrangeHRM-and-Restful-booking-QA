class Navigation {
    constructor(page){
        this.page = page;
    }
    async goLink(linkName){
        await this.page.getByRole('link', {name: linkName, exact:true}).click();
    }
}