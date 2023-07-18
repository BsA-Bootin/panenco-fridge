import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsSemVer, IsString, IsStrongPassword, Length, MinLength } from 'class-validator';

export class UserBody {
  @IsString()
  public firstName: string;
  
  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  public password: string;
}

export class UserGiftBody {
  @IsString()
  public receiver: string;
}