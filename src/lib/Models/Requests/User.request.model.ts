import type { ConfirmationResult, User } from "firebase/auth";
import type { Users } from "../User.model";

export interface CreateUser{
    data: Users | null;
    loading: boolean;
    errorMessage: string | null;
}