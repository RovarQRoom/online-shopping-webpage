import type { Timestamp } from "firebase/firestore";

export interface Favourite {
    id: string;
    items_id: string[];
    items_names: string[];
    created_at: Timestamp;
    updated_at: Timestamp | null;
    deleted_at: Timestamp | null;
}


export interface RequestCreateFavorite{
    items_id: string[];
    items_names: string[];
    user_id: string | null;
}