import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";


@Exclude()
export class LoginBody {

    @Expose()
    @IsEmail()
    public email: string;

    @Expose()
    @IsString()
    public password: string;
}