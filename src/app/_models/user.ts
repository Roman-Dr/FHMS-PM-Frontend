export class User {
  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public birthdate: Date;

  displayName() {
    return this.firstname + ", " + this.lastname;
  }
  displayNameWithMail() {
    return this.firstname + ", " + this.lastname + " (" + this.email + ")";
  }
}
