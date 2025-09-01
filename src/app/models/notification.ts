export interface Notification {
    idNotif: number;
    message: string;
    seen: boolean;
   mesureId:number;
    createdAt: Date;
    userId?: number;
}
