//NASTY NASTY CODE IT S BADDDDDD !!! 

// STANDARD GLOBAL VARIABLE

var scene,camera,renderer;

var vertexShaderElement = document.getElementById("vertexshader");
var fragmentshaderElement = document.getElementById("fragmentshader");
var plane;
var start = Date.now();
var uniforms;
var shaderMaterial;
function init()
{
	console.log("init called");
	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,10000);
	camera.position.z = 500;

	// RENDERER
	renderer = new THREE.WebGLRenderer();
	// E8FFFE
	renderer.setClearColor( 0xF2FEFF);
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	uniforms =
	{
		time: 
		{ // float initialized to 0
		    type: "f", 
		    value: 0.0 
		},
		waterTexture: {
            type: "t", 
            value: THREE.ImageUtils.loadTexture( 'js/gradient_map.jpg' )
        },
	}
	// create the plane's material
	shaderMaterial = new THREE.ShaderMaterial(
	{ 
		uniforms: uniforms,
		vertexShader:   vertexShaderElement.textContent,
		fragmentShader: fragmentshaderElement.textContent,
		wireframe:true
	
	});

	// set up the plane vars
	

	// create a new mesh with plane geometry -
	// we will cover the planeMaterial next!
	plane = new THREE.Mesh(
	   new THREE.PlaneGeometry(500,100,500,1),
	   shaderMaterial);
	
	plane.rotation.x = 110* Math.PI / 180;
	scene.add(plane);
	tick = 0;

}

function animate()
{
	tick +=0.01;
	requestAnimationFrame(animate);
	plane.position.y =Math.sin(tick)*5;

	render();
}


function render()
{
	shaderMaterial.uniforms[ 'time' ].value = 0.0003*(Date.now()-start);
	renderer.render(scene,camera);
}

init();
animate();