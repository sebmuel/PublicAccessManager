import {UmbEntryPointOnInit} from '@umbraco-cms/backoffice/extension-api';
import PublicAccessEntityAction from "../publicAccessEntityAction/index.ts";
import {UMB_AUTH_CONTEXT} from '@umbraco-cms/backoffice/auth';
import {client} from "../api";


export const onInit: UmbEntryPointOnInit = (_host, _extensionRegistry) => {

    // setup authentication for the management api
    _host.consumeContext(UMB_AUTH_CONTEXT, async (ctx) => {
        const config = ctx.getOpenApiConfiguration();

        client.setConfig({
            baseUrl: config.base,
            credentials: config.credentials
        });

        client.interceptors.request.use(async (request, _) => {
            const token = await config.token();
            if (token) {
                request.headers.set("Authorization", `Bearer ${token}`);
            }
            return request;
        })
    })

    _extensionRegistry.registerMany(PublicAccessEntityAction);
};

