import { BaseEntity, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./user.entity";
import { Fridge } from "./fridge.entity";
import { v4 } from "uuid";
import { IsString } from "class-validator";

@Entity()
export class Product extends BaseEntity<Product, 'id'>  {
    @PrimaryKey({ columnType: 'uuid'})
    public id: string = v4();

    @Property()
    public name: string;

    @Property()
    public size: number;

    @ManyToOne()
    public user: User;

    @ManyToOne()
    public fridge: Fridge;
}