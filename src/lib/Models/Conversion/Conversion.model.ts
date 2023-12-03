import type { AuthDto } from '../DTO/Auth.dto.model';
import type { CategoryDto } from '../DTO/Category.dto.model';
import type { ItemsDto } from '../DTO/Items.dto.model';
import type { Auth } from '../Entities/Auth.Entity.Model';
import type { Category } from '../Entities/Categories.entity.model';
import type { Items } from '../Entities/Items.entities.model';
export class Dto {
	static ToItemDto(items: Items): ItemsDto {
		try {
			const categoriesDto = items.category.map((category)=>{
				return this.ToCategoriesDto(category) as CategoryDto;
			})
			let dto: ItemsDto = {
				id: items.$id,
				name: items.name,
				itemImage: items.itemImage,
				price: items.price,
				detail: items.detail,
				popularity: items.popularity,
				quantity: items.quantity,
				productionDate: items.productionDate,
				expiredDate: items.expiredDate,
				categories: categoriesDto
			};

			return dto;
		} catch (e: any) {
			throw new Error(e);
		}
	}
	static ToCategoriesDto(categories: Category): CategoryDto | null {
		try {
			let dto: CategoryDto = {
				id: categories.$id,
				name: categories.name,
				categoryImage: categories.categoryImage
			};

			return dto;
		} catch (e: any) {
			throw new Error(e);
		}
	}


	static ToAuthDto(auth: Auth): AuthDto {
		return {
		  id: auth.$id,
		  name: auth.name,
		  phone: auth.phone,
		  imgUrl: auth.prefs!.image as string,
		  roles: auth.labels,
		};
	  }
	
	  
}
