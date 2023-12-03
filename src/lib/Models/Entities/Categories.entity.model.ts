import type { Database } from "$lib/Models/Extensions/Database.Extention.Model";

export interface Category extends Database {
	description: any;
    userId: string;
    name: string;
    categoryImage: string;
    $deletedAt:Date;
  }