import { Division } from '../entities/division.entity';

export abstract class DivisionRepository {
  abstract findAll(): Promise<Division[]>;
  abstract findById(id: number): Promise<Division | null>;
  abstract findByName(name: string): Promise<Division | null>;
  abstract findSubdivisions(parentDivisionId: number): Promise<Division[]>;
  abstract save(division: Division): Promise<Division>;
  abstract update(division: Division): Promise<Division>;
  abstract delete(id: number): Promise<void>;
}
