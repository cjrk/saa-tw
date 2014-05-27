/*\
title: $:/plugins/cjrk68/moviesearch/widgets/youtube.js
type: application/javascript
module-type: widget

Text node widget

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var YouTubeWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
YouTubeWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
YouTubeWidget.prototype.render = function(parent,nextSibling) {
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	var vid = this.getAttribute("vid"),
		iframe = this.document.createElement("iframe");
	iframe.setAttribute("width",560);
	iframe.setAttribute("height",315);
	iframe.setAttribute("src","http://www.youtube.com/embed/"+vid);
	parent.insertBefore(iframe,nextSibling);
	this.domNodes.push(iframe);
};

/*
Compute the internal state of the widget
*/
YouTubeWidget.prototype.execute = function() {
	// Nothing to do for a text node
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
YouTubeWidget.prototype.refresh = function(changedTiddlers) {
	return false;
};

exports.youtube = YouTubeWidget;

})();
