// Require
var mongoose = require('mongoose');
require('mongooseFromClass')(mongoose);

// The kitten class
class Kitten {
  
  schema(){
    // return the basic schema
    return {
      name: String
    };
  }

  alterSchema(schema){
    // optional method: do something
    // with the schema object
    // created by mongoose
  }

  // normal methods from here

  speak(){
    var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
    return greeting;
  }

}

// Convert it to a mongoose model
Kitten = mongoose.fromClass(Kitten);

// Try it out
var myKitten = new Kitten({name:"Silence"});

console.log(myKitten);