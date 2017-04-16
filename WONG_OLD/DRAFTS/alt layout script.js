//VERY INEFFICIENT CODE, FIX LATER

var print = document.getElementById('print'),
	web = document.getElementById('web'),
	misc = document.getElementById('misc'),
	printLink = document.getElementById('printLink'),
	webLink = document.getElementById('webLink'),
	miscLink = document.getElementById('miscLink');
var printGroup = []; //array of the groups
var webGroup = [];
var miscGroup = [];

printGroup.open = true; webGroup.open = false; miscGroup.open = false;

window.addEventListener('load', function(){
	expand(printGroup, print);
});

printLink.addEventListener('click', function(){
	if (!printGroup.open){
		expand(printGroup, print);
		collapse(webGroup, web); collapse(miscGroup, misc);
		printGroup.open = true;
	}
	else{
		collapse(printGroup, print);
		printGroup.open = false;
	}
});

printLink.addEventListener('mouseover', function(){
	expandDownHover(printGroup, print);
});

printLink.addEventListener('mouseout', function(){
	collapseUpHover(printGroup, print);
});

webLink.addEventListener('click', function(){
	if (!webGroup.open){
		expand(webGroup, web);
		collapse(printGroup, print);
		collapse(miscGroup, misc);
		webGroup.open = true;
	}
	else{
		collapse(webGroup, web);
		webGroup.open = false;
	}
});

webLink.addEventListener('mouseover', function(){
	expandDownHover(webGroup, web);
});

webLink.addEventListener('mouseout', function(){
	collapseUpHover(webGroup, web);
});

miscLink.addEventListener('click', function(){
	if (!miscGroup.open){
		expand(miscGroup, misc);
		collapse(webGroup, web); collapse(printGroup, print);
		miscGroup.open = true;
	}
	else{
		collapse(miscGroup, misc);
		miscGroup.open = false;
	}
});

miscLink.addEventListener('mouseover', function(){
	expandDownHover(miscGroup, misc);
});

miscLink.addEventListener('mouseout', function(){
	collapseUpHover(miscGroup, misc);
});


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

function collapse(group, groupCont){
	flipOptions(group, 0);
	collapseUp(group, groupCont);
	setTimeout(function(){collapseLeft(group);}, 500);
}

function collapseLeft(group){
	for (var i=0; i<group.length; i++){
		group[i].style.width = 100 + "px";
	}
}

function collapseUp(group, groupCont){
	for (var i=0; i<group.length-1; i++){
		group[i].style.marginBottom = -3 + "px";
	}
	if (groupCont == misc){
		groupCont.style.marginTop = 0 + "px";
	}
	else{
	groupCont.style.marginBottom = 0 + 'px';
	}
}

function collapseUpHover(group, groupCont){
	if (group == printGroup){
		if (printGroup.open)
			return;
	}
	if (group == webGroup){
		if (webGroup.open)
			return;
	}
	if (group == miscGroup){
		if (miscGroup.open)
			return;
	}
	for (var i=0; i<group.length-1; i++){
		group[i].style.marginBottom = -3 + "px";
	}
}

function expand(group, groupCont){
	expandDown(group, groupCont);
	setTimeout(function(){expandRight(group);}, 500);
	setTimeout(function(){flipOptions(group, 1);}, 650);
}

function expandDown(group, groupCont){
	for (var i=group.length-2; i>-1; i--){
			group[i].style.marginBottom = 2.5 + "px";
	}
	if (groupCont == misc)
		groupCont.style.marginTop = 35 + "px";
	else{
	groupCont.style.marginBottom = 35 + "px";
	}
}

function expandDownHover(group, groupCont){
	if (group == printGroup){
		if (printGroup.open)
			return;
	}
	if (group == webGroup){
		if (webGroup.open)
			return;
	}
	if (group == miscGroup){
		if (miscGroup.open)
			return;
	}
	for (var i=group.length-2; i>-1; i--){
			group[i].style.marginBottom = 0 + "px";
	}
}

function expandRight(group){
	for (var i=0; i<group.length; i++){
		group[i].style.width = 120 + "px";
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

//page transitions

var counter = 0;
var sections = document.getElementsByTagName("section");
document.body.addEventListener("mousewheel", mouseWheelEventHandler, false)
var canScroll = true;

function stopScrolling(){ //user unable to scroll for 1 second after moving up/down
	setTimeout(function(){
		if (canScroll == false)
			canScroll = true;
	}, 1000);
}

function mouseWheelEventHandler(e){
	if (canScroll == false)
		return;
	var e = window.event || e; // old IE support //window.event represents the event passed into the event handler
	if (e.wheelDelta > 100){
		move('up');
		canScroll = false;
		stopScrolling();
	}
	else if (e.wheelDelta < -100){
		move('down');
		canScroll = false;
		stopScrolling();
	}
	return false;
}

function move(dir){
	if (counter >= 9 && dir == 'down')
		return;
	else if (counter == 0 && dir == 'up')
		return
	if (dir == 'up')
		counter--;
	else
		counter++;
	for (var i=0; i<sections.length; i++){
		var MT = sections[i].style.top; //string
		MT = MT.substring(0, MT.length-1);
		MT = Number(MT);
		if (dir == 'down'){
			MT = MT - 100;
		}
		else if (dir == 'up'){
			MT = MT + 100;
		}
		sections[i].style.top = MT + "%";
	}
}
