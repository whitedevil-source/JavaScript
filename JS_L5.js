//SCENARIO 1
//Global scope
var num=10;
console.log(num); //10

//Function Scope
function f1()
{
    var num=20;
    console.log(num); //20

    //Block Scope
    for(var num=0;num<100;num++)
    {
        //some code here
    }
    console.log(num); //100
}
f1();
console.log(num); //10
//-------------------------//
//SCENARIO 2
//Global scope
var num=10;
console.log(num); //10

//Function Scope
function f1()
{
    //var num=20;
    console.log(num); //10

    //Block Scope
    for(var num=0;num<100;num++)
    {
        //some code here
    }
    console.log(num); //100
}
f1();
console.log(num); //100
//HERE there is no local scope so it starts affecting the global scope
//-----------------------//
//SCENARIO 3
//Global scope
var num=10;
console.log(num); //10

//Function Scope
function f1()
{
    var num=20;
    console.log(num); //20

    //Block Scope
    for(let num=0;num<100;num++) //let - use for block scope
    {
        //some code here
    }
    console.log(num); //20
}
f1();
console.log(num);//10
//The variables have their own separate scopes in this piece of code
//------------------//

var obj=
{
    name:"Max",
    age:50,
    country:"India",
    address:
    {
        city:"Mumbai",
        state:"MH"
    }
};
//var userage=obj.age;
//var usercity=obj.city;  //Tedious if we have many features to extract

//Object DESTRUCTURING
var {age,country,address}=obj;
console.log(age);
console.log(country);
console.log(address);

var {age:userAge , country:userCountry}=obj;
console.log(userAge);
console.log(userCountry);
//----------------------//
var data=[10,20,50,60,70];
var[num1,num2]=data;
console.log(num1); //10
console.log(num2); //20
//-----------------------//
function Product(name="",price=0) //Default parameters
{
    this.name=name;
    this.price=price;
}
var p1=new Product("Phones");
console.log(p1);
//--------------------//
var obj=
{
    name:"Max",
    age:50,
    country:"India",
    address:
    {
        city:"Mumbai",
        state:"MH"
    },
    category:"WebUser"
};
var obj2=
{
    category:"RetailUser",
    //name=obj.name
    ...obj , //spread operator-> it inherits all properties of obj
    category:"Retail" //The command executed later overwrites
}
var obj3=
{
    obj:
    {
        ...obj, //Spread
    },
    category:"RetailUser", //incase we want to preserve categories of both obj and obj2
};
console.log(obj2);

obj2.obj.address.city="Delhi"
console.log(obj.address.city);
console.log(obj2.obj.address.city);
/*What happens here is name,age,country are copied by value and a new memory
allocation is done for them but incase of address the pointer is copied or u can
say copy by reference has occured. so changes done will reflect
In order to make new copies for city,state you need to recursively spread all the
objects and arrays inside obj*/
//------------------------//

//CHECK DETECTION
function f1(arg) //Library (alien code)
{
    var newArg=
    {
        ...arg
    };
    newArg.type="HMV";
    newArg.specs.engine="1600cc";
    return newArg;
}
var vehicle={
    number:"AB-12-1234",
    type:"LMH",
    specs:
    {
        engine:"1400cc"
    }
};
var returnparam=f1(vehicle);
if(vehicle!=returnparam)  //Immutable checks
{
    //changed
}
//It still shows changed because the entire object is compared to the 
//initial object which is altogether a different reference
//Make a deep copy of vehicle
f1(vehicle); //compare vehiclecopy vs vehicle [DIRTY CHECKING]
//-------------------------//

//SPREADING ARRAYS:
var data11=[10,20,50,30,300];
var data12=[100,600,300];
var data3=
[
    ...data11,
    ...data12
]; //New memory location (immutables)
//here we get 7 elements not 8 coz 300 will be overwritten
console.log(data3);
//---------------//

var vals=[10,20,50,30,300];
vals.push(100);

function PushtoFirst(vals,newval){
    var data=
    [
        newval,
        ...vals
    ];
    return data;
}
var vals=PushtoFirst(vals,100);
console.log(vals);
//--------------//
function f11(a,b,...rest) //rest operator
{
    console.log(a);
    console.log(b);
    console.log(rest);
}
f11(10,20,30,40,50);
//---------------------//
var date=new Date();
var text = "The time is "+date.toLocaleTimeString()+"."; //Method1

var result=
[
    "This time is ",
    date.toLocaleTimeString(),
    "."
].join("");
console.log(result);  //method 2

var text=`This time is ${date.toLocaleTimeString}.`; //Template String
console.log(text);
//----------------------//

class Product{
    constructor(name="",price=0)
    {
        this.name=name;
        this.price=price;
        this.getID=function(){
            //p1.getID
        }
    }
    getINFO(){
        //Product.prototype.getINFO
    }
}
var p1=new Product("Mobiles",35000);
var p2=new Product("Laptops",75000);
console.log(p1);

delete p1.name;