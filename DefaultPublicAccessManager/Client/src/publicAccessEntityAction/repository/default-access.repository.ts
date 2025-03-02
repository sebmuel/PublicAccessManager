import {UmbRepositoryBase} from "@umbraco-cms/backoffice/repository";
import {DocumentService, PublicAccessRequestModel} from "../../api";
import {UMB_NOTIFICATION_CONTEXT, UmbNotificationContext} from "@umbraco-cms/backoffice/notification";
import {UmbControllerHost} from "@umbraco-cms/backoffice/controller-api";

export class DefaultAccessRepository extends UmbRepositoryBase {
    #notificationContext?: UmbNotificationContext;

    constructor(host: UmbControllerHost) {
        super(host);


        this.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
            this.#notificationContext = instance as UmbNotificationContext;
        });
    }

    async create(unique: string, data: PublicAccessRequestModel) {
        if (!unique) throw new Error('unique is missing');
        if (!data) throw new Error('Data is missing');
        const response = await DocumentService.postDocumentByIdPublicAccess({
            path: {
                id: unique
            },
            body: data,
            parseAs: 'text'
        });
        if (response.response.ok) {
            const notification = {data: {message: `Public access setting created`}};
            this.#notificationContext?.peek('positive', notification);
        }
        return;
    }

    async read(unique: string) {
        if (!unique) throw new Error('unique is missing');

        const {data, error} = await DocumentService.getDocumentByIdPublicAccess({
            path: {
                id: unique
            },
        })
        return {data, error};
    }

    async update(unique: string, data: PublicAccessRequestModel) {
        if (!unique) throw new Error('unique is missing');
        if (!data) throw new Error('Data is missing');

        const response = await DocumentService.putDocumentByIdPublicAccess({
            path: {
                id: unique
            },
            body: data,
            parseAs: "text"
        })

        if (response.response.ok) {
            const notification = {data: {message: `Public access setting updated`}};
            this.#notificationContext?.peek('positive', notification);
        }
        return;
    }

    async delete(unique: string) {
        if (!unique) throw new Error('unique is missing');

        const response = await DocumentService.deleteDocumentByIdPublicAccess({path: {id: unique}, parseAs: "text"});
        if (response.response.ok) {
            const notification = {data: {message: `Public access setting deleted`}};
            this.#notificationContext?.peek('positive', notification);
        }
        return;
    }
}
