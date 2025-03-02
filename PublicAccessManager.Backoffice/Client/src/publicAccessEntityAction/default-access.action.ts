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
        const modal = modalManager.open(this, DEFAULT_ACCESS_MODAL, {data: {unique: this.args.unique}});
        await modal.onSubmit();
        await this.#requestReloadEntity();
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