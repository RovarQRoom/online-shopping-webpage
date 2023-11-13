export interface RegisterOption {
    userId?: string;
    name: string;
    prefs:{
        gender: number;
        birthday?: string;
        image?: string | File | null;
    }
    imageArrayBuffer?: ArrayBuffer | null;
}