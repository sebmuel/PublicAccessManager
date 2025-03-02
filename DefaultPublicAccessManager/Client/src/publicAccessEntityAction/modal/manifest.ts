import {ManifestModal} from "@umbraco-cms/backoffice/modal";

export const manifest: ManifestModal = {
    type: "modal",
    alias: "PublicAccessManager.Backoffice.PublicAccessEntityActionModal",
    name: "Public Access Manager Backoffice Entity Action Modal",
    element: () => import("./default-acces.modal.ts")
}