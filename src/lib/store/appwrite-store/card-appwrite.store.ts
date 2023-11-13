import { databases } from "$lib/appwrite/appwrite";
import { Client, Databases, ID } from "appwrite";




const promise = databases.createDocument(
    '[654b2f6a8af9b2ed391f]',
    '[654b3405853b2ef8aa7e]',
    ID.unique(),
    {
        userId:"HelloTherew",
        webpageUrl:"HeloMamam",
        imageUrl:"Image",
        expirationDate:new Date()
}
);
