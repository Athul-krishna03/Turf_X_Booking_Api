import { ISharedBookingCommonDTO, SharedBookingCreateDTO } from "../../../shared/dtos/SharedBooking.dto";
import { IBookingEntity } from "../../models/booking.entity";
import { ISharedBookingEntity } from "../../models/sharedBooking.entity";


export interface IBookingRepository{
    save(data:Partial<IBookingEntity>):Promise<IBookingEntity>;
    findById(id: string): Promise<ISharedBookingEntity>;
    findNormalByTurfId(turfId:string):Promise<IBookingEntity[]>
    findSharedByTurfId(turfId:string):Promise<ISharedBookingEntity[]>
    getAllBooking():Promise<IBookingEntity[]>;
    getTopTurfsByAllBookings(limit: number): Promise<{ turfId: string; turfName: string; totalBookings: number }[]>
    getUserBookingDetials(userId:string):Promise<IBookingEntity[]>
    find():Promise<ISharedBookingEntity[]>
    saveSharedBooking(data:Partial<SharedBookingCreateDTO>):Promise<ISharedBookingEntity | IBookingEntity>;
    joinGame(data:object):Promise<ISharedBookingCommonDTO | null>
    cancelNormalGame(bookingId: string): Promise<IBookingEntity | null>
    cancelGame(data:{bookingId:string,userId:string,isHost:boolean}):Promise<ISharedBookingEntity | null>
    updateJoinedGameBookingStatus(bookingId: string, data: Partial<ISharedBookingEntity>): Promise<ISharedBookingEntity | null>;
}    