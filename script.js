var nav = document.getElementById('nav'); 
var links = nav.getElementsByTagName('a');

links[0].addEventListener('click', function(){
	current.transitionTo("printBox");
});

links[1].addEventListener('click', function(){
	current.transitionTo("webBox");
});

links[2].addEventListener('click', function(){
	current.transitionTo("moveBox");
});

links[3].addEventListener('click', function(){
	current.transitionTo("photoBox");
});

var current = new currentContainer(document.getElementById('webBox'));

function currentContainer(object){
	this.current = object;
	this.transitionTo = function(box){ //string
		var to = document.getElementById(box);
		let cur = this.current; 
		cur.style.opacity = 0;
		setTimeout(function(){cur.style.display="none"; to.style.display = "block";}, 250);
		to.style.opacity = 1;
		this.current = to;
	}
}

	var animation = bodymovin.loadAnimation({
		container: document.getElementById('container'),
		loop: false,
		autoplay: false,
		renderer: 'svg',
		path: 'WONG.json',
		rendererSettings: {

   		scaleMode: 'noScale',
    	clearCanvas: false
 		}
	});

	function completeAnim(){
		complete = false;
		document.body.removeEventListener('mousedown', mouseDown);
		document.body.removeEventListener('mouseup', mouseUp);
		var cont = document.getElementById('container');
		var counter = document.getElementById('counter');
		document.body.style.overflowY = "scroll";
		document.body.style.overflowX = "hidden";
		document.body.removeChild(cont);
		document.body.removeChild(counter);
	}

	animation.addEventListener('complete', completeAnim);

	function remove(){
		var child = document.getElementById('container');
		document.body.removeChild(child);

	}

	var mousedown = 0;
	var timer = 0;
	var interval;
	var complete = false;

	function play(){
		if (timer>30 && mousedown != 0){
			clearInterval(interval);
			document.getElementById('counter').style.opacity = 0;
			animation.stop();
			animation.play();
		}
		else{
			timer++;
		}
	}

	function mouseDown(){
		interval = setInterval(function(){play();}, 50);
		mousedown++;
	}

	function mouseUp(){
		animation.stop();
		clearInterval(interval);
		if (timer > 30 && complete == true){
			document.getElementById('container').style.opacity = 0;
		}
		else{
			document.getElementById('counter').style.opacity = 1;
			timer = 0;
		}

		mousedown--;
	}

	document.body.addEventListener('mousedown', mouseDown);

	document.body.addEventListener('mouseup', mouseUp);

////////////////
	// var container = document.getElementById('container');
	// document.body.removeChild(container);
	function Nav(){
		this.bars = document.getElementsByClassName('bar');
		this.open = false;
		this.DOMObject = document.getElementById('nav');
		this.textNodes = this.DOMObject.getElementsByTagName('a');
		this.callable = true;

		this.expandDown = function(){
			for (var i=0; i<this.bars.length; i++){
			this.bars[i].style.marginBottom = 3 + "px";
			}
			this.callable = false;
		}

		this.expandRight = function(){ 
			for (var i=0; i<this.bars.length; i++){
			this.bars[i].style.width = 95+ "px";
			}
		}


		this.collapseLeft = function(){
			for (var i=0; i<this.bars.length; i++){
				this.bars[i].style.width = 30 + "px";
			}
		}	

		this.collapseUp = function(){
			for (var i=0; i<this.bars.length; i++){
				this.bars[i].style.marginBottom = -17.5 + "px";
			}
			this.open = false;
			this.callable = true;
		}

		this.showTextNodes = function(){
			for (var i=0; i<this.bars.length; i++){
			this.textNodes[i].style.display = "inline";
			}
			this.open = true;
			this.callable = true;
		}

		this.hideTextNodes = function(){
			for (var i=0; i<this.bars.length; i++){
			this.textNodes[i].style.display = "none";
			}
			this.callable = false;
		}
	}

	var navSquare = new Nav;
	navSquare.DOMObject.addEventListener('mouseenter', function(){
			if (!navSquare.callable)
				return;
			navSquare.expandDown();
			setTimeout(function(){navSquare.expandRight();}, 200);
			setTimeout(function(){navSquare.showTextNodes();}, 500);
	})

	navSquare.DOMObject.addEventListener('mouseleave', function(){
			if (!navSquare.callable)
				return;
			navSquare.hideTextNodes();
			setTimeout(function(){navSquare.collapseLeft();}, 200);
			setTimeout(function(){navSquare.collapseUp();}, 500);
			navSquare.open = false;
	})

///////

window.addEventListener('scroll', checkNavBar);

function checkNavBar(){
	var scrollTop = Number(document.body.scrollTop);
	if((scrollTop) < 75){
		document.getElementsByClassName('flag')[0].style.color = "black";
		document.getElementsByClassName('flag')[0].style.top = 25 + "px";
		document.getElementById('nav').style.top = 90 + "px";
	}
	else{
		document.getElementsByClassName('flag')[0].style.color = "transparent";
		document.getElementsByClassName('flag')[0].style.top = -50 + "px";
		document.getElementById('nav').style.top = 35 + "px";
	}
}
