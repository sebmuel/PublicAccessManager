﻿using Shared;

namespace DefaultPublicAccessManager.Errors;

public class DefaultPageConfigErrors
{
    public static Error NotFound => Error.NotFound("DefaultPageConfig.NotFound",
        "Default page config not found. Make sure to include them in the appsettings");
}