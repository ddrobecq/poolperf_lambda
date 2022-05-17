var lbd = require ("../lambda.js");
var usersdb = require ("./usersdb.js");

/* RESPONSE TO GET/users/{id} */
exports.getOne = async (event, context, callback) => {
  await lbd.invoke (event, context, callback, usersdb.getOne)
};

/* RESPONSE TO GET/users/{id}/games */
exports.getallGames = async (event, context, callback) => {
  await lbd.invoke (event, context, callback, usersdb.getallGames)
};

/* RESPONSE TO GET/users/{id}/stats */
exports.getStats = async (event, context, callback) => {
  await lbd.invoke (event, context, callback, usersdb.getStats)
};

/* RESPONSE TO GET/users */
exports.getAll = async (event, context, callback) => {
  await lbd.invoke (event, context, callback, usersdb.getAll)
};


/* RESPONSE TO PUT/users/{id} */
exports.update = async (event, context, callback) => {
  await lbd.invoke (event, context, callback, usersdb.update)
 };

/* RESPONSE TO POST/users */
exports.create = async (event, context, callback) => {
  await lbd.invoke (event, context, callback, usersdb.create)
 };
