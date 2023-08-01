import { IsString } from 'class-validator';

export class CatDto {

  @IsString()
  name: string;

  @IsString()
  breed: string;

  @IsString()
  color: string;

}