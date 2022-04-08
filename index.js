var THREE = require('three');

/* NOTE: imports block */
var renderer  = require('./src/renderer');
var scene     = require('./src/scene');
var camera    = require('./src/camera');
var light     = require('./src/light');
var raycaster = require('./src/raycaster')
var pointer   = require('./src/pointer');

/* NOTE: import loaders */
var GLTFLoader    = require('./src/loaders/gltf');
var textureLoader = require('./src/loaders/texture')

/* NOTE: load model */
var model;
GLTFLoader.load(
  './assets/models/heart/scene.gltf',
  function ( gltf ) {
    model = gltf.scene;
    gltf.scene.scale.set( 20, 20, 20)    /* NOTE: scene scale */
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

let INTERSECTED;


init();
animate();













/* NOTE: FUNCTIONS */

function init() {
  var backgroundTexture = textureLoader.load( 'assets/textures/romantic.jpg' );

  camera.position.set( 0, 200, 250 );
  light.position.set( -1, 102, 254 );

  scene.background = backgroundTexture;
  scene.add( light );

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  document.addEventListener( 'mousemove', onPointerMove );
}

/* NOTE: animate model rotation */
let direction = 1;
function animate() {
  requestAnimationFrame( animate );


  render();
}

/* NOTE: cast rays on pointer move */
function onPointerMove( event ) {
  pointer.x =   ( event.clientX / window.innerWidth )  * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function render() {
  if ( model ) model.rotation.y += 0.01 * direction;


  raycaster.setFromCamera( pointer, camera );

  const intersects = raycaster.intersectObjects( scene.children, true );

  if ( intersects.length > 0 ) {
    console.log("intersects something");

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0xff0000 );

      }

    } else {

      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

      INTERSECTED = null;

    }

  renderer.render( scene, camera );
}


