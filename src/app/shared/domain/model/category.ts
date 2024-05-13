export interface Category {

    id: number;
    name: string;
    icon: string;

}

export const categoryIcon: Record<string, string> = {
    "sport": "sport.png",
    "information": "information.png",
    "cafe": "cafe.png",
    "food": "food.png",
    "travel": "travel.png",
    "business": "business.png",
    "library": "library.png",
    "default": "unknown.png",
};