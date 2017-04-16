

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
		var skip = document.getElementById('skip');
		document.body.style.overflowY = "scroll";
		document.body.style.overflowX = "hidden";
		document.body.removeChild(cont);
		document.body.removeChild(counter);
		document.body.removeChild(skip);
	}

	animation.addEventListener('complete', completeAnim);
	document.getElementById('skip').addEventListener('click', completeAnim);

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
///////
