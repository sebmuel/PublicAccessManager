﻿# Default Public Access Entity Action

This action allows managing public access by defining default login and error pages. These pages can be configured via
*appsettings.json*.

### Configuration Example:

```json
{
  "DefaultPublicAccess": {
    "LoginPageKey": "<Guid to Content Node>",
    "ErrorPageKey": "<Guid to Content Node>"
  }
}
```

To see and use the action, the user must have the **Default Public Access** entity permission granted.

### Future Enhancements

- A dedicated dashboard to configure the default login and error pages per root node.