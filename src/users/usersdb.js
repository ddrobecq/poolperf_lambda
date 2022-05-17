const db = require ("../db.js");

/* GET ONE USER BY ID */
function getOne (id, body){
    let strreq = 'SELECT * FROM user WHERE usr_id = ' + id;
    return (db.execSQL(strreq));
};

/* GET ALL USERS */
function getAll (id, body){
    let strreq = 'SELECT * FROM user';
    return (db.execSQL(strreq));
};

/* UPDATE A USER */
const update = function (id, body) {
    let strreq = 'UPDATE user \
    SET usr_name = "' + body.usr_name + '" WHERE usr_id=' + id;
    console.log (strreq);
    return (db.execSQL(strreq));
};

/* INSERT A USER */
const create = function (id, body) {
    let strreq = 'INSERT INTO user (usr_name) VALUES ("' + body.usr_name  +  '")';
    return (db.execSQL(strreq));
};

/* GET ALL games FOR A GIVEN user */
const getallGames = function (id, body) {
    let strreq = 'SELECT * FROM game WHERE (usr_id=' + id + ')';
    return (db.execSQL(strreq));
};

/* GET AVG FOR A GIVEN user */
const getStats = function (id, body) {
    let strreq = 'SELECT (sum(gam_pocket)/sum(gam_shot)) as avgPocket, \
    (sum(gam_foul)/sum(gam_shot)) as avgFoul, \
    min(gam_foul/gam_shot) as minFoul, \
    max(gam_foul/gam_shot) as maxFoul , \
    min(gam_pocket/gam_shot) as minPocket, \
    max(gam_pocket/gam_shot) as maxPocket \
    FROM game WHERE (usr_id=' + id + ') \
    GROUP BY usr_id';
    return (db.execSQL(strreq));
};

module.exports ={
    getOne,
    getAll,
    update,
    create,
    getallGames,
    getStats
}