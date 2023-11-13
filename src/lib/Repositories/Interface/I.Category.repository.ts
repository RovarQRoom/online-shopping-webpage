import type { Categories } from "$lib/Models/Entities/Categories.entity.model";
import type { Result } from "$lib/Models/Results/Database.result.model";

export interface ICategoriesRepository{
    getCategories(): Promise<Result<Categories>>;
    getCategory(id: string): Promise<Categories>;
}