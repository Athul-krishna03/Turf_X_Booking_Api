import { IBookingEntity } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";

export interface IGetRevenueDataUseCase{
    execute(): Promise<{normal:IBookingEntity[],hosted:ISharedBookingEntity[]}>
}
