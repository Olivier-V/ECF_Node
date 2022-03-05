export class Person{
        id;
        name;
        firstName;
        adherent;

        constructor(id, name, firstName , adherent ){
            this.id = id;
            this.name= name;
            this.firstName = firstName;
            this.adherent = adherent;
        }

        get id(){
            return this.id;
        }
        set id(id){
            this.id = id;
        }
        get name(){
            return this.name;
        }
        set name(n){
            this.name=n;
        }
        get firstName(){
            return this.firstName;
        }
        set firstName(fn){
            this.firstName=fn;
        }
        get adherent(){
            return this.adherent;
        }
        set adherent(ad){
            this.adherent=ad;
        }
}