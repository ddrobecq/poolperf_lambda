var lbd = require ("./lambda.js");
var routeGames = require ("./games/gamesAPI.js");
var routeUsers = require ("./users/usersAPI.js");

exports.routes = async (event, context, callback) => {
  try {    
    const path = event.resource.split('/');
    switch (path[1]) {
      case 'games':
        await routeGames.create (event, context, callback);
        break;
      case 'users':
        await routeUsers.users (event, context, callback);
        break;
      default:
        callback(null, lbd.strBuildResponse(501, {error:'path not found in indexAPI routes for', msg:event.resource}));
        break;
    }
  } catch (error) {
    callback(null, lbd.strBuildResponse(501, {error:'unable to parse event.resource in indexAPI routes for event=' + JSON.stringify (event), msg:error}));
  }
};
