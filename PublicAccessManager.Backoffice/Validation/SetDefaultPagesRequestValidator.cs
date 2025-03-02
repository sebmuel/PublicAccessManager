using FluentValidation;
using PublicAccessManager.Backoffice.Models.Requests;

namespace PublicAccessManager.Backoffice.Validation;

internal class SetDefaultPagesRequestValidator : AbstractValidator<SetDefaultPagesRequest>
{
    public SetDefaultPagesRequestValidator()
    {
        RuleFor(x => x.ErrorPageId)
            .NotEmpty()
            .WithMessage("Error page id is required.");

        RuleFor(x => x.LoginPageId)
            .NotEmpty()
            .WithMessage("Login page id is required.");
    }
}