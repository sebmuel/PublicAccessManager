import {UmbEntryPointOnInit, UmbEntryPointOnUnload} from '@umbraco-cms/backoffice/extension-api';
import {manifest as PublicAccessEntityAction} from "../publicAccessEntityAction/manifest.ts"
import {manifest as PublicAccessEntityActionRepository} from "../publicAccessEntityAction/repository/manifest.ts"

// load up the manifests here
export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {
    _extensionRegistry.register(PublicAccessEntityAction);
    _extensionRegistry.register(PublicAccessEntityActionRepository);
};

export const onUnload: UmbEntryPointOnUnload = (_host, _extensionRegistry) => {
};
