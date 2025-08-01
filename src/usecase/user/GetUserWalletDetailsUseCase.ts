import { inject, injectable } from "tsyringe";
import { IWalletEntity } from "../../entities/models/wallet.entity";
import { IGetUserWalletDetailsUseCase } from "../../entities/useCaseInterfaces/user/IGetUserWalletDetailsUseCase";
import { IWalletRepository } from "../../entities/repositoryInterface/wallet/IWalletRepository";
import { mapWalletData } from "../../shared/utils/MappingToWalletData";
import { IWalletDto } from "../../shared/dtos/wallet.dto";

@injectable()
export class GetUserWalletDetailsUseCase implements IGetUserWalletDetailsUseCase {
    constructor(
        @inject("IWalletRepository") private _walletRepo:IWalletRepository
    ) {}

    async execute(userId: string): Promise<IWalletDto | null> {
        try {
        const walletDetails = await this._walletRepo.findByUserId(userId,"client");

        if (!walletDetails) {
            return null;
        }
        let result = mapWalletData(walletDetails)
        return result;
        } catch (error) {
        throw new Error(`Error fetching wallet details: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
}