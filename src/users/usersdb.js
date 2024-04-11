const db = require ("../db.js");

/* GET ONE USER BY ID */
function getOne (id, body){
    let strreq = `SELECT usr_id, usr_name FROM user WHERE usr_id = ${id}`;
    return (db.execSQL(strreq));
};

/* GET ONE USER'AVATAR BY ID */
function getImage (id, body){
    let strreq = `SELECT usr_id, usr_avatar as usr_avatar FROM user WHERE usr_id = ${id}`;
    return (db.execSQL(strreq));
};

/* GET ALL USERS */
function getAll (id, body){
    let strreq = "SELECT usr_id, usr_name FROM user";
    return (db.execSQL(strreq));
};

/* UPDATE A USER */
const update = function (id, body) {
    let strreq;
    if (body.usr_avatar == undefined) {
        strreq = `UPDATE user \
        SET usr_name = ${db.escape(body.usr_name)} WHERE usr_id=${id}`;
    } else {
        strreq = `UPDATE user \
        SET usr_name = ${db.escape(body.usr_name)}, \
        usr_avatar = ${db.escape(body.usr_avatar)} WHERE usr_id=${id}`;
    }
    return (db.execSQL(strreq));
};

/* INSERT A USER */
const create = function (id, body) {
    let strreq;
    if (body.usr_avatar == undefined) {
        strreq = `INSERT INTO user (usr_name) VALUES (${db.escape(body.usr_name)})`;
    } else {
        strreq = `INSERT INTO user (usr_name, usr_avatar) VALUES (${db.escape(body.usr_name)}, ${db.escape(body.usr_avatar)})`;
    }
    return (db.execSQL(strreq));
};

/* GET ALL games FOR A GIVEN user */
const getallGames = function (id, body) {
    let strreq = `SELECT * FROM game WHERE (usr_id=${id})`;
    return (db.execSQL(strreq));
};

/* GET AVG FOR A GIVEN user */
const getStats = function (id, body) {
    let strreq = `SELECT (sum(gam_pocket)/sum(gam_shot)) as avgPocket, \
    (sum(gam_foul)/count(gam_id)) as avgFoul, \
    min(gam_foul) as minFoul, \
    max(gam_foul) as maxFoul , \
    min(gam_pocket/gam_shot) as minPocket, \
    max(gam_pocket/gam_shot) as maxPocket \
    FROM game WHERE (usr_id=${id}) \
    GROUP BY usr_id`;
    return (db.execSQL(strreq));
};

module.exports ={
    getOne,
    getImage,
    getAll,
    update,
    create,
    getallGames,
    getStats
}