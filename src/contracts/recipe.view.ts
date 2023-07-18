import { Collection } from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

@Exclude()
export class RecipeIdView {
    @Expose()
    public id: string;
}

@Exclude()
export class RecipeView {
    @Expose()
    public name: string;

    @Expose()
    public ingredients: string[];
}

@Exclude()
export class RecipeExtraView {
    @Expose()
    public name: string;

    @Expose()
    public ingredients: string[];

    @Expose()
    public id: string;
}

