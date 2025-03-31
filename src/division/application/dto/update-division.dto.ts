import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateDivisionDto {
  @IsOptional()
  @IsString()
  @MaxLength(45)
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  parentDivisionId?: number;

  @IsOptional()
  @IsString()
  ambassadorName?: string;
}
