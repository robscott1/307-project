const db = require('../database/database-ops');
const table = 'itemsTable';

function getByName(params) {
  var params = {
    TableName: table,
    // 'name' is a reserved variable in DynamoDB, so 
    // we use the statement below to map 'name'
    // attribute to '#name', where the DB will 
    // interpret it correctly
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
      ':itemName': params.name
    },
    FilterExpression: 'contains(#name, :itemName)',
  };

  return db.scan(params);
}

function getAllItems() {
  var params = {
    TableName: table,
    AttributesToGet: [
      'name',
      'price',
      'quantity'
    ],
  };

  var res = db.scan(params);
  return res;
}

function createItem(item) {
  var name = item.name;
  name = name.toLowerCase()
  var params = {
    TableName: table,
    Item: {
      name: name,
      price: item.price,
      quantity: item.quantity
    }
  };

  var res = db.createItem(params);
  return res
}

function deleteItem(params) {
  console.log(`PARAMS FOR DELETING: ${JSON.stringify(params)}`);
  var params = {
    TableName: table,
    // ExpressionAttributeValues: {
    //     ":name": params.name
    // },
    // ConditionExpression:"contains :name",
    Key: {
      name: params.name,
      price: params.price
    },
    // ReturnValues: "ALL_OLD"
  };
  
  return db.deleteItem(params);
}

module.exports = { getAllItems, createItem, getByName, deleteItem }