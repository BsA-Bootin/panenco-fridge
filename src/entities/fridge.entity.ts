import { BaseEntity, Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Product } from "./product.entity";

@Entity()
export class Fridge extends BaseEntity<Fridge, 'id'> {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @Property()
    public location: number;

    @Property()
    public capacity: number;

    @OneToMany('Product', 'fridge')
    public products = new Collection<Product>(this);
}