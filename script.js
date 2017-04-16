var fixed = document.getElementById('fixed');
function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

var scrollBarWidth = getScrollbarWidth();

function checkNavBar(){
	var scrollTop = Number(document.body.scrollTop);
	var scrollTotal = Number(document.body.scrollHeight)-Number(window.innerHeight);
	
	if(scrollTop > scrollTotal-75 || scrollTop < 75){
		fixed.style.transform = "translate(-" + 50 + "%, " + -50 + "%) scaleY(" + 1 + ")";
	}
	else{
		if (frameOn)
			return;
		fixed.style.transform = "translate(-" + 50 + "%, " + -50 + "%) scaleY(" + 0 + ")";
	}
}

window.addEventListener('load', function(){
	fixed.style.transform = "translate(-" + 50 + "%, " + -50 + "%) scaleY(" + 1 + ")";
})
window.addEventListener('scroll', checkNavBar);

function defineWindow(){

	var content = document.getElementsByClassName('content')[0];
	var projects = document.getElementsByClassName('project');

	var height = window.innerHeight; 
	var width = window.innerWidth - scrollBarWidth;

	for (var i=0; i<projects.length; i++){
		projects[i].style.width = width;
		projects[i].style.height = height;
	}

	content.style.width = width + "px";

	height = height-(.06*width);
	width = width-(.06*width);

	fixed.style.height = height + "px";
	fixed.style.width = width + "px";
}

defineWindow();

window.addEventListener('resize', defineWindow);

//toggle

var frameOn = false;
var toggle = document.getElementsByClassName('toggleFrame')[0];
toggle.addEventListener('click', toggleFrame);

function toggleFrame(){
	if (frameOn){
		frameOn = false;
		fixed.style.transform = "translate(-" + 50 + "%, " + -50 + "%) scaleY(" + 0 + ")";
		toggle.innerHTML = "ENABLE FRAME";
		window.addEventListener('scroll', checkNavBar);
	}
	else{
		fixed.style.transform = "translate(-" + 50 + "%, " + -50 + "%) scaleY(" + 1 + ")";
		frameOn = true;
		toggle.innerHTML = "DISABLE FRAME";
		window.removeEventListener('scroll', checkNavBar);
	}
}
