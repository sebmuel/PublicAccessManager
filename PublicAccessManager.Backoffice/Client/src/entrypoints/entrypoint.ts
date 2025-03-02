import {UmbEntryPointOnInit} from '@umbraco-cms/backoffice/extension-api';
import PublicAccessEntityAction from "../publicAccessEntityAction/index.ts";
import {UMB_AUTH_CONTEXT} from '@umbraco-cms/backoffice/auth';
import {OpenAPI} from "@umbraco-cms/backoffice/external/backend-api";

export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {
    // setup authentication for the management api
    _host.consumeContext(UMB_AUTH_CONTEXT, async (ctx) => {
        const config = ctx.getOpenApiConfiguration();
        OpenAPI.TOKEN = await config.token()
        OpenAPI.BASE = config.base;
        OpenAPI.CREDENTIALS = config.credentials;
    })

    _extensionRegistry.registerMany(PublicAccessEntityAction);
};

