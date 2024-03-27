var lbd = require ("../lambda.js");
var usersdb = require ("./usersdb.js");

exports.users = async (event, context, callback) => {
  try {
    switch (event.httpMethod) {
      case 'GET':
        await get (event, context, callback);
        break;
      case 'POST':
        await create (event, context, callback);
        break;
      case 'PUT':
        await update (event, context, callback);
        break;
      default:
        callback(null, lbd.strBuildResponse(501, {error:'method not found in usersAPI for', msg:event.httpMethod}));
        break;
    }
  } catch (error) {
    callback(null, lbd.strBuildResponse(501, {error:'unable to parse event.resource in inusersAPI for event=' + JSON.stringify (event), msg:error}));
  }
}

/* RESPONSE TO GET /users/... */
async function get (event, context, callback) {
  try {
    switch (event.resource) {
      case '/users':
        await lbd.invoke (event, context, callback, usersdb.getAll);
        break;
      case '/users/{id}':
        await lbd.invoke (event, context, callback, usersdb.getOne);
        break;
      case '/users/{id}/image':
        await lbd.invoke (event, context, callback, usersdb.getImage);
        break;
      case '/users/{id}/games':
        await lbd.invoke (event, context, callback, usersdb.getallGames);
        break;
      case '/users/{id}/stats':
        await lbd.invoke (event, context, callback, usersdb.getStats);
        break;
      default:
        callback(null, lbd.strBuildResponse(501, {error:'path not found in usersAPI.get for', msg:event.path}));
        break;
    }    
  } catch (error) {
    callback(null, lbd.strBuildResponse(501, {error:'unable to parse event.resource in usersPAI.get for event=' + JSON.stringify (event), msg:error}));      
  }
};

/* RESPONSE TO PUT/users/{id} */
async function update (event, context, callback) {
  await lbd.invoke (event, context, callback, usersdb.update);
 };

/* RESPONSE TO POST/users */
async function create (event, context, callback) {
  await lbd.invoke (event, context, callback, usersdb.create);
 };
