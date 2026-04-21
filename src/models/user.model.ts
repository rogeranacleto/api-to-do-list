export interface UserDto {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  constructor(
    private id: number,
    private name: string,
    private email: string,
    private password: string,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ){}

  public getPassword(): string {
    return this.password;
  }

  public toJSON(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
