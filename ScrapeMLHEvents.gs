function scrapeMLHEvents() {
  const response = UrlFetchApp.fetch('https://mlh.io/events')
  const html = response.getContentText()

   // Load the Cheerio library
  var $ = Cheerio.load(html);

  // Create or open the "Events" Google Sheet
  var sheetName = "Events";
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  // Clear existing content in the sheet
  sheet.clear();

  // Set up headers
  var headers = ["Name", "Date", "Location", "Image", "Link"];
  sheet.appendRow(headers);

  // Find all event elements
  var eventElements = $("div.event");

  // Loop through each event and extract the required information
  eventElements.each(function (index, element) {
    var eventName = $(element).find(".event-name").text();
    var eventDate = $(element).find(".event-date").text().trim();
    var eventLocation = $(element).find(".event-location").text().trim();
    var eventImage = $(element).find(".image-wrap img").attr("src");
    var eventLink = $(element).find(".event-link").attr("href");

    // Append the event details to the sheet
    sheet.appendRow([eventName, eventDate, eventLocation, eventImage, eventLink]);
  });
}
