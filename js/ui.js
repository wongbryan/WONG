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
var container = document.getElementById('container');

function mousedown(event) {
	if(mousedownID==-1)  
		mousedownID = setInterval(whilemousedown, 50 );
	if(interval!=-1){
		clearInterval(interval);
		interval = -1;
	}
}

function mouseup(event) {
   if(mousedownID!=-1) {  //Only stop if exists
	    clearInterval(mousedownID);
	    mousedownID=-1;

	    interval = setInterval(function(){
	     	if (shape.material.uniforms['magnitude'].value <= .05){
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
		shape.material.uniforms['magnitude'].value = 1.2;
		// changeImage('robot');
	}
	else
		shape.material.uniforms['magnitude'].value += MORPH_INCREMENT;
}

//Assign events
container.addEventListener("mousedown", mousedown);
container.addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
container.addEventListener("mouseout", mouseup);
