import type { ConfirmationResult, User } from "firebase/auth";
import type { Users } from "../User.model";

export interface CreateUser{
    user: User | null;
    confirmationResult?: ConfirmationResult;
    loading: boolean;
    data: Users | null;
    errorMessage: string | null;
}