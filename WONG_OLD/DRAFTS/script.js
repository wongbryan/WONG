var print = document.getElementById('print'),
	web = document.getElementById('web'),
	misc = document.getElementById('misc'),
	circles = document.getElementsByClassName('circle'),
	printLink = document.getElementById('printLink'),
	webLink = document.getElementById('webLink'),
	miscLink = document.getElementById('miscLink');
var printGroup = []; //array of the groups
var webGroup = [];
var miscGroup = [];

printGroup.open = false; webGroup.open = false; miscGroup.open = false;

// window.addEventListener('load', function(){
// 	collapse(webGroup);
// 	collapse(miscGroup);
// 	collapse(printGroup);
// });

printLink.addEventListener('click', function(){
	if (!printGroup.open){
		expand(printGroup);
		collapse(webGroup); collapse(miscGroup);
		updateDot(0);
		printGroup.open = true;
	}
	else{
		collapse(printGroup);
		printGroup.open = false;
	}
});

webLink.addEventListener('click', function(){
	if (!webGroup.open){
		expand(webGroup);
		collapse(printGroup);
		collapse(miscGroup);
		updateDot(1);
		webGroup.open = true;
	}
	else{
		collapse(webGroup);
		webGroup.open = false;
	}
});

miscLink.addEventListener('click', function(){
	if (!miscGroup.open){
		expand(miscGroup);
		collapse(webGroup); collapse(printGroup);
		updateDot(2);
		miscGroup.open = true;
	}
	else{
		collapse(miscGroup);
		miscGroup.open = false;
	}
});

miscLink.addEventListener('mouseover', function(){
	updateDot(2);
});

miscLink.addEventListener('mouseout', function(){
	updateDot(-1);
});

printLink.addEventListener('mouseover', function(){
	updateDot(0);
});

printLink.addEventListener('mouseout', function(){
	updateDot(-1);
});

webLink.addEventListener('mouseover', function(){
	updateDot(1);
});

webLink.addEventListener('mouseout', function(){
	updateDot(-1);
});

document.getElementById('printLink').addEventListener("click", function(){

})


for (var i=0; print.childNodes[i] != undefined || web.childNodes[i] != undefined || misc.childNodes[i] != undefined; i++){ 
	if (i%2 !=0) {
		if (print.childNodes[i] != undefined)
			printGroup.push(print.childNodes[i]);
		if (web.childNodes[i] != undefined)
			webGroup.push(web.childNodes[i]);
		if (misc.childNodes[i] != undefined)
			miscGroup.push(misc.childNodes[i]);
	}
}

function updateDot(i){
	for (var k=0; k<circles.length; k++){
		if (k==i)
			circles[k].style.opacity = 1;
		else
			circles[k].style.opacity = 0;
	}
}

function collapse(group){
	collapseUp(group);
	setTimeout(function(){collapseLeft(group);}, 500);
	setTimeout(function(){flipOptions(group, 0);}, 500);
}

function collapseLeft(group){
	for (var i=0; i<group.length; i++){
		group[i].style.width = 100 + "px";
	}
}

function collapseUp(group){
	for (var i=0; i<group.length-1; i++){
		group[i].style.marginBottom = -15 + "px";
	}
}

function expand(group){
	expandDown(group);
	setTimeout(function(){expandRight(group);}, 500);
	setTimeout(function(){flipOptions(group, 1);}, 650);
}


function expandDown(group){
	for (var i=group.length-1; i>-1; i--){
		group[i].style.marginBottom = 5 + "px";
	}
}

function expandRight(group){
	for (var i=0; i<group.length; i++){
		group[i].style.width = 150 + "px";
	}
}

function flipOptions(group, show){
	var display = 0;
	if (show)
		display = 1;
	var options = [];
	for (var i=0; i<group.length; i++){
		var subGroup = group[i];
		for (var k=0; k<subGroup.childNodes.length; k++){
			if (k%2 != 0){
				console.log(subGroup.childNodes[k]);
				options.push(subGroup.childNodes[k]);
			}
		}
	}
	for (var j=2; j<options.length; j++){
		options[j].style.opacity = display;
	}
}