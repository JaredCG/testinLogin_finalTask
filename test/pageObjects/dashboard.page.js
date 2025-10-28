export default class DashboardPage {
    get title() { return $('.app_logo'); }

    async getHeaderText() {
        return await this.title.getText();
    }
}
