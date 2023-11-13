import type { Categories } from "$lib/Models/Entities/Categories.entity.model";

export interface ICategoriesRepository{
    getCategories(): Promise<AppwriteResponse<Categories>>;
    getCategory(id: string): Promise<Categories>;
}