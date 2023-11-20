import type { Database } from "../Extention/Database.extention.model";

export interface Categories extends Database {
    userId: string;
    name: string;
    categoryImage: string;
  }