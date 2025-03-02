import {manifest as Action} from "./manifest.ts";
import {manifest as Modal} from "./modal/manifest.ts";
import {manifest as Repository} from "./repository/manifest.ts";


const manifests: Array<UmbExtensionManifest> = [Action, Modal, Repository];

export default manifests;