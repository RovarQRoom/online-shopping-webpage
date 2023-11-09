import type { Gender } from "../Enum/Gender.enum.model";

export interface RequestRegisterOptions{
    name:string;
    gender:Gender;
    birthday?:Date;
    imgUrl?:string;
}