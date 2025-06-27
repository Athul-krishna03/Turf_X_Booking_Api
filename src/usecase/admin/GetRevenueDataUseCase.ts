import { inject, injectable } from "tsyringe";
import { IGetAllBookingDataUseCase } from "../../entities/useCaseInterfaces/turf/IGetAllBookingDataUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { ISlotRepository } from "../../entities/repositoryInterface/turf/ISlotRepository";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";
import { IBookingEntity } from "../../entities/models/booking.entity";
import { IGetRevenueDataUseCase } from "../../entities/useCaseInterfaces/admin/IGetRevenueDataUseCase";

@injectable()
export class GetRevenueDataUseCase implements IGetRevenueDataUseCase{
    constructor(
        @inject("IBookingRepository")
        private bookingRepo: IBookingRepository,
        @inject("ITurfRepository")
        private turfRepo: ITurfRepository
    ){}
    async execute(): Promise<{normal:IBookingEntity[],hosted:ISharedBookingEntity[]}> {
        const normalGame = await this.bookingRepo.getAllBooking()
        const hostedGame = await this.bookingRepo.find()

        const enrichedNormal = [];
        const enrichedHosted = [];

    for (const booking of normalGame) {
        const turfDetails = await this.turfRepo.getTurfByTurfId(booking.turfId);
        enrichedNormal.push({
        ...booking,
        turf: turfDetails,
        });
    }

    for(const game of hostedGame){
        const turfDetails = await this.turfRepo.getTurfByTurfId(game.turfId);
        enrichedHosted.push({
            ...game,
            turf: turfDetails,
        });
    }

        return {normal:enrichedNormal,hosted:enrichedHosted}

    }
}