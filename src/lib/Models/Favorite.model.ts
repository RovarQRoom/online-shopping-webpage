import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";

export interface Favorite extends Datetime {
    id: string;
    user_id: string | null;
    items_id: string[];
    items_names: string[];
}