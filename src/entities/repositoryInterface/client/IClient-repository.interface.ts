

import { IClientEntity } from "../../models/client.entity";
import { ClientProfileResponse } from "../../../shared/responseTypes/clientProfileResponse";
import { IBaseRepository } from "../IBase-repository-interface";

export interface IClientRepository extends IBaseRepository<IClientEntity>{
    // save(data:Partial<IClientEntity>):Promise<IClientEntity>;
    findByEmail(email:string):Promise<IClientEntity | null>;
    find(
        filter:any,
        skip:number,
        limit:number
    ):Promise<{users:IClientEntity[] | [];total:number}>;
    findByIdAndUpdateStatus(id:string):Promise<void>
    findByIdAndUpdatePassWord(id:string,password:string):Promise<void>
    findById(id:string):Promise<IClientEntity | null>
    findByIdAndUpdateWallet(id: string, amount: number): Promise<IClientEntity | null>
    updateFcmToken(id:string,fcmToken:string):Promise<void>;
    revokeFcmToken(id:string):Promise<void>;
    updateProfileById(clientId:string,data:Partial<IClientEntity>):Promise<ClientProfileResponse>;
}