const mysql = require('mysql');

var pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DBNAME
});

/* EXECUTE SQL QUERY WITH A PROMISE */
exports.escape = function (str) {
    return mysql.escape (str);
}

/* EXECUTE SQL QUERY WITH A PROMISE */
exports.execSQL = function (strreq) {
    let p = new Promise (function (res, rej) {
        pool.getConnection(err, con) {
            con.query(strreq, function (err, result) {
                if (err) rej (err); 
                else{
                    res (result); 
                }
            });            
        };
    });
    return p;
};

