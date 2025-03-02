using PublicAccessManager.Backoffice.Errors;
using PublicAccessManager.Backoffice.Interfaces;
using PublicAccessManager.Backoffice.Models.Entities;
using PublicAccessManager.Backoffice.Models.Requests;
using PublicAccessManager.Backoffice.Models.Responses;
using Shared;

namespace PublicAccessManager.Backoffice.Services;

public class DefaultPublicAccessService : IDefaultPublicAccessService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IDefaultPageConfigRepository _defaultPageConfigRepository;

    public DefaultPublicAccessService(IUnitOfWork unitOfWork, IDefaultPageConfigRepository defaultPageConfigRepository)
    {
        _unitOfWork = unitOfWork;
        _defaultPageConfigRepository = defaultPageConfigRepository;
    }

    public async Task<Result<GetDefaultPagesResponse>> GetDefaultPages(CancellationToken token)
    {
        var config = await _defaultPageConfigRepository.GetDefaultPageConfigAsync(token);

        if (config is null)
        {
            return Result<GetDefaultPagesResponse>.ValidationFailure(DefaultPageConfigErrors.NotFound);
        }

        return new GetDefaultPagesResponse(config.ErrorPageId, config.LoginPageId, config.Id);
    }

    public async Task<Result> CreateDefaultPages(SetDefaultPagesRequest request, CancellationToken token)
    {
        var config = DefaultPageConfig.Create(request.ErrorPageId, request.LoginPageId);
        await _defaultPageConfigRepository.CreateDefaultPageConfig(config, token);
        await _unitOfWork.SaveChangesAsync(token);
        return Result.Success();
    }

    public async Task<Result> UpdateDefaultPages(SetDefaultPagesRequest request, CancellationToken token)
    {
        var config = await _defaultPageConfigRepository.GetDefaultPageConfigAsync(token);

        if (config is null)
        {
            return Result<GetDefaultPagesResponse>.ValidationFailure(DefaultPageConfigErrors.NotFound);
        }

        config.Update(request.ErrorPageId, request.LoginPageId);
        await _unitOfWork.SaveChangesAsync(token);
        return Result.Success();
    }

    public async Task<Result> DeleteDefaultPages(Guid id, CancellationToken token)
    {
        var config = await _defaultPageConfigRepository.GetDefaultPageConfigAsync(token);

        if (config is null)
        {
            return Result<GetDefaultPagesResponse>.ValidationFailure(DefaultPageConfigErrors.NotFound);
        }

        _defaultPageConfigRepository.DeleteDefaultPageConfig(config);
        await _unitOfWork.SaveChangesAsync(token);
        return Result.Success();
    }
}