// STANDARD GLOBAL VARIABLE

var scene,camera,renderer;

var vertexShaderElement = document.getElementById("vertexshader");
var fragmentshaderElement = document.getElementById("fragmentshader");
var sphere;
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
	renderer.setClearColor( 0xf0f0f0 );
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
	// create the sphere's material
	shaderMaterial = new THREE.ShaderMaterial(
	{ 
		uniforms: uniforms,
		vertexShader:   vertexShaderElement.textContent,
		fragmentShader: fragmentshaderElement.textContent,
		wireframe:true
	
	});

	// set up the sphere vars
	

	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	sphere = new THREE.Mesh(
	   new THREE.PlaneGeometry(500,100,500,1),
	   shaderMaterial);
	
	sphere.rotation.x = 110* Math.PI / 180;
	scene.add(sphere);
	tick = 0;

}

function animate()
{
	tick +=0.01;
	requestAnimationFrame(animate);
	sphere.position.y =Math.sin(tick)*5;

	render();
}


function render()
{
	shaderMaterial.uniforms[ 'time' ].value = 0.0003*(Date.now()-start);
	renderer.render(scene,camera);
}

init();
animate();