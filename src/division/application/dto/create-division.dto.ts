import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDivisionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  name: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  parentDivisionId?: number;

  @IsOptional()
  @IsString()
  ambassadorName?: string;
}
