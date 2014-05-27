/*\
title: $:/plugins/cjrk68/moviesearch/modules/tmdb.js
type: application/javascript
module-type: utils



\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

function Tmdb (baseurl,apiKey) {
	this.baseurl = baseurl
	this.apiKey = apiKey
}

Tmdb.prototype.api = function(url, params, callback) {
	var async = (typeof callback !== 'undefined')
	var paramArr = [];
	paramArr.push("api_key="+encodeURIComponent(this.apiKey));
	for (var k in params) {
		paramArr.push(k+"="+encodeURIComponent(params[k]));
	}
	var paramStr = paramArr.join("&");
	var xhr = new XMLHttpRequest();
	xhr.open("GET", this.baseurl+url+"?"+paramStr,async);
	xhr.setRequestHeader("Accept", "application/json");
	if (async) {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				callback(this.status, JSON.parse(this.responseText));
			}
		};
	}
	xhr.send(null);
	if (!async) return JSON.parse(xhr.responseText);
};

exports.tmdb = new Tmdb("http://api.themoviedb.org/", "b54698b301da20228c76193f3fea3073");

exports.createTiddlerForMovie = function (movie_id, cb, extra_fields) {
	exports.tmdb.api("/3/movie/"+movie_id, {}, function(status, res){
		if (status!=200) {
			alert("Error while trying to get information for movie_id "+movie_id);
		} else {
			console.log(res);
			var fields = {
				"title": res.title,
				"year": res.release_date,
				"description": res.overview,
				"picture": "http://image.tmdb.org/t/p/w185"+r.poster_path
			};
			cb(fields);
		}
	});
};


exports.createTiddlersFromSearch = function (query, cb, extra_fields) {
	exports.tmdb.api("/3/search/movie", {"query":query}, function(status, res){
		if (status!=200) {
			alert("Error while trying to search for "+query);
		} else {
			var count = Math.min(5,res.results.length)
			var ids = []
			for (var i=0; i<count; ++i) {
				var r = res.results[i];
				exports.tmdb.api("/3/movie/"+r.id, {}, function (stat, movieinfo) {
					var fields = {
						"title": movieinfo.title,
						"movie_id": movieinfo.id,
						"year": movieinfo.release_date,
						"description": movieinfo.overview,
						"picture": "http://image.tmdb.org/t/p/w185"+movieinfo.poster_path
					};
					exports.tmdb.api("/3/movie/"+movieinfo.id+"/videos", {}, function (stat, res) {
						for (var k in res.results) {
							if (res.results[k].type == "Trailer" && res.results[k].site == "YouTube" ) {
								fields.trailer = res.results[k].key;
								break;
							}
						}
						cb(fields);
					})
				});
			}
		}
	});
};

})();
