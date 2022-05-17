const mysql = require('mysql');

/* EXECUTE SQL QUERY WITH A PROMISE */
exports.execSQL = function (strreq) {
    const con = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPWD,
        database: process.env.DBNAME
    });

    let p = new Promise (function (res, rej) {
        con.query(strreq, function (err, result) {
            if (err) rej (err); 
            else{
                res (result); 
            }
        });        
    });
    return p;
};
