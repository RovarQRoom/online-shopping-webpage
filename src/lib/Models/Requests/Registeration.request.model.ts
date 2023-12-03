import type { Gender } from "$lib/Models/Enum/Gender.enum.model";

export interface RequestRegisterOptions{
    name:string;
    gender:Gender;
    birthday?:Date;
    imgUrl?:string;
}