import { inject, injectable } from "tsyringe";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { IUpdateTurfPassWordUseCase } from "../../entities/useCaseInterfaces/turf/IUpdateTurfPasswordUseCase";

@injectable()
export class UpdateTurfPassWordUseCase implements IUpdateTurfPassWordUseCase{
    clientRepo: any;
    constructor(
        @inject("ITurfRepository") private turfRepo: ITurfRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt:IBcrypt
    ){}
    async execute(userId: string, currentPassword: string, newPassword: string): Promise<void> {
        const user = await this.turfRepo.findById(userId);

        if(!user){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }
        const isPasswordMatch = await this.passwordBcrypt.compare(currentPassword,user.password);
        if(!isPasswordMatch){
            throw new CustomError(
                ERROR_MESSAGES.WRONG_CURRENT_PASSWORD,
                HTTP_STATUS.BAD_REQUEST
            )
        }
        const isCurrentMatchWithOld = await this.passwordBcrypt.compare(newPassword,user.password);
        if(isCurrentMatchWithOld){
            throw new CustomError(
                ERROR_MESSAGES.SAME_CURR_NEW_PASSWORD,
                HTTP_STATUS.BAD_REQUEST
            )
        }
        
        const hashedPassword = await this.passwordBcrypt.hash(newPassword)
        await this.turfRepo.findByIdAndUpdatePassWord(userId,hashedPassword);

    }
}