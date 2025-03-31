import { Injectable } from '@nestjs/common';
import { DivisionRepository } from '../../domain/repositories/division.repository.interface';
import { CreateDivisionDto } from '../dto/create-division.dto';
import { UpdateDivisionDto } from '../dto/update-division.dto';
import { Division } from '../../domain/entities/division.entity';
import { DivisionDto } from '../dto/division.dto';
import { DivisionMapper } from '../mappers/division.mapper';

@Injectable()
export class DivisionService {
  constructor(private divisionRepository: DivisionRepository) {}

  async create(createDivisionDto: CreateDivisionDto): Promise<DivisionDto> {
    const existingDivision = await this.divisionRepository.findByName(
      createDivisionDto.name,
    );
    if (existingDivision) {
      throw new Error('Division name must be unique');
    }
    if (createDivisionDto.parentDivisionId) {
      const parentDivision = await this.divisionRepository.findById(
        createDivisionDto.parentDivisionId,
      );
      if (!parentDivision) {
        throw new Error('Parent division not found');
      }
    }
    const level = Math.floor(Math.random() * 5) + 1;
    const collaboratorsCount = Math.floor(Math.random() * 20) + 1;
    const division = new Division(
      0,
      createDivisionDto.name,
      createDivisionDto.parentDivisionId || null,
      level,
      collaboratorsCount,
      createDivisionDto.ambassadorName || null,
    );

    const savedDivision = await this.divisionRepository.save(division);
    return DivisionMapper.toDto(savedDivision);
  }

  async findAll(): Promise<DivisionDto[]> {
    const divisions = await this.divisionRepository.findAll();

    return Promise.all(
      divisions.map(async (division) => {
        const subdivisions = await this.divisionRepository.findSubdivisions(
          division.id,
        );

        let parentDivision: Division | null = null;
        if (division.parentDivisionId) {
          parentDivision = await this.divisionRepository.findById(
            division.parentDivisionId,
          );
        }

        return DivisionMapper.toDto(division, subdivisions.length, parentDivision);
      }),
    );
  }

  async findOne(id: number): Promise<DivisionDto> {
    const division = await this.divisionRepository.findById(id);
    if (!division) {
      throw new Error('Division not found');
    }

    const subdivisions = await this.divisionRepository.findSubdivisions(
      division.id,
    );

    let parentDivision: Division | null = null;
    if (division.parentDivisionId) {
      parentDivision = await this.divisionRepository.findById(
        division.parentDivisionId,
      );
    }

    return DivisionMapper.toDto(division, subdivisions.length, parentDivision);
  }

  async findSubdivisions(parentId: number): Promise<DivisionDto[]> {
    const parent = await this.divisionRepository.findById(parentId);
    if (!parent) {
      throw new Error('Parent division not found');
    }

    const subdivisions =
      await this.divisionRepository.findSubdivisions(parentId);

    return Promise.all(
      subdivisions.map(async (division) => {
        const childSubdivisions =
          await this.divisionRepository.findSubdivisions(division.id);
        return DivisionMapper.toDto(division, childSubdivisions.length, parent);
      }),
    );
  }

  async update(
    id: number,
    updateDivisionDto: UpdateDivisionDto,
  ): Promise<DivisionDto> {
    const division = await this.divisionRepository.findById(id);
    if (!division) {
      throw new Error('Division not found');
    }

    if (updateDivisionDto.name && updateDivisionDto.name !== division.name) {
      const existingDivision = await this.divisionRepository.findByName(
        updateDivisionDto.name,
      );
      if (existingDivision) {
        throw new Error('Division name must be unique');
      }
    }

    let parentDivision: Division | null = null;
    if (updateDivisionDto.parentDivisionId) {
      parentDivision = await this.divisionRepository.findById(
        updateDivisionDto.parentDivisionId,
      );
      if (!parentDivision) {
        throw new Error('Parent division not found');
      }

      if (updateDivisionDto.parentDivisionId === id) {
        throw new Error('A division cannot be its own parent');
      }
    }

    division.update(
      updateDivisionDto.name,
      updateDivisionDto.parentDivisionId,
      undefined,
      undefined,
      updateDivisionDto.ambassadorName,
    );

    const updatedDivision = await this.divisionRepository.update(division);
    const subdivisions = await this.divisionRepository.findSubdivisions(
      updatedDivision.id,
    );

    return DivisionMapper.toDto(updatedDivision, subdivisions.length, parentDivision);
  }

  async remove(id: number): Promise<void> {
    const division = await this.divisionRepository.findById(id);
    if (!division) {
      throw new Error('Division not found');
    }

    const subdivisions = await this.divisionRepository.findSubdivisions(id);
    if (subdivisions.length > 0) {
      throw new Error('Cannot delete a division that has subdivisions');
    }

    await this.divisionRepository.delete(id);
  }
}