import type { Datetime } from "./Extention/Datetime.extention.model";

export interface Favorite extends Datetime {
    id: string;
    user_id: string | null;
    items_id: string[];
    items_names: string[];
}