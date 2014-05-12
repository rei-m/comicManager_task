// モジュール読み込み
var db = require("mod/cmnDb"),
    bl = require("mod/getComicSalesDateBL");

(function(){

  bl.getAndSaveComicList(db);

})();
