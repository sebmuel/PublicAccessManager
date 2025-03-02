import {
    UmbEntityActionArgs,
    UmbEntityActionBase,
    UmbRequestReloadChildrenOfEntityEvent,
    UmbRequestReloadStructureForEntityEvent,
} from "@umbraco-cms/backoffice/entity-action";
import {UmbControllerHostElement} from "@umbraco-cms/backoffice/controller-api";
import {DEFAULT_ACCESS_MODAL} from "./modal/public-acess-modal.token.ts";
import {UMB_MODAL_MANAGER_CONTEXT} from "@umbraco-cms/backoffice/modal";
import {UMB_ACTION_EVENT_CONTEXT} from "@umbraco-cms/backoffice/action";
import {DocumentService} from "../api/services.gen.ts";
import {UMB_NOTIFICATION_CONTEXT} from "@umbraco-cms/backoffice/notification";

export class DefaultAccessAction extends UmbEntityActionBase<never> {
    constructor(
        host: UmbControllerHostElement,
        args: UmbEntityActionArgs<never>
    ) {
        super(host, args);
    }

    override async execute() {
        if (!this.args.unique) throw new Error('Unique is not available');
        const modalManager = await this.getContext(UMB_MODAL_MANAGER_CONTEXT);
        const pageConfig = await this.getPageConfig();
        if (!pageConfig) throw new Error("Could not get page config");
        const modal = modalManager.open(this, DEFAULT_ACCESS_MODAL, {
            data: {
                unique: this.args.unique,
                errorPageId: pageConfig.errorPageId,
                loginPageId: pageConfig.loginPageId
            }
        });
        await modal.onSubmit();
        await this.#requestReloadEntity();
    }

    async getPageConfig() {
        const notification = await this.getContext(UMB_NOTIFICATION_CONTEXT);
        const {error, data} = await DocumentService.getUmbracoManagementApiV1DocumentPublicAccessDefaultPages();

        console.log(error, data);
        if (error) {
            notification.peek("danger", {
                data: {
                    message: "Could not get default access pages check your appsettings"
                }
            });
            return;
        }

        return data;
    }

    async #requestReloadEntity() {
        const actionEventContext = await this.getContext(UMB_ACTION_EVENT_CONTEXT);

        const entityStructureEvent = new UmbRequestReloadStructureForEntityEvent({
            unique: this.args.unique,
            entityType: this.args.entityType,
        });

        const entityChildrenEvent = new UmbRequestReloadChildrenOfEntityEvent({
            unique: this.args.unique,
            entityType: this.args.entityType,
        });

        actionEventContext.dispatchEvent(entityStructureEvent);
        actionEventContext.dispatchEvent(entityChildrenEvent);
    }
}

export default DefaultAccessAction;