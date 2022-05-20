class User{
    constructor(name,age)
    {
        this.name=name;
        this.age=age;
    }
    getDetails()
    {
        //var self=this; //u1
        //Simulating Async server call
        setTimeout
        (
            () =>   //Arrow function
            {
                this.details=[10,20,30]; //using closure to save context 
            }, 
            2000
        );
        //Arrow function is used to do the closure for us internally
        //We would not need to do it explicitly
        //Anonymity often creates debugging issues
        //so ALternative method:
        var getDetailsTimeout= ()=>
        {
            this.details=[10,20,30];
        }
        setTimeout
        (
            getDetailsTimeout,
            2000
        );
    }
}
var u1=new User("Mac",30);
u1.getDetails();
console.log(u1);
//---------------------//
var obj=
{
    name:"Mac",
    age:30
};
var data=[10,20,30];
var num=100;
var abc={
    obj,//obj:obj,
    data,//data:data,
    num//num:num
};

//Object literal Shorthand Syntax
console.log(abc);
//----------------------------//
var obj={
    num:10
};
obj.num; //Dot notation
obj[num];  //Array/index notation
var obj2={};
obj2[Math.random()]=20;
//Dynamic creation of property

var data=[10,20,30];

var data2 = data.map
(
    function predicate(item,index)
    {
        var obj={};
        obj["element_"+index]=item;  //Computed Property
        return obj;
    }
);
console.log(data2); //array of objects

var data3={};
data3 = data.forEach
(
    function predicate(item,index)
    {
        var obj={};
        obj["element_"+index]=item;  //Computed Property
    }
);
console.log(data3); //pure object
//---------------------------//

//Signalling
function f1(cb) {
    console.log("f1");
    setTimeout(function () {
        cb(true);
    }, 1000);
}

function f2() {
    console.log("f2");
    function cb(isSuccess) {
        if (isSuccess) {
            console.log("f2 executed after f1");
        } else {
            console.log("failed");
        }
    }
}
//nodejs uses this mechanism

// Another way:

function f1(success, error) {
    console.log("f1 executed");

    //conditional check
    setTimeout(function () {
        success();
    }, 1000);
}

function f2() {
    console.log("f2");
    f1(
        function success() {
            console.log("f2 executed after f1");
        },
        function error() {
            console.log("f1 failed");
        }
    );
}

// third version: ES6 promise

function f1() {
    var promise = new Promise(
        function onThen(resolve, reject) { // when then is called this will get fired
            setTimeout(
                function () {
                    console.log("f1");
                    resolve();
                }, 1000
            )
        }
    );
    return promise;
}

function f2() {
    console.log("f2 before f1");
    var promise = f1();
    f3(promise);
}

function f3(obj) {
    promise.then(  // wait till f1 is done
        function success() {
            console.log("f2 executed after f1");
        },
        function error() {
            console.log("failed");
        }
    );
}

// Async/Await

async function f2() {
    console.log("f2 before f1");
    try {
        await f1();
        console.log("f2 executed after f1");
    }
    catch (err) {
        console.log("failed");
    }
}

// HTTP Browser - HTTP call
// HTTP/HTTPS
// WS - WebSocket WSS - Secure WebSocket

function callApi() {
    var xhr = new XMLHttpRequest();
    var apiEndpoint = "";
    xhr.open(
        "GET", //HTTP GET
        apiEndpoint, // URL
        true // async
    );
    var obj = {
        name: "John",
        age: 30
    }
    var objJson = JSON.stringify(obj);
    xhr.onload = function () { //success
        var data = xhr.response;
        console.log(data);
    }
    xhr.onerror = function () { //error
    }
    xhr.send(objJson); // send the data
}
