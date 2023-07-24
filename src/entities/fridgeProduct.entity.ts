import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { v4 } from "uuid";
import { Fridge } from "./fridge.entity";
import { Product } from "./product.entity";

@Entity()
export class FridgeProduct {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @ManyToOne()
    public product: Product;

    @ManyToOne()
    public fridge: Fridge;

    @ManyToOne()
    public user: User;
}