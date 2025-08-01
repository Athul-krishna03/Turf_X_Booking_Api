import { ITurfEntity } from "../../entities/models/turf.entity";

export type TurfDto = Omit<ITurfEntity, "password">;


export function mapTurfData(turfs: ITurfEntity[]): TurfDto[] {
  console.log("tirfData in mapper",turfs);
  
  return turfs.map(turf => {
    const { password, ...turfWithoutPassword } = turf;
    return turfWithoutPassword;
  });
}