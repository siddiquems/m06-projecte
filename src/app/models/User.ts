/**
   * @file Users.ts. User's class
   * @version 1.2
   * @author Siddique Muhammad
*/


// Class User
export class User {

    // Properties
    #username: string;
    #password: string;
    #role:string;
    #name:string;
    #age:any;

    // Constructor
    constructor(username: string, password: string, role:string, name:string, age:any) {
            this.#username = username;
            this.#password = password;
            this.#name = name;
            this.#role = role;   
            this.#age = age;
    }

    // Methods
    public getUsername():string {
        return this.#username;
    }

    public getPassword():string {
        return this.#password;
    }

    public getRole():string {
        return this.#role;
    }

    public getName():string {
        return this.#name;
    }

    public getAge():any {
        return this.#age;
    }

    public setUsername(username:string){
        this.#username = username;
    }

    public setPassword(password:string){
        this.#password = password;
    }

    public setRole(role:string) {
        this.#role = role;
    }

    public setName(name:string) {
        this.#name = name;
    }

    public setAge(age:any) {
        this.#age = age;
    }
}
