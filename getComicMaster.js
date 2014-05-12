/**************************************************************************************************
 * モジュール名　: 漫画マスタ情報取得バッチ
 * 概要　　　　　: 漫画マスタ情報を取得し保存する
 *************************************************************************************************/

// モジュール読み込み
module.paths.push('./my_modules/node_modules');
var Q = require('q'),
		db = require('cmn/cmnDb'),
		cmnFunc = require('cmn/cmnFunc'),
		getComiclist = require('getComicMaster/getComicList'),
		getComicListFromSales = require('getComicMaster/getComicListFromSales'),
		saveComicList = require('getComicMaster/saveComicList'),
		CONST = require('getComicMaster/const');

// 処理開始
(function(){

	Q.when(CONST.FUNC_NAME)
		// 初期処理
		.then(cmnFunc.initProc)
		// スクレイピングでコミック情報を取得
		.then(getComiclist)
		// 新刊情報からコミック情報を取得
		.then(function(in_comicList){
			return getComicListFromSales(in_comicList, db);
		})
		.fail(cmnFunc.errorProc)
		// 取得したコミック情報をDBに登録
		.then(function(in_comicList){
			return saveComicList(in_comicList, db);
		})
		.fail(cmnFunc.errorProc)
		// 終了処理
		.done(cmnFunc.endProc);

})();
