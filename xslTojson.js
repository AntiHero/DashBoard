const fs = require ('fs');
const readline = require ('readline');
const {google} = require('googleapis');
const _ = require('lodash');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMentors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMentors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const mentors = {};
  sheets.spreadsheets.values.get({
    spreadsheetId: '1-HYzpnEYpIsv5qSSuSZCgKf5-mYnG0T3Xt864Hhdnew',
    range: 'pairs!A2:B',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    const temp = Array.from(rows);
    
    temp.forEach((item, index, temp) => {
      if (mentors[item[0]] === undefined) {
        mentors[item[0]] = {};
        mentors[item[0]].students = [];
      }
      if(index < temp.length) {
        mentors[item[0]].students.push(item[1]);
      }
    });

    sheets.spreadsheets.values.get({
      spreadsheetId: '1-HYzpnEYpIsv5qSSuSZCgKf5-mYnG0T3Xt864Hhdnew',
      range: 'second_name-to_github_account!A1:E',
    },
      (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      const temp = Array.from(rows);
      let name = '';

      for (let key in mentors) {
        name = key.split(/\s+/);
        for (let i = 1; i < temp.length; i++) {
          if (name[1].toLowerCase() === temp[i][1].toLowerCase()) {
            if (temp[i][4].search('github.com/') !== -1) {
              mentors[key].github = temp[i][4];
            } else {
              mentors[key].github = 'https://github.com/' + temp[i][4];
            }
            break;
          }
        }
      }
      const file = JSON.stringify(mentors);
      if (file.length) {
        fs.writeFile("./assets/data/mentors.json", file, function(err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log('No data found.');
      }
    });
  });

  sheets.spreadsheets.values.get({
    spreadsheetId: '18exMEOWGKsMPggt0t3yU-MR1gvX3OFBDqKCvdNy8rAU',
    range: 'Form Responses 1!C2:F',
  },
    (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    //const temp = Array.from(rows);
    
    const file = JSON.stringify(rows);
    if (file.length) {
      fs.writeFile("./assets/data/score.json", file, function(err) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      console.log('No data found.');
    }
  });
}