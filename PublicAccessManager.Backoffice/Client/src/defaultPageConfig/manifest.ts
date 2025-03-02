import {ManifestDashboard} from "@umbraco-cms/backoffice/dashboard";


// TODO: CHECK why i cant set an additional condition for 'Umb.Condition.UserPermission.Document' with my custom permission
export const manifest: ManifestDashboard = {
    type: 'dashboard',
    alias: "default-page-config.dashboard",
    name: "Default Page Config Dashboard",
    element: () => import('./default-page-config.dashboard'),
    weight: -100,
    meta: {
        label: 'Public Access Default Pages',
        pathname: 'default-page-config',
    },
    conditions: [
        {
            alias: "Umb.Condition.SectionAlias",
            match: "Umb.Section.Content"
        }
    ]
}