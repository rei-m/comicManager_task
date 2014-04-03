// モジュール読み込み
var db = require("mod/cmnDb"),
    bl = require("mod/getComicMasterBL"),
    logger = require('mod/logger');

(function(){

  // 処理開始ログ

  // コミック情報を取得してDBに保存する
  bl.getAndSaveComicList(db);

  // 処理終了ログ

})();
