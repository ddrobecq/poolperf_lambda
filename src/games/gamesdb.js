const db = require('../db');

/* SAVE A GAME */
const create = function (id, body) {
    if (!isNaN (body.player.playerId))
        if (!isNaN (body.player.nbShot)) 
            if (!isNaN (body.player.nbPocket)) 
                if (!isNan (body.player.nbShot)) {
                    let strreq = 'INSERT INTO game (usr_id, gam_shot, gam_pocket, gam_foul) \
                    VALUES (' + body.player.playerId + ',' + body.player.nbShot + ',' + body.player.nbPocket + ',' + body.player.nbFoul +  ')';
                    
                    return (db.execSQL(strreq));
                };
    //otherwise, there is an error in the body's parameters
    return ({
        "error": "Impossible to save a game. Wrong type in arguement list",
        "arg": body.player
        }); 
};

module.exports ={
    create
}