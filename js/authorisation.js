//----------------------------------------------------------------
// file name: js/authorisation.js
//----------------------------------------------------------------
// Contributed to by 750430 & 703451
//----------------------------------------------------------------
// Component version: v0.1
// - implementation of:
// - Google Drive Access, using it's API in Node.js / NPM
//   Uses client_secret.json as downloaded from the wizard,
//   as found here: https://console.developers.google.com/start/api?id=drive
//----------------------------------------------------------------
// Google Drive API Authentication
//----------------------------------------------------------------
// REFERENCED FROM: https://developers.google.com/drive/v3/web/quickstart/nodejs

// TODO: Pass all user interaction details for HTML rendering, rather than CLI.
// TODO: ES6 formatting for block-scoped variables
// TODO: comment out / remove / disable 'listFiles' function, and write a CREATE new google doc function

const fs            = require('fs');
const readline      = require('readline');
const google        = require('googleapis');
const googleAuth    = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/drive-nodejs-quickstart.json
// https://www.googleapis.com/auth/drive.metadata.readonly
const SCOPES        = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_DIR     = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH    = TOKEN_DIR + 'drive-nodejs-quickstart.json';


// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the Drive API.
    authorize(JSON.parse(content), createFile);
});


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId     = credentials.installed.client_id;
    var redirectUrl  = credentials.installed.redirect_uris[0];
    var auth         = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to ' + TOKEN_PATH);
}


// Function to create a binary text file with the contents "hello world"

// Failing with 403 permissions error - suspect oauth isn't being passed in properly

function createFile(auth) {
    //var drive = google.drive('v3');
    var drive = google.drive({ version: 'v3', auth: auth });
    drive.files.create({
        resource: {
            name: 'Test',
            mimeType: 'text/plain'
        },
        media: {
            mimeType: 'text/plain',
            body: 'Hello World'
        }
    })
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function listFiles(auth) {
    var service = google.drive('v3');
    service.files.list({
        auth: auth,
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var files = response.files;
        if (files.length == 0) {
            console.log('No files found.');
        } else {
            console.log('Files:');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('%s (%s)', file.name, file.id);
            }
        }
    });
}