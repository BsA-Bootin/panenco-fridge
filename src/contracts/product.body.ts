import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString, Length, isNumber } from 'class-validator';

export class ProductAddBody {
  @IsString()
  public name: string;
  
  @IsNumber()
  public size: number;

  @IsString()
  public user: string;

  @IsString()
  public fridge: string;
}

export class ProductGiftBody {
    @IsString()
    public receiver: string;
}

export class ProductDeleteBody {
    @IsString()
    public productId: string;
  
    @IsString()
    public userId: string;
}