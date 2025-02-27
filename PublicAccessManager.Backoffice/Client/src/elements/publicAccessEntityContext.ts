import {UmbControllerBase} from "@umbraco-cms/backoffice/class-api";
import {UmbContextToken} from "@umbraco-cms/backoffice/context-api";


export const UMB_PUBLIC_ACCESS_ENTITY_CONTEXT = new UmbContextToken<UmbPublicAccessEntityContext>
(
    "PublicAccessEntityContext.Alias",
    "PublicAccessEntityApi.Alias"
);

export default class UmbPublicAccessEntityContext extends UmbControllerBase {

}