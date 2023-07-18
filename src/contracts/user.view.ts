import { Collection } from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

@Exclude()
export class UserView {
  @Expose()
  @IsNumber()
  public id: string;
}