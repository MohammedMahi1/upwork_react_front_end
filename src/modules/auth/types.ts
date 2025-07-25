export type FormType = {
    email?: string | null;
    password?: string | null;
    password_confirmation?: string | null;
    first_name?: string | null;
    bio?:string ;
    img_url?:string | null;
    img_name?:string | null;
    last_name?: string | null;
    isLoading?: boolean;
    error?: string | null;
}