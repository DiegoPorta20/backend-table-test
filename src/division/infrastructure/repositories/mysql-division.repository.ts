import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DivisionRepository } from '../../domain/repositories/division.repository.interface';
import { Division } from '../../domain/entities/division.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DivisionSchema } from '../persistence/division.schema';

@Injectable()
export class MySqlDivisionRepository implements DivisionRepository {
  constructor(
    @InjectRepository(DivisionSchema)
    private divisionRepository: Repository<DivisionSchema>,
  ) {}

  private toDomain(schema: DivisionSchema): Division {
    return new Division(
      schema.id,
      schema.name,
      schema.parentDivisionId,
      schema.level,
      schema.collaboratorsCount,
      schema.ambassadorName,
    );
  }

  private toSchema(domain: Division): Partial<DivisionSchema> {
    return {
      id: domain.id || undefined,
      name: domain.name,
      parentDivisionId: domain.parentDivisionId || undefined,
      level: domain.level,
      collaboratorsCount: domain.collaboratorsCount,
      ambassadorName: domain.ambassadorName || undefined,
    };
  }

  async findAll(): Promise<Division[]> {
    const schemas = await this.divisionRepository.find();
    return schemas.map((schema) => this.toDomain(schema));
  }

  async findById(id: number): Promise<Division | null> {
    const schema = await this.divisionRepository.findOne({ where: { id } });
    return schema ? this.toDomain(schema) : null;
  }

  async findByName(name: string): Promise<Division | null> {
    const schema = await this.divisionRepository.findOne({ where: { name } });
    return schema ? this.toDomain(schema) : null;
  }

  async findSubdivisions(parentDivisionId: number): Promise<Division[]> {
    const schemas = await this.divisionRepository.find({
      where: { parentDivisionId },
    });
    return schemas.map((schema) => this.toDomain(schema));
  }

  async save(division: Division): Promise<Division> {
    const schema = this.toSchema(division);
    const savedSchema = await this.divisionRepository.save(schema);
    return this.toDomain(savedSchema as DivisionSchema);
  }

  async update(division: Division): Promise<Division> {
    const schema = this.toSchema(division);
    await this.divisionRepository.update(division.id, schema);
    const updatedSchema = await this.divisionRepository.findOne({
      where: { id: division.id },
    });
    return this.toDomain(updatedSchema!);
  }

  async delete(id: number): Promise<void> {
    await this.divisionRepository.delete(id);
  }
}
