var a=10; //loosely typed language...data type implicitly determined
var b="Mac"; //string
var c=true; //boolean

function f1(arg1){
    arg1=arg1+10;
    console.log("arg1",arg1);
}
console.log(a); //10
f1(a); //Pass by value
console.log(a); //10

//Ref types
//Object literal notation
var obj={
    a:10,
    b:{
        name:"John"
    },
    c:[1,2,3]
};
function f2(arg1){
//clonong in order to modify all attributes of an object
var arg1clone={};
for(var prop in arg1){
    arg1clone[prop]=arg1[prop];
}
arg1clone.a=arg1clone.a+1;
arg1clone.c.push(4);
/*Here the cloned object 'arg1clone' will have
4 elements in its attribute c and so will the original
object because here there is SHALLOW CLONING. Ideally
lines 25-27 had to run recursively for complete/deep
cloning of the complete object 
*/
console.log("arg1clone",arg1clone);
//arg1.a=arg1.a+10;
}
//console.log("obj.a",obj.a); //10
f2(obj);
//console.log("obj.a",obj.a); //20
console.log("obj",obj);
/*
function f2_(arg1){
    var temp=arg1.a;
    temp.a=temp.a+10; //creating copy of object
}
*/


//Objects
//Object Literal Notation
var obj1={
    name:"Paul",
    age:20
};
obj1.city="Mumbai"
//New keyword- Object creation using constructor notation
var obj2=new Object();
obj2.name="Paul";
obj2.age=20;
/*Whenever u need structs we use object literal notation
Whenever u want classes where u want multiple instances of a type
we use constructor notation
*/
//Both are open to modifications
function abc(){}
//Custom types:
function Product(name,brand){
    this.name=name;
    this.brand=brand;
    this.getInfo=function()
    {
        //TODO
    } //this will create multiple copies of the function for each func call
    //CAN CAUSE WASTAGE OF HEAP MEMORY for multiple calls
    this.getgetInfo=abc; // this points to predefined function abc
    //CAN CAUSE WASTAGE OF STACK MEMORY (though heap memory is saved) for mutiple calls
    
    //SAFEGUARDING INFORMATION
    //If we want to set a value for a variable only once that should not be modified
    this.serialNumber=Math.random(); //doesn't work
    var serialNumber=Math.random();
    this.getSerialNumber=function(){
        return serialNumber;
    }
}
Product.prototype.getgInfo=function()
{
    return this.name+"-"+this.brand;
}//For every object there is only one copy created 
//VERY USEFUL FOR DESIGN OPTIMIZATION
var p1=new Product("Iphones","Apple"); //type-Product
//the object is in heap , p1 is in stack which points to memory location in heap
var p2=new Product("Tablets","Samsung");
console.log(p1.getgInfo());
//p1 -> product.prototype -> object.prototype 
//This is done internally in Javascript

//In Javascript we can have different structures for the object of same type
p1.city="Mumbai"; //adding feature
delete p2.brand;

Object.preventExtensions(p1); //NO ADD
Object.seal(p1); //NO ADD, NO DEL
Object.freeze(p1); //NO ADD, NO DEL, NO update

//To check
if(Object.isExtensible(p1)){}
if(Object.isSealed(p1)){}
if(Object.isFrozen(p1)){}
if("brand" in p2){} //checking particular attribute of object
