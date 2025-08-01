import { IWalletDto } from "../../../shared/dtos/wallet.dto";


export interface IGetUserWalletDetailsUseCase {
    execute(userId: string): Promise<IWalletDto | null>
}