function doGet(){
  
  var cache = CacheService.getScriptCache();
  var cache_data = cache.get("Cache");
  
  if(cache_data != null)
  {
    return ContentService.createTextOutput(cache_data).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  var url = "#Google Sheet 連結";
  var google_sheet = SpreadsheetApp.openByUrl(url);
  var Sheet = google_sheet.getSheets()[0];  
  var result = getSheetList(Sheet);
  
  cache.put("Cache",result,10)
  
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  
  var param = e.parameter;
  var id = param.id;
  var location = param.location;
  var title = param.title;
  

  var url = "#Google Sheet 連結";
  var google_sheet = SpreadsheetApp.openByUrl(url);
  var Sheet = google_sheet.getSheets()[0];  
    
  var rowData = Sheet.appendRow([id,location,title]);  
  
}

function getSheetList(sheet)
{
  var jsonData = {};
  var dataArray = []; 
  var rows = sheet.getRange(2,1,sheet.getLastRow()-1, sheet.getLastColumn()).getValues();
  
  for(var i = 0, l= rows.length; i<l ; i++){
    var dataRow = rows[i];
    var record = {};
    record['id'] = dataRow[0].toString();
    record['location'] = dataRow[1];
    record['title'] = dataRow[2];
    dataArray.push(record);
  }    
  var result = JSON.stringify(dataArray);  
  return result;
}
