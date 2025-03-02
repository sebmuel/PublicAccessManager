import { UMB_CURRENT_USER_CONTEXT } from "@umbraco-cms/backoffice/current-user";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import {customElement, html } from "@umbraco-cms/backoffice/external/lit";

@customElement("default-page-config-dashboard")
class DefaultPageConfigDashboard extends UmbElementMixin(HTMLElement){

    constructor() {
        super();
        this.consumeContext(UMB_CURRENT_USER_CONTEXT, (context) => {
            console.log(context.getFallbackPermissions());
        })
    }

    render(){
        return html`
            <p>asd</p>
        `
    }

}


export default DefaultPageConfigDashboard;