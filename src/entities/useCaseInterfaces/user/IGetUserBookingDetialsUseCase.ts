import { SharedBookingDTO } from "../../../shared/dtos/SharedBooking.dto";
import { BookingDTO } from "../../models/booking.entity";


export interface IGetUserBookingDetialsUseCase{
    execute(userId: string): Promise<{
    upcoming: BookingDTO[],
    past: BookingDTO[],
    joinedGames: {
        upcoming: SharedBookingDTO[],
        past: SharedBookingDTO[]
    }
    }>
}