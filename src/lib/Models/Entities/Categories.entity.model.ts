export interface Categories {
    userId: string;
    name: string;
    description: string;
    categoryImage: string;
    $id: string;
    $createdAt: Date;
    $updatedAt: Date;
    $permissions: [];
    $databaseId: string;
    $collectionId: string;
  }