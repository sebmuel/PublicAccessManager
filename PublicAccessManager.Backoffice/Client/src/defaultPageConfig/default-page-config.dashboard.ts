import {customElement, html} from "@umbraco-cms/backoffice/external/lit";
import {UmbLitElement} from "@umbraco-cms/backoffice/lit-element";

@customElement("default-page-config-dashboard")
class DefaultPageConfigDashboard extends UmbLitElement {

    constructor() {
        super();
    }

    render() {
        return html`
            <div></div>
        `
    }

}


export default DefaultPageConfigDashboard;

declare global {
    interface HTMLElementTagNameMap {
        'my-welcome-default-page-config-dashboard': DefaultPageConfigDashboard;
    }
}