import { PagenateTurfs } from "../../models/pageinated-turfs.entity";

export interface IGetAllTurfUseCase{
    execute(
        pageNumber: number, 
        pageSize: number, 
        searchTerm: string,
        location?: [number, number],
        filter?:string): Promise<PagenateTurfs>
}