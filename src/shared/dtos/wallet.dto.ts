import { transactions } from "../../entities/models/wallet.entity";

export interface IWalletDto{
    userId: string;
    userType: string; 
    transaction:transactions[];
    balance: number;
}