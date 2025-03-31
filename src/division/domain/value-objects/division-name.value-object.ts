export class DivisionName {
  private readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('Division name cannot be empty');
    }

    if (value.length > 45) {
      throw new Error('Division name must not exceed 45 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: DivisionName): boolean {
    return this.value === other.getValue();
  }
}
