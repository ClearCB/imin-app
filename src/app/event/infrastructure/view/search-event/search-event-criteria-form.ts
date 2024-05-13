export interface SearchEventFormCriteriaOptions  {
    content: string;
    category?: number;
    startDate: Date;
    distance: number;
    distanceBounds?: {latMax: number, latMin: number, longMax: number, longMin: number};
    tags?:number[];



}