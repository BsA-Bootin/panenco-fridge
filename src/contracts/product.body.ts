import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString, Length, isNumber } from 'class-validator';

export class ProductAddBody {
  @IsString()
  public name: string;
  
  @IsNumber()
  public size: number;
}

export class FridgeProductAddBody {
  @IsString()
  public fridgeId: string;
  
  @IsString()
  public userId: string;
}

export class ProductGiftBody {
    @IsString()
    public receiver: string;

    @IsString()
    public sender: string;

    @IsString()
    public fridgeId: string;
}

export class ProductDeleteBody {
    @IsString()
    public productId: string;
  
    @IsString()
    public userId: string;
}