import {UmbModalToken} from "@umbraco-cms/backoffice/modal";

export interface DefaultAccessModalData {
    unique: string;
    errorPageId: string;
    loginPageId: string;
}

export interface DefaultAccessModalValue {
}

export const DEFAULT_ACCESS_MODAL = new UmbModalToken<DefaultAccessModalData, DefaultAccessModalValue>(
    "PublicAccessManager.Backoffice.PublicAccessEntityActionModal",
    {
        modal: {
            type: "sidebar",
            size: "medium"
        }
    }
)