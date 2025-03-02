import {UMB_DOCUMENT_ENTITY_TYPE} from "@umbraco-cms/backoffice/document";
import {ManifestEntityAction} from "@umbraco-cms/backoffice/entity-action";
import {DEFAULT_PUBLIC_ACCESS_PERMISSION} from "./permission/manifest.ts";

export const manifest: ManifestEntityAction = {
    type: "entityAction",
    kind: "default",
    alias: "PublicAccessManager.Backoffice.PublicAccessEntityAction",
    name: "Public Access Manager Backoffice Entity Action",
    weight: 200,
    api: () => import("./default-access.action.ts"),
    elementName: 'umb-public-access-entity-action',
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
    meta: {
        icon: "icon-lock",
        label: "Default Public Access",
        additionalOptions: true,
    },

    conditions: [
        {
            alias: "Umb.Condition.UserPermission.Document",
            oneOf: [DEFAULT_PUBLIC_ACCESS_PERMISSION],
        }
    ]
};
