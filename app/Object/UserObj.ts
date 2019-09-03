
export class User implements userInterface {
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
  this.email = email.trim();
  this.password = password.trim();
  this.admin = admin
 }
}
