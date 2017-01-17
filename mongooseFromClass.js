module.exports = function(mongoose){
  mongoose.fromClass = function classToMongoose(_class){
    var p = _class.prototype, classMethods = {};
    // Collect all class methods (also from parent classes)
    while(p && p !== Object.prototype){
      Object.getOwnPropertyNames(p).forEach(function(n){
        if(classMethods[n]){ return; }
        classMethods[n] = p[n];
      });
      p = Object.getPrototypeOf(p);
    }
    // Create the schema
    var schema = mongoose.Schema(classMethods.schema());
    var alterSchema = classMethods.alterSchema || function(){};
    // Delete "internal"/unneccesary methods
    ["schema","alterSchema","constructor"].forEach(function(m){
      delete classMethods[m];
    });
    // Attach the classMethods to schema.methods
    Object.assign(schema.methods,classMethods);
    // Send the schema to alterSchema
    alterSchema(schema);
    // Create the model
    var model = mongoose.model(_class.name, schema);
    // Add a property that holds the original class def
    model.orgClass = _class;
    // Return the model
    return model;
  };
};
