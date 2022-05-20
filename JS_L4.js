function Product(name, price) {
    this.name = name;
    this.price = price;
}
var data =
    [
        new Product("Mobile", 25000),
        new Product("Tablet", 35000),
        new Product("Laptop", 55000),
        new Product("Desktop", 20000),
        new Product("XboX", 5000),
    ];
var data2 = data; //copy by ref-shallow copy
data2[i].price = 10000;
console.log(data);

data.forEach(
    function predicate(item, index) {
        console.log(item.name + "-" + item.price);
    }
);
//We cannot elements from the array of objects incase of forEach
//We can achieve it using standard for loop
//It is a synchronous operation though there are multiple func calls
//The process of creation of multiple objects takes place all at once.
//Depending on the no. of objects the UI thread gets blocked accordingly

var transformedData = data.map(
    function predicate(item, index) {
        item.tax = item.price * 18 / 100;
        return item;
    }
);
var productNames = data.map(
    function predicate(item, index) {
        return item.name;
    }
);
console.log(productNames.join(","));

var filteredData =
    data.filter(
        function predicate(item, index) {
            //return a boolean value
            return item.price > 30000;
        }
    )
            .map(
                function copy(item, index) {
                    //return new Product(item.name, item.price); //deep copy
                    //alternate way:
                    return{
                        name:item.name,
                        price:item.price
                    }//This is not exactly the same as the above
                    //Here we have an ambiguous object whereas the above one was
                    //an object of Product (strong type)
                }//DEEP COPY implementation
            ); 
console.log(filteredData);
filteredData[0].price=filteredData[0].price*2;
console.log(data);
console.log(filteredData);

var matchedRecord=data.find(
    function predicate(item,index)
    {
        //return a boolean
        return item.price>30000;
    }
); //returns only one object matching the given condition
console.log(matchedRecord);
if(!matchedRecord){
    //process ahead
}
var matchedRecordIndex=data.findIndex(
    function predicate(item,index){
        return item.price>30000;
    }
);
console.log("matchedRecordIndex",matchedRecordIndex);
if(matchedRecordIndex>-1)
{
    //required operation
}

var sortedData=data.sort(
    function predicate(current,next)
    {
        return current.price-next.price; //ascending order
        return next.price-current.price; //descending order
    }
);
console.log(sortedData);

var slicedData=data.slice(2);
console.log(slicedData);
//Breaks array into 2, then gives the second part removes the first
var splicedData=data.splice(0,2);
console.log(splicedData);
//Breaks into 2 parts and returns the 1st part

var customData=
[
    data.map(function(item){return item}).splice(0,1)[0], //1st element
    data.map(function(item){return item}).splice(2,1)[0]  //3rd element 
];
console.log(customData);

var result=data.map(function(item){return item}).splice(0,2)  //1,2
.concat
(
    data.map(function(item){return item}).splice(4,1) //5-(4 is start index, 1 is no.of elements)
)
console.log("result",result);

//All these methods are available in array.prototype, So we are free to create
//more methods, put in array.prototype and then they can be used by the application

var obj=
{
    name:"Max",
    age:30,
    address:
    {
        city:"Mumbai",
        country:"India"
    },
    getInfo:function()
    {
        //some code here
    }
};

//Serialization
var objJson=JSON.stringify(obj);
console.log(objJson);
//Function cannot be serialized, only data

//De-serialization
try{
    var obj2=JSON.parse(objJson);
    console.log(obj2);
}
catch(ex)
{
    console.log(ex);
}

function Product(name,price)
{
    this.name=name;
    this.price;
}
Product.prototype.type="Base Products";

var p1=new Product("Mobile",25000); //p1 is Product Object
console.log("p1",p1);
var p1JSON=JSON.stringify(p1);
console.log("p1JSON",p1JSON);
var p1copy=JSON.parse(p1JSON); //p1copy is jus a standard Object
console.log("p1copy",p1copy);
