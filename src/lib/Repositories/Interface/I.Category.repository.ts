import type { Category } from "$lib/Models/Entities/Categories.entity.model";

export interface ICategoriesRepository{
    getCategories(): Promise<AppwriteResponse<Category>>;
    getCategory(id: string): Promise<Category>;
}