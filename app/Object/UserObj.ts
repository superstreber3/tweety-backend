
export class User implements IUserInterface {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    admin: boolean;
 constructor (firstName: string, lastName: string, userName: string, email: string, password: string, admin: boolean) {
  this.firstName = firstName.trim();
  this.lastName = lastName.trim();
  this.userName = userName.trim();
  this.email = email.trim().toLowerCase();
  this.password = password;
  this.admin = admin;
 }
}
