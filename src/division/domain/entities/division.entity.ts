export class Division {
  private _id: number;
  private _name: string;
  private _parentDivisionId: number | null;
  private _level: number;
  private _collaboratorsCount: number;
  private _ambassadorName: string | null;

  constructor(
    id: number,
    name: string,
    parentDivisionId: number | null,
    level: number,
    collaboratorsCount: number,
    ambassadorName: string | null,
  ) {
    this._id = id;
    this._name = name;
    this._parentDivisionId = parentDivisionId;
    this._level = level;
    this._collaboratorsCount = collaboratorsCount;
    this._ambassadorName = ambassadorName;

    this.validate();
  }

  private validate(): void {
    if (this._name.length > 45) {
      throw new Error('Division name must not exceed 45 characters');
    }

    if (this._level <= 0) {
      throw new Error('Division level must be a positive integer');
    }

    if (this._collaboratorsCount < 0) {
      throw new Error(
        'Division collaborators count must be a positive integer',
      );
    }
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get parentDivisionId(): number | null {
    return this._parentDivisionId;
  }

  get level(): number {
    return this._level;
  }

  get collaboratorsCount(): number {
    return this._collaboratorsCount;
  }

  get ambassadorName(): string | null {
    return this._ambassadorName;
  }

  update(
    name?: string,
    parentDivisionId?: number | null,
    level?: number,
    collaboratorsCount?: number,
    ambassadorName?: string | null,
  ): void {
    if (name !== undefined) {
      this._name = name;
    }
    if (parentDivisionId !== undefined) {
      this._parentDivisionId = parentDivisionId;
    }
    if (level !== undefined) {
      this._level = level;
    }
    if (collaboratorsCount !== undefined) {
      this._collaboratorsCount = collaboratorsCount;
    }
    if (ambassadorName !== undefined) {
      this._ambassadorName = ambassadorName;
    }

    this.validate();
  }
}
