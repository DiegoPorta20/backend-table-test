import { Division } from '../../domain/entities/division.entity';
import { DivisionDto } from '../dto/division.dto';

export class DivisionMapper {
  static toDto(
    division: Division,
    subdivisionsCount: number = 0,
    parentDivision: Division | null = null
  ): DivisionDto {
    const dto: DivisionDto = {
      id: division.id,
      name: division.name,
      parentDivisionId: division.parentDivisionId,
      level: division.level,
      collaboratorsCount: division.collaboratorsCount,
      ambassadorName: division.ambassadorName,
      subdivisionsCount: subdivisionsCount,
    };

    if (parentDivision) {
      dto.parentDivision = {
        id: parentDivision.id,
        name: parentDivision.name,
        level: parentDivision.level,
        collaboratorsCount: parentDivision.collaboratorsCount,
        ambassadorName: parentDivision.ambassadorName,
      };
    }

    return dto;
  }
}