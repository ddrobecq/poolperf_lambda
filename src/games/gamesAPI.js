var lbd = require ("../lambda.js");
var gamesdb = require ("./gamesdb.js");


/* RESPONSE TO POST/games */
exports.create = async (event, context, callback) => {
  await lbd.invoke (event, context, callback, gamesdb.create)
};

