export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Public Access Manager Backoffice Entrypoint",
    alias: "PublicAccessManager.Backoffice.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  }
];
