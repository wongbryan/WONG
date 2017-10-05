function changeImage(name){
	console.log('chage');
	var image = ImageData[name];
	var texture = image.texture;
	var aspect = image.aspect;
	var s = image.scale;

	var width = 50;
	var geom = new THREE.PlaneGeometry(width, width*aspect, 256, 256);

	shape.geometry = geom;
	shape.material.uniforms['texture'].value = texture;
	shape.scale.set(s, s, s);
}

/*MOUSE EVENTS*/
var mousedownID = -1; 
var interval = -1; 
var changed = false;
var changeBase = false;
var container = document.getElementById('container');
var follower = document.getElementById('instructions');

function onMouseMove( event ) {
	var mouseX = event.clientX, mouseY = event.clientY;
	follower.style.top = mouseY + "px";
	follower.style.left = mouseX + "px";

	mouse.x = ( event.clientX / window.innerWidth );
	mouse.y = -( event.clientY / window.innerHeight ) + 1;
	// console.log("(" + mouse.x + ", " + mouse.y + ")");
}

function mousedown(event) {
	if(mousedownID==-1)  
		mousedownID = setInterval(whilemousedown, 50 );
	if(interval!=-1){
		clearInterval(interval);
		interval = -1;
	}

	follower.style.display = "none";
}

function mouseup(event) {
   if(mousedownID!=-1) {  //Only stop if exists
	    clearInterval(mousedownID);
	    mousedownID=-1;

	    interval = setInterval(function(){
	     	if (shape.material.uniforms['magnitude'].value <= .05 ){
	     		shape.material.uniforms['magnitude'].value = .05
	     		clearInterval(interval);
	     		interval = -1;
	     		changed = false;
	     	}
	     	shape.material.uniforms['magnitude'].value -= 2*MORPH_INCREMENT;
	    }, 50);
   }

}

function whilemousedown() {
	var magnitude = shape.material.uniforms['magnitude'].value;
		// console.log(magnitude);
	if (magnitude >= 1.2 && !changed){
		changed = true;
		changeBase = true;
		shape.material.uniforms['magnitude'].value = 1.2;
		// changeImage('robot');
	}
	else
		shape.material.uniforms['magnitude'].value += MORPH_INCREMENT;
}

//Assign events
window.addEventListener('mousemove', onMouseMove, false);
container.addEventListener("mousedown", mousedown, false);
container.addEventListener("mouseup", mouseup, false);
//Also clear the interval when user leaves the window with mouse
container.addEventListener("mouseout", mouseup, false);

function showInstructions(event){
	event.stopPropagation();
	follower.style.display = "block";
}

function hideInstructions(event){
	event.stopPropagation();
	follower.style.display = "none";
}

container.addEventListener("mouseenter", showInstructions, false);

container.addEventListener("mouseleave", hideInstructions, false);

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	container.addEventListener("touchstart", mousedown);
	container.addEventListener("touchend", mouseup);
}
