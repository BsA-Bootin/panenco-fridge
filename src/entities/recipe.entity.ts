import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { Fridge } from "./fridge.entity";
import { v4 } from "uuid";
import { IsString } from "class-validator";
import { Ingredient } from "./ingredients.entity";

@Entity()
export class Recipe extends BaseEntity<Recipe, 'id'>  {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @Property()
    public name: string;

    @OneToMany('Ingredient', 'recipe')
    public ingredients = new Collection<Ingredient>(this);

    @ManyToOne()
    public user: User;
}