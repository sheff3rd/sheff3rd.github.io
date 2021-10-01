var THREE = require('three');

var scene = require('./src/scene');
var camera = require('./src/cameras/orthographic');

var renderer;
var geometry, material, mesh;
var uniforms;

var aspect = window.innerWidth / window.innerHeight;
var zoom = 4.0;
var offset = new THREE.Vector2( -2.0 * aspect, -2.0);

function init() {
  setup();

  uniforms = {
    res: {
      type: 'vec2',
      value: new THREE.Vector2( window.innerWidth, window.innerHeight )
    },
    aspect: {
      type: 'float',
      value: aspect
    },
    zoom: {
      type: 'float',
      value: zoom
    },
    offset: {
      type:'vec2',
      value: offset
    },
    pset1: {
      type: 'vec3',
      value: new THREE.Vector3( 1.01, 0.01, 0.01 )
    },

    pset2: {
      type: 'vec3',
      value: new THREE.Vector3( 0.01, 0.01, 0.01 )}
  };

  geometry = new THREE.PlaneBufferGeometry( 2, 2 );

  material = new THREE.ShaderMaterial({
    fragmentShader: shader(),
    uniforms
  });

  mesh = new THREE.Mesh( geometry, material );

  scene.add(mesh);
  animate();
}

/* Mandelbrot shader */
function shader() {
  return `
    precision highp float;
    uniform vec2 res;
    uniform float aspect;
    uniform float zoom;
    uniform vec2 offset;

    uniform vec3 pset1;
    uniform vec3 pset2;

    vec2 cm (vec2 a, vec2 b){
      return vec2(a.x*b.x - a.y*b.y, a.x*b.y + b.x*a.y);
    }

    vec2 conj (vec2 a){
      return vec2(a.x, -a.y);
    }

    float mandelbrot(vec2 c){
      float alpha = 1.0;
      vec2 z = vec2(0.0 , 0.0);
      vec2 z_0;
      vec2 z_1;
      vec2 z_2;

      for(int i=0; i < 1000; i++) {
        z_2 = z_1;
        z_1 = z_0;
        z_0 = z;

        float x_0_sq = z_0.x*z_0.x;
        float y_0_sq = z_0.y*z_0.y;
        vec2 z_0_sq = vec2(x_0_sq - y_0_sq, 2.0*z_0.x*z_0.y);
        float x_1_sq = z_1.x*z_1.x;
        float y_1_sq = z_1.y*z_1.y;
        vec2 z_1_sq = vec2(x_1_sq - y_1_sq, 2.0*z_1.x*z_1.y);

        z = pset1.x*z_0_sq + c + pset1.y*z_1_sq
          + pset1.z*cm(z_1_sq, z_2) + pset2.x*cm(z_1_sq, z_0)
          + pset2.y*cm(z_2, z_0) + pset2.z*cm(z_1, z_2);

        float z_0_mag = x_0_sq + y_0_sq;
        float z_1_mag = x_1_sq + y_1_sq;

        if(z_0_mag > 12.0){
          float frac = (12.0 - z_1_mag) / (z_0_mag - z_1_mag);
          alpha = (float(i) - 1.0 + frac)/200.0; // should be same as max iterations
          break;
        }
      }
      return alpha;
    }

    void main(){
      vec2 uv = zoom * vec2(aspect, 1.0) * gl_FragCoord.xy / res + offset;
      float s = 1.0 - mandelbrot(uv);

      vec3 coord = vec3(s, s, s);
      gl_FragColor = vec4(pow(coord, vec3(5.38, 6.15, 3.85)), 1.0);
    }
  `
}

function setup() {
  renderer = new THREE.WebGLRenderer({
    antialias: false,
    precision: 'highp'
  });

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );
}

function scroll(event) {
  let zoom_0 = zoom;

  if ("wheelDeltaY" in event) {
    zoom *= 1 - event.wheelDeltaY * 0.0003;
  } else{
    zoom *= 1 + event.deltaY * 0.01;
  }

  let space = zoom - zoom_0;

  let mouseX = event.clientX / window.innerWidth;
  let mouseY = 1 - event.clientY / window.innerHeight;

  offset = offset.add(new THREE.Vector2( -mouseX * space *aspect, -mouseY * space ));

  uniforms['zoom']['value'] = zoom;
  uniforms['offset']['value'] = offset;
  animate();
}

function animate() {
  // requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

init();

/* LISTENERS */
document.addEventListener('wheel', scroll);
