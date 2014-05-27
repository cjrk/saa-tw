/*\
title: $:/plugins/cjrk68/moviesearch/widgets/addmovie.js
type: application/javascript
module-type: widget

Text node widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var AddMovieWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
AddMovieWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
AddMovieWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	var self = this,
		btn = this.document.createElement("input");
	btn.setAttribute("type", "text");
	btn.addEventListener("keypress",function(evt){
		if (evt.keyCode==13) {
			$tw.utils.createTiddlersFromSearch(evt.srcElement.value, function (tiddler_fields) {
				tiddler_fields.text = "{{||$:/plugins/cjrk68/moviesearch/movietemplate}}"
				self.dispatchEvent({type: "tw-import-tiddlers", param: JSON.stringify([tiddler_fields])});
			});
		}
	});
	parent.insertBefore(btn,nextSibling);
	this.domNodes.push(btn);
};

/*
Compute the internal state of the widget
*/
AddMovieWidget.prototype.execute = function() {
	// Nothing to do for a text node
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
AddMovieWidget.prototype.refresh = function(changedTiddlers) {
	return false;
};

exports.addmovie = AddMovieWidget;

})();
