import {ManifestEntityUserPermission} from "@umbraco-cms/backoffice/user-permission";
import {UMB_DOCUMENT_ENTITY_TYPE} from "@umbraco-cms/backoffice/document";

export const DEFAULT_PUBLIC_ACCESS_PERMISSION = "Default.Public.Access";

export const manifest: ManifestEntityUserPermission = {
    type: 'entityUserPermission',
    alias: 'PublicAccessManager.Backoffice.PublicAccessEntityActionPermission',
    name: 'Public Access Manager Backoffice Entity Action Permission',
    forEntityTypes: [UMB_DOCUMENT_ENTITY_TYPE],
    meta: {
        label: "Default Public Access",
        verbs: [DEFAULT_PUBLIC_ACCESS_PERMISSION],
        description: "Lets you manage public access for a document with default login page and error page",
        group: "administration"
    }
}