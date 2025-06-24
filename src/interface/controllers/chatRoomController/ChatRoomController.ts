import { inject, injectable } from "tsyringe";
import { Request,Response } from "express";
import { IGetChatRoomUseCase } from "../../../entities/useCaseInterfaces/chatRoom/IGetChatRoomUseCase";
import { CustomRequest } from "../../middlewares/authMiddleware";
import { handleErrorResponse } from "../../../shared/utils/errorHandler";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { ICreateChatRoomUseCase } from "../../../entities/useCaseInterfaces/chatRoom/ICreateChatRoomUseCase";
import { IGetChatRoomByGameIdUseCase } from "../../../entities/useCaseInterfaces/chatRoom/IGetChatRoomByGameIdUseCase";

@injectable()
export class ChatRoomControllers{
    constructor(
        @inject("IGetChatRoomUseCase") private _getChatRoomUseCase:IGetChatRoomUseCase,
        @inject("ICreateChatRoomUseCase") private _createChatRoomUseCase: ICreateChatRoomUseCase,
        @inject("IGetChatRoomByGameIdUseCase") private _getChatRoomByGameIdUseCase:IGetChatRoomByGameIdUseCase,
    ){}
    
    async getChatRooms(req:Request,res:Response):Promise<void>{
        try {
            const userId = (req as unknown as CustomRequest)?.user?.id;
            if(!userId){
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success:false,
                    message:SUCCESS_MESSAGES.FAILED_DATA_FETCH
                })
                return 
            }
            const chatRooms = await this._getChatRoomUseCase.execute(userId);
            console.log("chat rooms ",chatRooms);

            if(!chatRooms){
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    success:false,
                    message:SUCCESS_MESSAGES.FAILED_DATA_FETCH
                })
                return 
            }else{
                res.status(HTTP_STATUS.OK).json({
                    success:true,
                    message:SUCCESS_MESSAGES.DATA_RETRIEVED,
                    data:chatRooms
                })
                return 
            }
        } catch (error:any) {
            handleErrorResponse(res,error)
        }
    }

    async createChatRoom(req:Request,res:Response):Promise<void>{
        try {
            const userId = (req  as CustomRequest)?.user?.id;
            const data = req.body;
            console.log("create chat room data ",data);
            if(!userId){
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success:false,
                    message:SUCCESS_MESSAGES.FAILED_DATA_FETCH
                })
                return 
            }
            const newChatRoom = await this._createChatRoomUseCase.execute(data);
            res.status(HTTP_STATUS.CREATED).json({
                success:true,
                message:SUCCESS_MESSAGES.CREATED,
                data: newChatRoom
            });
        } catch (error:any) {
            handleErrorResponse(res,error)
        }
    }

    async getChatRoomByGameId(req:Request,res:Response):Promise<void>{
        try {
            const gameId = req.query.gameId as string;
            console.log("game",gameId)
            if(!gameId){
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success:false,
                    message:SUCCESS_MESSAGES.FAILED_DATA_FETCH
                })
                return 
            }
            const chatRoom = await this._getChatRoomByGameIdUseCase.execute(gameId);
            if(!chatRoom){
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    success:false,
                    message:SUCCESS_MESSAGES.FAILED_DATA_FETCH
                })
                return 
            }else{
                res.status(HTTP_STATUS.OK).json({
                    success:true,
                    message:SUCCESS_MESSAGES.DATA_RETRIEVED,
                    data:chatRoom
                })
                return 
            }
        } catch (error:any) {
            handleErrorResponse(res,error)
        }
    }
}