/**
   * @file Book.ts. Book's class
   * @version 1.2
   * @author Siddique Muhammad
*/


// Class Book
export class Book {

    // Properties
    #id: any;
    #name: string;
    #description:string;
    #price:any;

    // Constructor
    constructor(id: any, name: string, description:string, price:any) {
            this.#id = id;
            this.#name = name;
            this.#description = description;
            this.#price = price;   
    }

    // Methods
    public getId():any {
        return this.#id;
    }

    public getName():string {
        return this.#name;
    }

    public getDescription():string {
        return this.#description;
    }

    public getPrice():any {
        return this.#price;
    }

    public setId(id:any){
        this.#id = id;
    }

    public setName(name:string) {
        this.#name = name;
    }

    public setDescription(description:string){
        this.#description = description;
    }

    public setPrice(price:any) {
        this.#price = price;
    }


}
