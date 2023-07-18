import { Collection } from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';
import { ProductView } from './product.view';
import { Nested } from '@panenco/papi';

@Exclude()
export class CreateFridgeView {
  @Expose()
  @IsString()
  public id: string;
}