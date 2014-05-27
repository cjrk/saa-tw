/*\
title: $:/plugins/cjrk68/moviesearch/commands/evolve.js
type: application/javascript
module-type: command

Command to set the default evolve location (defaults to current working directory)

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

exports.info = {
	name: "evolve",
	synchronous: true
};

var Command = function(params,commander,callback) {
	this.params = params;
	this.commander = commander;
	this.callback = callback;
};

Command.prototype.execute = function() {
	this.commander.streams.output.write("EVOLVING!\n");
	var self = this,
		out = this.commander.streams.output,
		filter = this.params[0],
		wiki = this.commander.wiki,
		tiddlers = wiki.filterTiddlers(filter);
	$tw.utils.each(tiddlers,function(title) {
		out.write("    evolving "+title+"!\n");
		
	});
	return null;
};

exports.Command = Command;

})();
