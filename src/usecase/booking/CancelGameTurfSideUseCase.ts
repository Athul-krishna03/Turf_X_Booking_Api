import { inject, injectable } from "tsyringe";
import { IBookingEntity } from "../../entities/models/booking.entity";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ICancelGameTurfSideUseCase } from "../../entities/useCaseInterfaces/booking/ICancelGameTurfSideUseCase";
import { IWalletSercvices } from "../../entities/services/IWalletServices";
import { NotificationType } from "../../shared/constants";
import { IPushNotificationService } from "../../entities/services/IPushNotificationService";

@injectable()
export class CancelGameTurfSideUseCase  implements ICancelGameTurfSideUseCase {
    constructor(
        @inject('IBookingRepository') private _bookingRepo: IBookingRepository,
        @inject('IWalletSercvices') private _walletService: IWalletSercvices,
        @inject("IPushNotificationService") private _pushNotificationService:IPushNotificationService
    ) {}

    async execute(bookingId:string,bookingType:string): Promise<ISharedBookingEntity | IBookingEntity |null> {
        console.log("Executing CancelGameTurfSideUseCase with bookingId:", bookingId, "and bookingType:", bookingType);
        
        try {
            if(bookingType == "single"){
                const booking = await this._bookingRepo.cancelNormalGame(bookingId);
                
                if(booking){
                    try {
                        const data ={
                        type: "credit",
                        amount: booking.price,
                        description: "Booking cancelled by turf side"
                    }
                        await this._walletService.addFundsToWallet(booking.userId, booking.price,data,"client");
                        await this._pushNotificationService.sendNotification(
                            booking.userId,
                            "Booking Cancelled By Admin",
                            "The Booking as cancelled by admin the payment is credited to wallet",
                            NotificationType.CANCEL_BOOKING
                        );
                    
                    } catch (error) {
                        console.error("Error adding funds to wallet:", error);
                        throw new Error("Failed to add funds to wallet");
                    }
                }else{
                    throw new Error('Booking not found or already canceled');
                }
                
                return booking;
            }else{
                const booking = await this._bookingRepo.cancelGame({bookingId, userId: "", isHost: true});
                if(booking){
                    for(let users of booking.userIds){
                        try {
                            const data={
                            type: "credit",
                            amount: booking.price/booking.playerCount,
                            description: "Booking cancelled by the Host of the  joined Game"
                            }
                            
                            await this._walletService.addFundsToWallet(users, booking.price / booking.playerCount,data,"client");
                            await this._pushNotificationService.sendNotification(
                                users,
                                "Booking Cancelled By Admin",
                                "The Booking as cancelled by admin the payment is credited to wallet",
                                NotificationType.CANCEL_BOOKING
                            );
                            } catch (error) {
                                console.error("Error adding funds to wallet for user:", users, error);
                                throw new Error("Failed to add funds to wallet for user: " + users);
                            }
                    }   
                }else{
                    throw new Error('Booking not found or already canceled');
                }
                
                return booking;
            }
        } catch (error) {
            console.error("Error in CancelGameTurfSideUseCase:", error);
            throw error;
        }
    }
}