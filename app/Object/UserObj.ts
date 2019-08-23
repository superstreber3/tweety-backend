
class User implements userInterface {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password?: string;
 constructor (firstName: string, lastName: string, userName: string, email: string, password?: string) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.userName = userName;
  this.email = email;
  this.password = password;
 }
}
