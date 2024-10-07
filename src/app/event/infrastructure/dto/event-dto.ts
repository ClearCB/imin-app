import { Tag } from "primeng/tag";
import { Category } from "../../../shared/domain/model/category";

export interface EventDTO {

    title?: string;
    smallDescription?: string;
    largeDescription?: string;
    userId: string;
    locationName: string;
    latitude: number;
    longitude: number;
    startDate: Date;
    finishDate: Date;
    categories: {id:number}[];
    tags: {id:number}[];
    isOnline: boolean;

}
