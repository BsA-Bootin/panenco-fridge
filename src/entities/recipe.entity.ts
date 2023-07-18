import { BaseEntity, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { Fridge } from "./fridge.entity";
import { v4 } from "uuid";
import { IsString } from "class-validator";

@Entity()
export class Recipe extends BaseEntity<Recipe, 'id'>  {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @Property()
    public name: string;

    @Property({type: 'array'})
    public ingredients: string[];

    @ManyToOne()
    public user: User;
}