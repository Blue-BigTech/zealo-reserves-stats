const {google} = require('googleapis');

async function writeDataAPI(auth, sheetId, range, values) {
    const sheets = google.sheets({version: 'v4', auth});
    const request = {
      spreadsheetId: sheetId,
      // range: "Google Sunroof!D2:G",
      range: range,
      valueInputOption: "USER_ENTERED",
      resource: {values: [
        values
      ]},
      auth: auth,
    }
    const response = await sheets.spreadsheets.values.update(request);
    return response;
}

module.exports = {
    writeDataAPI
}
  