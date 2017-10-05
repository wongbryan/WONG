var camera, scene, renderer, controls;
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

var mouse = new THREE.Vector2();
var resolution = new THREE.Vector2(SCREEN_WIDTH*2, SCREEN_HEIGHT*2);

var box;
var shape;
var distScale = new THREE.Vector2(1., 1.);
var geom, shapeMat;

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth );
	mouse.y = -( event.clientY / window.innerHeight ) + 1;
	// console.log("(" + mouse.x + ", " + mouse.y + ")");
}

function resize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

	resolution.x = window.innerWidth*2;
	resolution.y = window.innerHeight*2;
}

function init() {
	var container = document.getElementById( 'container' );
	renderer = new THREE.WebGLRenderer({antialias: true, alpha : true});
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCSoftShadowMap;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xffffff, 0);
	renderer.domElement.style.zIndex = -1;
	container.appendChild( renderer.domElement );
	
	camera = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, -1000, 1000 );;
	camera.position.set(0, 0, 1);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableRotate = false;
	controls.enableZoom = false;
	controls.rotateSpeed = 2.0;
	controls.panSpeed = 0.8;
	controls.zoomSpeed = 1.5;

	scene = new THREE.Scene();

	var ambientLight = new THREE.AmbientLight(0xffffff);

	scene.add(ambientLight);

	window.addEventListener('resize', resize);
	window.addEventListener('mousemove', onMouseMove);
}

function update(){
	shapeMat.uniforms['time'].value += .05;
	controls.update();
}

function animate(){
	update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(animate);
}

function initImage(name){
	var image = ImageData[name];
	var texture = image.texture;
	var s = image.scale;
	var aspect = image.aspect;

	var noise = new THREE.TextureLoader().load('assets/images/noise.png');
	noise.wrapT = noise.wrapS = THREE.RepeatWrapping;

	var width = 50;

	geom = new THREE.PlaneGeometry(width, width*aspect, 256, 256);
	// var geom = new THREE.SphereBufferGeometry(1, 1, 256, 256);
	shapeMat = new THREE.ShaderMaterial({
		transparent: true,
		// wireframe: true,
		uniforms : {
			"time" : { type: "f", value : 0.0 },
			"texture" : { type : "t", value : texture},
			"noise" : { type : "t", value : noise },
			"speed" : { type : "f", value : .5},
			"scale" : { type : "v2", value : distScale},
			"mouse" : { type : "v2", value : mouse },
			"resolution" : { type : "v2", value : resolution },
			"magnitude" : { type : "f", value : .025 }
		},
		side : THREE.DoubleSide,
		vertexShader : document.getElementById('vertexShader').textContent,
		fragmentShader : document.getElementById('fragmentShader').textContent
	});

	shape = new THREE.Mesh(geom, shapeMat);
	shape.scale.set(s, s, s);
	// shape.position.set()
	scene.add(shape);
}