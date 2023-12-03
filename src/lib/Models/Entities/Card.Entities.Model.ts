import type { Database } from "$lib/Models/Extensions/Database.Extention.Model";

export interface Card extends Database{
    userId:string,
    webpageUrl:string | null,
    cardImage:string,
}