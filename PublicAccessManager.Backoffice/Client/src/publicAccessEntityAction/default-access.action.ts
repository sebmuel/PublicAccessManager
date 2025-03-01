import {
  UmbEntityActionArgs,
  UmbEntityActionBase,
} from "@umbraco-cms/backoffice/entity-action";
import { UmbControllerHostElement } from "@umbraco-cms/backoffice/controller-api";

export class DefaultAccessAction extends UmbEntityActionBase<never> {
  constructor(
    host: UmbControllerHostElement,
    args: UmbEntityActionArgs<never>
  ) {
    super(host, args);
    console.log(host);
  }

  override async execute() {
    console.log("asd");
  }
}

export default DefaultAccessAction;