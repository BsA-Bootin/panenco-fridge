import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { Fridge } from "./fridge.entity";
import { v4 } from "uuid";
import { IsString } from "class-validator";
import { Ingredient } from "./ingredients.entity";
import { FridgeProduct } from "./fridgeProduct.entity";

@Entity()
export class Product extends BaseEntity<Product, 'id'>  {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @Property()
    public name: string;

    @Property()
    public size: number;

    @OneToMany('Ingredient', 'product')
    public ingredients = new Collection<Ingredient>(this);

    @OneToMany('FridgeProduct', 'product')
    public fridgeProducts = new Collection<FridgeProduct>(this);
}