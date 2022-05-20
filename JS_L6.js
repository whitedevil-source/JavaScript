class Base{
    constructor(){
        this.type="base user"
    }
    toString() //Base.prototype.toString
    {
        return "this is base type";
    }
}
class User extends Base
{
    static info="Users from Web channel"
    constructor(name,age){
        super(); //base constructor
        //BaseConstructor.call(this);
        this.name=name;
        this.age=age;
        this.type="Ecommerce user" //Hiding the Parent's property
    }
    toString()
    {
        return this.name+" "+this.age+" "+this.type; // function hiding
    }
}
var u1=new User("Mac",50);
console.log(u1);

console.log(u1.toString()); //object Object
console.log(u1);
//-----------------------------//

class ArrayList extends Array
{
    constructor(){
        super();
        var arrayListId=Math.random(); //Private property
        this.getArrayListId=function()
        {
            return arrayListId;
        }
        this.info=function()
        {
            var temp=arrayListId;
        }
        var listeners=[]; //private variable
        //stores list of listeners who want to get notification
        //of any change in the array

        //Subscribe function is used as a way to callback
        //It helps in appending the listener who wants to get notified
        this.subscribe(cb)
        {
            this.listeners.push(cb);
        }
        //Notify function is used for notifying the change by iterating
        //throught the listeners list
        this.notify(newvalue)
        {
            this.listeners.forEach
            (
                function iterator(cb)
                {
                    cb(newvalue);
                }
            )
        }
    }
    
    push(value) //Method hiding
    {
        if(value) //not undefined/ not null
        {
            super.push(value);
            this.notify(value);
        }
        else{
            throw new Error("Invalid arguments passed")
        }
    }
}

var a1=new ArrayList();

//Listener is writing in some part of the code
a1.subscribe(
    function onChange(newVal)
    {
        console.log("New value added to arraylist"+newVal)
    }
);


a1.push(10);
a1.push(20);
a1.push(30);
console.log(a1);
a1.push();
console.log(a1);

console.log(a1.getArrayListId());
a1.arrayListId="Tampered value";
console.log(a1.getArrayListId());

//const keyword
const a=10;
a=20; //can't modify ; will give error
const b={
    p1:10,
    p2:"abc"
};
b.p2=20; //modifies to 20
//So for arrays and objects const is not the right way to safeguard data
b={};b=40;  //not allowed