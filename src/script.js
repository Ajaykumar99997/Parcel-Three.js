import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// GLTF loader
const gltfLoader = new GLTFLoader();

/**
 * Texures
 */
let url2 = new URL('../static/baked2.jpg', import.meta.url);
url2 = '' + url2;
const bakedTexture = textureLoader.load(url2);
bakedTexture.flipY = false;

/**
 * Material
 */
// Baked Material

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

// Ground
const geometry = new THREE.BoxBufferGeometry(10, 0.5, 10);
const material = new THREE.MeshBasicMaterial({ color: '#9a6a5c' });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.3, -0.25, 0);
scene.add(mesh);

// Model
let url = new URL('../static/uazz.glb', import.meta.url);
url = '' + url;
gltfLoader.load(url, (gltf) => {
  const bakedMesh = gltf.scene.children.find((child) => child.name === 'baked');
  bakedMesh.material = bakedMaterial;
  scene.add(gltf.scene);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 10;
camera.position.y = 4;
camera.position.z = 6;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#335c33');

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
