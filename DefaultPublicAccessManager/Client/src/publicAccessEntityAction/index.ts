import {manifest as Action} from "./manifest.ts";
import {manifest as Modal} from "./modal/manifest.ts";
import {manifest as Repository} from "./repository/manifest.ts";
import {manifest as Permission} from "./permission/manifest.ts";


const manifests: Array<UmbExtensionManifest> = [Action, Modal, Repository, Permission];

export default manifests;