import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';


export class FridgeBody {
  @IsNumber()
  public location: number;
  
  @IsNumber()
  public capacity: number;
}

export class FridgeGetBody {
  @IsString()
  public userId: string;
}

export class FridgeGiftBody {
  @IsString()
  public receiver: string;

  @IsString()
  public sender: string;
}