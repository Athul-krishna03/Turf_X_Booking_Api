import { inject, injectable } from "tsyringe";
import { IGetAllBookingDataUseCase } from "../../entities/useCaseInterfaces/turf/IGetAllBookingDataUseCase";
import { IBookingRepository } from "../../entities/repositoryInterface/booking/IBookingRepository";
import { ITurfRepository } from "../../entities/repositoryInterface/turf/ITurfRepository";
import { ISharedBookingEntity } from "../../entities/models/sharedBooking.entity";
import { IBookingEntity } from "../../entities/models/booking.entity";
import { mapTurfData } from "../../shared/utils/MappingTurfData";

@injectable()
export class GetAllBookingDataUseCase implements IGetAllBookingDataUseCase{
    constructor(
        @inject("IBookingRepository")
        private bookingRepo: IBookingRepository,
        @inject("ITurfRepository")
        private turfRepo: ITurfRepository    ){}
    async execute(userId:string): Promise<{normal:IBookingEntity[],hosted:ISharedBookingEntity[]}> {
        const turfData = await this.turfRepo.findById(userId);
        if (!turfData) {
            throw new Error("Turf not found or turfId is missing.");
        }
        const normalGame = (await this.bookingRepo.getAllBooking()).filter((booking) => booking.turfId === turfData.turfId);
        const hostedGame = (await this.bookingRepo.find()).filter((game) => game.turfId === turfData.turfId);

        const enrichedNormal = [];
        const enrichedHosted = [];

    for (const booking of normalGame) {
        const turfDetails = await this.turfRepo.getTurfByTurfId(booking.turfId);
        let turfData
        if(turfDetails){
            turfData = mapTurfData([turfDetails])
        }
        
        enrichedNormal.push({
        ...booking,
        turf: turfData,
        });
    }

    for(const game of hostedGame){
        const turfDetails = await this.turfRepo.getTurfByTurfId(game.turfId);
        let turfData
        if(turfDetails){
            turfData = mapTurfData([turfDetails])
        }
        enrichedHosted.push({
            ...game,
            turf: turfData,
        });
    }

        return {normal:enrichedNormal,hosted:enrichedHosted}

    }
}