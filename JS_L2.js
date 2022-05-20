//Functions
function f1(arg1,arg2){
    var result=arg1+arg2;
    //return result
}
var r=f1(10,20);
console.log(r); //undefined

function run(arg1){
    console.log("first");
}
function run(arg1,arg2){
    console.log("second");
}
run(10);
run(10,20);
//Since JS is interpreter based so the first func is fired, only second persists
// OVERLOADED version
function run(arg1,arg2){
    if(arguments.length==0) console.log("First");
    else if(arguments.length==1) console.log("Second");
    else if(arguments.length==2) console.log("Third");
}
run();
run(10);
run(10,20);

function log() {console.log("log");}
function trace() {console.log("trace");}
function run(arg1,arg2,cb){
    var sum=arg1+arg2;
    //log(sum);
    //trace(sum);
    cb(sum);
}
run(10,20,log);
run(10,20,trace);
//Loose coupling available in JS, known as CALLBACK
//run(10,20,log()); //if we do this return type of log is passes
//as parameter which is undefined, so we get error

function run(arg1,arg2,cb){
    var localVar=10;
    function someFn(){

    }
    var obj1={val1:1};
    var val=obj1.val;
    //Async operation
    setTimeout //This is an API of the browser which invokes
    //the func after the given time
    {
        function f() //Closure function
        {
            var sum=arg1+arg2+obj1.val1; //obj1.val1=2
            var sum1=arg1+arg2+val; //val=1
            var fn=someFn; //now someFn cannot be garbage collected 
            //as it is inside the closure fn
            cb(sum);
        }
        3000
    };
    obj1.val1=2;
}
//Memory allocation rule of JS called scope states that if any variable
//is declared within the func or has a formal parameter all those gets
//removed from the memory immediately a func stops its execution

//Rule of closure (exception to the above rule)
//if setTimeOut requires parameters arg1, arg2 to execute or complete
//this execution, JS cannot take them out of memory eventhough run func goes out of scope

function Product(name,brand){
    this.name;
    this.brand;
    //this.data=[10,20,30];
    this.getInfo=function()
    {
        var self=this; // p1 (Safeguarding the COntext)
        //async - stimulate of a server call
        setTimeout(
            function getInfofromServer(){
                this.data=[10,20,30]; //window.data=[10,20,30];
                self.data=[10,20,30]; //p1.data (making it available within a closure fn)
            },
            3000 //assuming 3 secs API delay
        );
    }
}
var p1=new Product("Iphone","Apple");
p1.getInfo();
//The scenario: After 3 secs when the getInfofromServer is called the data
//is referenced to window object the reason being it works in isolation
//At that instant, we don't have p1 so it can't ref p1. So no O/P no error
//if line 76 is included then we can ref p1 as data is an attribute of obj p1

//Alternative way to safeguard:
function Product(name,brand){
    this.name;
    this.brand;
    
    this.getInfo=function()
    {
        var dateTime=new Date().toLocaleTimeString();
        function getInfofromServer(param1){
            this.data=[10,20,30];
            //this.p1.data=[10,20,30];
            console.log("param1",param1);
            console.log(this.info)
        }
        var context={
            p1:this,
            info:"New"
        };
        var bindedGetInfofromServer=getInfofromServer.bind(context,dateTime);//this=p1
        //async - stimulate of a server call
        setTimeout(
            bindedGetInfofromServer,
            //getInfofromServer.bind(this);
            3000 //assuming 3 secs API delay
        );
    }
}
var p1=new Product("Iphone","Apple");
p1.getInfo();