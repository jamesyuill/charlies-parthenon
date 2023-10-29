import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 14, 60);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

//LIGHTS
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);
light.position.set(0, 10, 0);

const light2 = new THREE.DirectionalLight(0xffffff, 2);
scene.add(light2);
light2.position.set(-4, 3, 0);
light2.rotation.set(0, 3, 0);

//CAMERA CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 7;
controls.dynamicDampingFactor = 0.1;
controls.update();

// GEOMETRY

const loader = new GLTFLoader();

loader.load(
  '/Charlie-Parthanon.glb',
  function (gltf) {
    const parthenon = gltf.scene;
    parthenon.rotation.y = -1;
    parthenon.position.x = -2;
    scene.add(parthenon);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// FLOOR

const floorGeo = new THREE.PlaneGeometry(200, 200, 32);
const floorMat = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  color: 0x818181,
});
const floor = new THREE.Mesh(floorGeo, floorMat);
scene.add(floor);
floor.rotation.set(Math.PI / 2, 0, 0);

//ANIMATE
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}
animate();

//EVENT HANDLER

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
