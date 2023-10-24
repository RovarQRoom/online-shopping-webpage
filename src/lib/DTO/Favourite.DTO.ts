import type { Timestamp } from "firebase/firestore";

export interface Favourite {
    id?: string;
    itemsId: string[];
    itemsNames: string[];
    created_at: Timestamp;
    updated_at: Timestamp | null;
    deleted_at: Timestamp | null;
}


export interface RequestCreateFavorite{
    itemsId: string[];
    itemsNames: string[];
    userId: string | null;
}