import { UmbRepositoryBase } from "@umbraco-cms/backoffice/repository";

export class DefaultAccessRepository extends UmbRepositoryBase {
  init(): void {
    console.log("hi");
  }
}
