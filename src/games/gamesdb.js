const db = require('../db');

/* SAVE A GAME */
const create = function (id, body) {
    let strreq = 'INSERT INTO game \
    (usr_id, gam_shot, gam_pocket, gam_foul) \
    VALUES (' + body.player.playerId + ',' + body.player.nbShot + ',' + body.player.nbPocket + ',' + body.player.nbFoul +  ')';
    
    return (db.execSQL(strreq));
};

module.exports ={
    create
}