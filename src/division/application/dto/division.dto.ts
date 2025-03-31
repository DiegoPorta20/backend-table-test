export interface DivisionDto {
  id: number;
  name: string;
  parentDivisionId: number | null;
  level: number;
  collaboratorsCount: number;
  ambassadorName: string | null;
  subdivisionsCount: number;
  parentDivision?: {
    id: number;
    name: string;
    level: number;
    collaboratorsCount: number;
    ambassadorName: string | null;
  };
}