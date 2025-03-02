import {ManifestRepository} from "@umbraco-cms/backoffice/extension-registry";
import {DefaultAccessRepository} from "./default-access.repository.ts";

export const manifest: ManifestRepository = {
    type: "repository",
    alias: "PublicAccessManager.Backoffice.PublicAccessEntityActionRepository",
    name: "Public Access Manager Backoffice Entity Action Repository",
    api: DefaultAccessRepository,
};
