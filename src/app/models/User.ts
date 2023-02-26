/**
   * @file Users.ts. User's class
   * @version 1.2
   * @author Siddique Muhammad
*/


// Class User
export class User {

    // Properties
    username: any;
    password: any;
    role:any;
    email: any;
    status:any;
    gender:any;
    interests: any;
    conditions:any;

    // Constructor
    constructor(username: any, password: any, role:any, email: any, status:any, gender:any, interests: any, conditions:any) {
            this.username = username;
            this.password = password;
            this.role = role;
            this.email = email;
            this.status = status;
            this.gender = gender;
            this.interests = interests;
            this.conditions = conditions;
    }

    // Methods
    public getName():any {
        return this.username;
    }

    public getPassword():any {
        return this.password;
    }

    public getRole():any {
        return this.role;
    }

    public getEmail():any {
        return this.email;
    }

    public getStatus():any {
        return this.status;
    }

    public getGender():any {
        return this.gender;
    }

    public getInterests():any{
        return this.interests;
    }

    public getConditions():any{
        return this.conditions;
    }
}
