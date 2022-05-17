import "./style.css";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/** Base */

/** Debug */
const gui = new dat.GUI({
  width: 400,
});

/** Canvas */
const canvas = document.querySelector("canvas.webgl");

/** Scene */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x626666);

/** Loaders */
/** Texture loader */
// const textureLoader = new THREE.TextureLoader();

/** Draco loader */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

/** GLTF loader */
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/** Raycaster */
const raycaster = new THREE.Raycaster();

/** light */
const light1 = new THREE.PointLight(0xffffff, 1, 800);
light1.position.set(-2, -1, 0);
scene.add(light1);

gui.add(light1.position, "x").min(-100).max(100).step(0.25).name("light1 X");
gui.add(light1.position, "y").min(-100).max(100).step(0.25).name("light1 Y");
gui.add(light1.position, "z").min(-100).max(100).step(0.25).name("light1 Z");

const light2 = new THREE.PointLight(0xffffff, 1, 1000);
light2.position.set(3, 0, 1);
scene.add(light2);

gui.add(light2.position, "x").min(-150).max(100).step(0.25).name("light2 X");
gui.add(light2.position, "y").min(-150).max(100).step(0.25).name("light2 Y");
gui.add(light2.position, "z").min(-150).max(100).step(0.25).name("light2 Z");

/** White directional light at half intensity shining from the top. */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

/** helper */

// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper(light1, sphereSize);
// scene.add(pointLightHelper);

// const sphereSize2 = 1;
// const pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize2);
// scene.add(pointLightHelper2);

/** Model */
// let mixer = null;
// let mixer1 = null;
// let mixer2 = null;
// let mixer3 = null;
// let male = null;
// let dots;
let sideNumber = 10;

gltfLoader.load("boschbeton.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);
  const rightSide = model.children[1];
  const lefttSide = model.children[2];

  for (let i = 2; i < sideNumber; i++) {
    let cloneRightSide = rightSide.clone();
    let cloneLeftSide = lefttSide.clone();

    cloneRightSide.position.set(
      cloneRightSide.position.x,
      cloneRightSide.position.y,
      (cloneRightSide.position.z + i) * -1
    );

    cloneLeftSide.position.set(
      cloneLeftSide.position.x,
      cloneLeftSide.position.y,
      (cloneLeftSide.position.z + i) * -1
    );

    cloneRightSide.scale.set(0.5, 0.5, 0.5);
    cloneLeftSide.scale.set(0.5, 0.5, 0.5);

    scene.add(cloneRightSide, cloneLeftSide);
  }

  gui
    .add(model.rotation, "x")
    .min(-150)
    .max(100)
    .step(0.01)
    .name("model rotation X");
  gui
    .add(model.rotation, "y")
    .min(-150)
    .max(100)
    .step(0.01)
    .name("model rotation Y");
  gui
    .add(model.rotation, "z")
    .min(-150)
    .max(100)
    .step(0.01)
    .name("model rotation Z");

  scene.add(gltf.scene);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  /** Update sizes */
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  /** Update camera */
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  /**  Update renderer */
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
});

/** Camera */

/** Base camera */
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -10.25;
camera.position.y = 4;
camera.position.z = 9.25;

gui.add(camera.position, "x").min(-150).max(100).step(0.25).name("camera X");
gui.add(camera.position, "y").min(-150).max(100).step(0.25).name("camera Y");
gui.add(camera.position, "z").min(-150).max(100).step(0.25).name("camera Z");

scene.add(camera);

/** Controls */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/** Renderer */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.clearColor("0xffffff");
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/** Animate */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // if (mixer !== null) {
  //   mixer.update(deltaTime);
  // }

  // if (mixer1 !== null) {
  //   mixer1.update(deltaTime);
  // }

  // if (mixer2 !== null) {
  //   mixer2.update(deltaTime);
  // }

  // if (mixer3 !== null) {
  //   mixer3.update(deltaTime);
  // }

  /** Update controls */
  controls.update();

  /** Render */
  renderer.render(scene, camera);

  /** Call tick again on the next frame */
  window.requestAnimationFrame(tick);
};

tick();
