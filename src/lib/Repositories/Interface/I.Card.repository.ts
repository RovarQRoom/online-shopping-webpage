import type { Card } from "$lib/Models/Entities/Card.Entities.Model";

export interface ICardRepository{
    getCards(): Promise<AppwriteResponse<Card>>;
    getCard(id: string): Promise<Card>;
}