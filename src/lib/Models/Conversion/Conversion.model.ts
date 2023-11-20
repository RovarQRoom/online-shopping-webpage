import type { CategoryDto } from '../DTO/Category.dto.model';
import type { ItemsDto } from '../DTO/Items.dto.model';
import type { Categories } from '../Entities/Categories.entity.model';
import type { Items } from '../Entities/Items.entities.model';
export class Dto {
	static ToItemDto(items: Items): ItemsDto {
		try {
			let dto: ItemsDto = {
				id: items.$id,
				name: items.name,
				item_image: items.itemImage,
				price: items.price,
				detail: items.detail,
				popularity: items.popularity,
				quantity: items.quantity,
				production_date: items.productionDate,
				expired_date: items.expiredDate,
				categories: {
					id: items.category.$id,
					label: items.category.name
				}
			};

			return dto;
		} catch (e: any) {
			throw new Error(e);
		}
	}
	static ToCategoriesDto(categories: Categories): CategoryDto {
		try {
			let dto: CategoryDto = {
				id: categories.$id,
				name: categories.name,
				category_image: categories.categoryImage
			};

			return dto;
		} catch (e: any) {
			throw new Error(e);
		}
	}
}
