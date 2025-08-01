export interface SharedBookingDTO {
    id: string;
    bookingId: string;
    turfId: string;
    turfName: string;
    turfImage: string[];
    location: {
        city?: string;
        state?: string;
    };
    date: string;
    startTime: string;
    duration: number;
    price: number;
    currency: string;
    status: string;
    sport: string;
}

export interface SharedBookingCreateDTO {
    userIds: string[];
    turfId: string;
    time: string;
    duration: number;
    price: number;
    date: string;
    status: string;
    isSlotLocked: boolean;
    playerCount: number;
    bookingId?: string;
    cancelledUsers?: string[];
    walletContributions?: Map<string, number>;
    refundsIssued?: Map<string, number>;
    walletSum?: number;
    game?: string;
}

export interface ISharedBookingCommonDTO {
    id: string;
    userIds: string[];
    bookingId?: string;
    walletContributions: Map<string, number>;
    walletSum?:number
    turfId: string;
    time:string;
    duration: number;
    price: number;
    date: string;
    status:string;
    cancelledUsers?: string[];
    refundsIssued?: Map<string, number>;
    isSlotLocked: boolean;
    playerCount:number;
    game?:string;
    createdAt: Date;
}