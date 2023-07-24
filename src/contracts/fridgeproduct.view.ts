import { Collection } from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { Fridge } from '../entities/fridge.entity';

@Exclude()
export class FridgeProductView {
  @Expose()
  public id: string;

  @Expose()
  public user: string;

  @Expose()
  public fridge: string;

  @Expose()
  public product: string;
}