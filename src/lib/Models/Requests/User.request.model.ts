import type { Users } from "$lib/Models/User.model";

export interface CreateUser{
	user: any;
    data: Users | null;
    loading: boolean;
    errorMessage: string | null;
}