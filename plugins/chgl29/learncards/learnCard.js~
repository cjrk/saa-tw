/*\
title: $:/plugins/chgl29/learncards/learnCard.js
type: application/javascript
module-type: widget

learnCard widget

<$learnCard question="question text" answer="answer text" tags"tag1,tag2">

\*/

(function(){
var Widget = require("$:/core/modules/widgets/widget.js").widget;
var test = require("$:/core/modules/widgets/fieldmangler.js").widget;
var learnCardWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
learnCardWidget.prototype = new Widget();

learnCardWidget.prototype.render = function(parent,nextSibling){
this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	var domNode = this.create(parent,nextSibling);
	this.domNodes.push(domNode);
	parent.insertBefore(domNode,nextSibling);
	this.renderChildren(parent,nextSibling);

};
learnCardWidget.prototype.execute = function(){
	this.answer = this.getAttribute("answer");
	this.question = this.getAttribute("question");
	this.tagsInited=false;
	this.selectClass = this.getAttribute("class");
 	this.tiddler = this.getVariable("currentTiddler");
	this.mangleTitle = this.getAttribute("tiddler",this.getVariable("currentTiddler"));
	this.makeChildWidgets();
};
learnCardWidget.prototype.removeChildDomNodes = function(){

};
learnCardWidget.prototype.create = function(){
var that = this;
var domNode = $tw.utils.domMaker("div",{class:this.selectClass});

//create Answer DIV
var answerDiv = this.document.createElement("DIV");
answerDiv.style.display="none";
answerDiv.style.textAlign="center";
answerDiv.appendChild(this.document.createTextNode(this.answer));
answerDiv.appendChild(this.document.createElement("BR"));

//create Question DIV
var questionDiv = this.document.createElement("DIV");
questionDiv.appendChild(this.document.createTextNode(this.question));
questionDiv.appendChild(this.document.createElement("BR"));
questionDiv.style.textAlign="center";

//create Button showAnswer
var buttonShowAnswer = this.document.createElement("INPUT");
buttonShowAnswer.setAttribute("type","BUTTON");
buttonShowAnswer.value="show Answer";
buttonShowAnswer.addEventListener("click",function(){answerDiv.style.display="block";questionDiv.style.display="none";});

//create Button fail
var buttonFail = this.document.createElement("INPUT");
buttonFail.setAttribute("type","BUTTON");
buttonFail.value="fail";
buttonFail.addEventListener("click",function (){that.addTag("fail");that.removeTag("success")});

//create Button success
var buttonSuccess = this.document.createElement("INPUT");
buttonSuccess.setAttribute("type","BUTTON");
buttonSuccess.value="success";
buttonSuccess.addEventListener("click",function (){that.addTag("success");that.removeTag("fail")});

//create Button showQuestion
var buttonShowQuestion = this.document.createElement("INPUT");
buttonShowQuestion.setAttribute("type","BUTTON");
buttonShowQuestion.value="show Question";
buttonShowQuestion.addEventListener("click",function(){answerDiv.style.display="none";questionDiv.style.display="block";});

//append createt Elements to DIVs
domNode.appendChild(questionDiv);
domNode.appendChild(answerDiv);
questionDiv.appendChild(buttonShowAnswer);
answerDiv.appendChild(buttonFail);
answerDiv.appendChild(buttonShowQuestion);
answerDiv.appendChild(buttonSuccess);

return domNode;
};

learnCardWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.question || changedAttributes.answer) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};


/*
Remove Tag from Tiddler
@param tag string Name of the Tag
*/
learnCardWidget.prototype.removeTag = function(tag){
var tiddler = this.wiki.getTiddler(this.mangleTitle);
var modificationObject = this.wiki.getModificationFields();
if(tiddler.fields.tags || modificationObject.tags.length===0){
var p = tiddler.fields.tags.indexOf(tag);
		if(p !== -1) {
			modificationObject.tags = (tiddler.fields.tags || []).slice(0);
			modificationObject.tags.splice(p,1);
		this.wiki.addTiddler(new $tw.Tiddler(tiddler,modificationObject));
		}
}else{
modificationObject.tags = undefined;
}
};
/*
Add Tag to Tiddler
@param tag string Name of the Tag
*/
learnCardWidget.prototype.addTag = function(tag){
var tiddler = this.wiki.getTiddler(this.mangleTitle);
var modificationObject = this.wiki.getModificationFields();
modificationObject.tags = (tiddler.fields.tags || []).slice(0);
$tw.utils.pushTop(modificationObject.tags,tag);
this.wiki.addTiddler(new $tw.Tiddler(tiddler,modificationObject));
};

exports.learnCard = learnCardWidget;
})();
