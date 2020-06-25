var THREE = require('three');

var renderer = require('./src/renderer');
var scene    = require('./src/scene');
var camera   = require('./src/camera');
var light    = require('./src/light');

var GLTFLoader    = require('./src/loaders/gltf');
var textureLoader = require('./src/loaders/texture')

/* append renderer into DOM */
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/* place background */
var spaceTexture = textureLoader.load( 'assets/textures/forest.jpg' );
scene.background = spaceTexture;

/* setup camera */
camera.position.set( 0, 100, 250 );

/* setup light */
light.position.set(-1, 102, 254);
scene.add( light );

/* load resources */
var model;
GLTFLoader.load(
  'assets/models/matilda/scene.gltf',
  function ( gltf ) {
    model = gltf.scene;
    scene.add( model );

    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;
  },
  function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  },
  function ( error ) {

    console.log( 'An error happened' );

  }
);

var brickTexture = textureLoader.load( 'assets/textures/floor.jpg' );
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set( 5, 5 );


/* place floor */
var floorGeometry = require('./src/geometry/floor');
var material = new THREE.MeshMatcapMaterial({ map: brickTexture });
const floor = new THREE.Mesh( floorGeometry, material );
scene.add( floor );


let direction = 1;
function animate() {
  requestAnimationFrame( animate );

  if ( model ) model.rotation.y += 0.01 * direction;

  renderer.render( scene, camera );
}
animate();
