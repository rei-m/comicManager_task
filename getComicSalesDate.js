/**************************************************************************************************
 * モジュール名　: 新刊情報取得バッチ
 * 概要　　　　　: 新刊情報を取得し保存する
 *************************************************************************************************/

// モジュール読み込み
module.paths.push('./my_modules/node_modules');
var Q = require('q'),
		db = require('cmn/cmnDb'),
		cmnFunc = require('cmn/cmnFunc'),
		CONST = require('getComicSalesDate/const'),
		getPublisherUrl = require('getComicSalesDate/getPublisherUrl'),
		getSalesInfo = require('getComicSalesDate/getSalesInfo'),
		saveSalesInfo = require('getComicSalesDate/saveSalesInfo');

(function(){
	Q.when(CONST.FUNC_NAME)
		// 初期処理
		.then(cmnFunc.initProc)
		// 出版社別新刊情報ページURLをスクレイピングで取得
		.then(getPublisherUrl)
		.fail(cmnFunc.errorProc)
		// 各出版社ページからスクレイピングで新刊情報を取得
		.then(getSalesInfo)
		.fail(cmnFunc.errorProc)
		// 取得した新刊情報をDBに登録
		.then(function(in_comicList){
			return saveSalesInfo(in_comicList, db);
		})
		.fail(cmnFunc.errorProc)
		// 終了処理
		.done(cmnFunc.endProc);
})();
