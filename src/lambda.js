/* INIT LAMBDA ENV */
async function init (){
    if (process.env.AWS_SAM_LOCAL === 'true'){
        // ******** DEBUG MODE ************/

        /* GET ENVIRONMENT VARIABLES */
        const dotenv = require ("dotenv");
        dotenv.config();

        /* GET SECRET TO SET DBPWD */
        const strSecret = await strGetSecret(process.env.secretName, process.env.secretStringName);
        process.env.DBPWD = strSecret;

        console.log ("DEBUG MODE - Database : " + process.env.DBHOST + "/" + process.env.DBNAME);
    }
    /************ PDOD MODE **************/
    else console.log ("Environment : Production !");
};

/* GET SECRET FROM AWS */
strGetSecret = async function (strSecretName, strSecretString) {
    // Load the AWS SDK
    var AWS = require('aws-sdk');

    // Create a Secrets Manager client
    var client = new AWS.SecretsManager({region: "eu-west-3"});

    const secretValue = client.getSecretValue({SecretId: strSecretName}).promise();
    return secretValue
    .then ((data) => {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
            secret = JSON.parse(data.SecretString)[strSecretString];
        } else {
            let buff = new Buffer(data.SecretBinary, 'base64');
            decodedBinarySecret = buff.toString('ascii');
        }
        return(secret);
    }).catch (err => {
        throw err;
    });
};

/* BUILD RESPONSE TO BE SENT BY A LAMBDA */
function strBuildResponse (statusCode, responseBody){
    const response = {
        "statusCode": statusCode,
        "isBase64Encoded": false,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*", // Allow from anywhere 
            "Access-Control-Allow-Methods": "GET" // Allow only GET request 
        },
        "body": JSON.stringify(responseBody)
    };
    return (response);
};
exports.strBuildResponse = strBuildResponse;


/* PARSE body IF NECESSARY */
function objBody (body){
    let value
    if (typeof body === "string"){
        value = JSON.parse (body);
    } 
    else value = body;
    return value;
}

/* PARSE request AND INVOKE dbfunc TO RESPONSE */
exports.invoke = async function (request, context, callback, dbfunc){
    let payLoad;
    let id = 0;
    try {
        await init();
        payLoad = objBody (request.body);
        context.callbackWaitsForEmptyEventLoop = false;
        if (request.pathParameters != null) {
            if ('pathParameters' in request ){
                id = Number (request.pathParameters.id);
            }; 
        };
        await dbfunc (id, payLoad).then (function (results) {
            callback (null, strBuildResponse(200, results));
        }).catch (function (err){
            console.error (err);
            callback(strBuildResponse(500, err));
        });
    } catch (error) {
        console.error (error);
        callback(strBuildResponse(500, error));
    }
  };
  