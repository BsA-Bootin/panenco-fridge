import { BaseEntity, Collection, Entity, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Product } from "./product.entity";
import { Recipe } from "./recipe.entity";

@Entity()
export class User extends BaseEntity<User, 'id'> {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @Property()
    public lastName: string;

    @Property()
    public firstName: string;

    @Property()
    public email: string;

    @OneToMany('Product', 'user')
    public products = new Collection<Product>(this);

    @OneToMany('Recipe', 'user')
    public recipes = new Collection<Recipe>(this);

    @Property()
    public password: string;

    @Property()
    public role: string = "user";

    @Property()
    public attempts: number = 0;
}