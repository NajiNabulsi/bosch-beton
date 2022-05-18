import "./style.css";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/** Base */
let sideNumber = 2;
let cloneRightSide = new THREE.Object3D();
let cloneLeftSide;
const rightGroup = new THREE.Group();
const leftGroup = new THREE.Group();
let rightSide;
let lefttSide;

/** Debug */
const gui = new dat.GUI({
  width: 200,
  closed: true,
});

/** Query Selector */
const canvas = document.querySelector("canvas.webgl");
const inputNumberOfSide = document.querySelector(".side-numbers");
const inputSideWidth = document.querySelector(".side-width");

/** addEventListener */
inputNumberOfSide.addEventListener("change", (e) => {
  sideNumber = e.target.value;
  // sideNumber = parseInt(inputNumberOfSide.value);
  sideLoop(sideNumber);
});

inputSideWidth.addEventListener("change", (e) => {
  const widthOfSide = e.target.value;
  rightGroup.position.x = parseInt(widthOfSide);
});
/** end EventListener */

/** function */
const sideLoop = (num) => {
  const lastElement = rightGroup.children.length - 1;
  const last = rightGroup.children.length;
  let x = num - last;

  if (last > num) {
    let removeEle = rightGroup.children.length - num;
    console.log("last: ", last);
    for (let i = 0; i < removeEle; i++) {
      let le = rightGroup.children.length - 1;
      let elId = rightGroup.children[le].uuid;

      console.log("cloneRightSide: ", cloneRightSide);
      console.log("rightGroup: ", rightGroup.children[le]);
      console.log("removeEle: ", removeEle);

      rightGroup.remove(rightGroup.children[le]);
      scene.add(rightGroup);

      console.log("last loop: ", last);
    }
  } else {
    for (let i = 0; i <= x; i++) {
      let pos = rightGroup.children[lastElement].position;
      let posLeft = leftGroup.children[lastElement].position;

      cloneRightSide = rightSide.clone();
      cloneLeftSide = lefttSide.clone();

      cloneRightSide.position.set(pos.x, pos.y, pos.z + 2 * -2);
      rightGroup.add(cloneRightSide);
      rightGroup.scale.set(0.5, 0.5, 0.5);

      cloneLeftSide.position.set(posLeft.x, posLeft.y, posLeft.z + 2 * -2);

      leftGroup.add(cloneLeftSide);
      leftGroup.scale.set(0.5, 0.5, 0.5);
    }
  }
  scene.add(rightGroup, leftGroup);
};

/** Scene */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9eaf9);

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
// const raycaster = new THREE.Raycaster();

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

/** soft white light */
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

/** Loader */
gltfLoader.load("boschbeton.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);
  rightSide = model.children[1];
  lefttSide = model.children[2];

  rightGroup.add(rightSide);
  leftGroup.add(lefttSide);
  rightGroup.scale.set(0.5, 0.5, 0.5);
  leftGroup.scale.set(0.5, 0.5, 0.5);
  // cloneLeftSide = lefttSide.clone();

  sideLoop(sideNumber);

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

  scene.add(gltf.scene, rightGroup, leftGroup);
}); /** end loader */

/** Sizes */
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

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/** Animate */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  /** Update controls */
  controls.update();

  /** Render */
  renderer.render(scene, camera);

  /** Call tick again on the next frame */
  window.requestAnimationFrame(tick);
};

tick();
