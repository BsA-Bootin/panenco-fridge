import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsSemVer, IsString, IsStrongPassword, Length, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class RecipeCreateBody {
    @IsString()
    public name: string;

    @IsString()
    public user: string;
}

export class RecipeIngredients {
    @IsString({each: true})
    public products: {productId: string, amount: string}[];
}

export class RecipeName {
    @IsString()
    public name: string;
}