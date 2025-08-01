import { IWalletEntity, transactions } from "../../entities/models/wallet.entity";
import { IWalletDto } from "../dtos/wallet.dto";


export function mapWalletData(walletData: IWalletEntity): IWalletDto {
    
    return  {
        userId:walletData.userId,
        userType:walletData.userType,
        transaction:walletData.transaction,
        balance:walletData.balance
    }
}