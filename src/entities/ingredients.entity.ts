import { BaseEntity, Collection, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { Fridge } from "./fridge.entity";
import { v4 } from "uuid";
import { IsString } from "class-validator";
import { Recipe } from "./recipe.entity";
import { Product } from "./product.entity";

@Entity()
export class Ingredient {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @Property()
    public amount: string;

    @ManyToOne()
    public recipe: Recipe;

    @ManyToOne()
    public product: Product;
}