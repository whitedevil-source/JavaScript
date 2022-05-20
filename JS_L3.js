function f1(cb) //async function
{
    setTimeout
    (
        function somework(){
            //flow has to goto f2
            console.log("somework in f1");
            cb();
        },
        1000
    );
}
function f2(){
    var datapoints=[40,10,20];
    console.log("some processing in f2",datapoints);
    function postF1(){
        console.log("some more processing in f2",datapoints);
    }
    f1(postF1);
}
f2();

//for coorect sequencing of events
//since we don't have interrupts in JS we use this callback procedure

//If function postF1() is declared outside f2()
//then it no more remains closure fn since it will require datapoints 
//which is no more in the FUNCTION scope or even in GLOBAL scope

function f1(cb) //async function
{
    setTimeout
    (
        function somework(){
            //flow has to goto f2
            console.log("somework in f1");
            //cb(arguments[1],100);
            postF1(arguments[1],100);
        },
        1000
    );
}
function postF1(datapoints,param1){
    console.log("some more processing in f2",datapoints,param1);
}
function f2(){
    var datapoints=[40,10,20];
    console.log("some processing in f2",datapoints);
    
    //f1(postF1.bind(this,datapoints)); EVENT-driven
    //f1(postF1,datapoints); PROCEDURAL way
    f1(datapoints);
}
f2();


function BaseType(serialNumber){
    this.serialNumber=serialNumber;
}
function ElectronicType(chipset,modelNumber){
    this.chipset=chipset;
    this.modelNumber=this.modelNumber
}
function ConsumerGadeget(screenDimension){
    this.screenDimension=screenDimension;
}


var p1=new BaseType("ABC123");
ElectronicType.call("AMD400","MNC123"); //similar to bind
//FUNCTION BORROWING
//this way of working with funcs and creating higher order types or
//creating objects using multiple types, the concept is called function
//borrowing where we set the context to our obj to get our work done
console.log("p1",p1);

function Utils(){
    this.logger=function(content,type)
    {
        console.log("content,type",content,type);
    }
}
Utils.prototype.logger=function(){}
//the above example, logger is still an instance variable not static though
// we are saving out on memory
Utils.logger=function(content,type) //static
{
    console.log("content,type",content,type);
} 
//...//
//var u1=new Utils();
function run(a,b){
    var result=a+b;
    //u1.logger(result);

    var obj={};
    Utils.call(obj);
    obj.logger(result,"");
}
run(10,20);

//MONKEY PATCHING
var originalLog=console.log;
console.log=function customLog(input){
    var dt=new Date().toLocaleTimeString();
    originalLog(dt+":"+input)
}