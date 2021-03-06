import "./style.css";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/** Base */
let sideNumber = 10;
let widthOfSide = 2;
let secondArea = false;
let thirdArea = false;

let cloneRightSide = new THREE.Object3D();
let cloneLeftSide = new THREE.Object3D();

const rightGroup = new THREE.Group();
const leftGroup = new THREE.Group();
const midleGroup = new THREE.Group();

let rightSecond = new THREE.Object3D();
let leftSecond = new THREE.Object3D();
let leftSecondAreaGroup = new THREE.Group();
let rightSecondAreaGroup = new THREE.Group();
let secondMidleGroup = new THREE.Group();

let rightThrid = new THREE.Object3D();
let leftThird = new THREE.Object3D();
let leftThridAreaGroup = new THREE.Group();
let rightThridAreaGroup = new THREE.Group();
let ThridMidleGroup = new THREE.Group();

let rightFour = new THREE.Object3D();
let leftFour = new THREE.Object3D();
let leftFourAreaGroup = new THREE.Group();
let rightFourAreaGroup = new THREE.Group();
let FourMidleGroup = new THREE.Group();

let thirdAreaRight = new THREE.Group();
let thridAreaLeft = new THREE.Group();

let rightSide;
let lefttSide;
let rearWallRight;
let rearWallLeft;
let rearWallMidel;

let lastElement;
let pos;
let posLeft;
let rwr;
let rwmP;
let rwmS;

/** Debug */
const gui = new dat.GUI({
  width: 200,
  closed: true,
});

/** Query Selector */
const canvas = document.querySelector("canvas.webgl");
const inputNumberOfSide = document.querySelector(".side-numbers");
const inputSideWidth = document.querySelector(".side-width");
const btnRearWallOn = document.querySelector("#rear-wall-on");
const btnRearWallOff = document.querySelector("#rear-wall-off");
const two = document.querySelector("#two");
const third = document.querySelector("#three");
const four = document.querySelector("#four");

/** fun */
const rightLeftClone = (right, left, width, far, widthOfSide) => {
  right.position.set(
    rightGroup.position.x + width + far,
    rightGroup.position.y,
    rightGroup.position.z
  );

  left.position.set(
    rightGroup.position.x + width + widthOfSide,
    rightGroup.position.y,
    rightGroup.position.z
  );
};

const midleClone = () => {
  secondMidleGroup.children[0].position.x =
    rightGroup.position.x + widthOfSide + 9;

  secondMidleGroup.children[1].position.x =
    secondMidleGroup.children[0].position.x - widthOfSide - 5;

  secondMidleGroup.children[2].position.x =
    secondMidleGroup.children[0].position.x - widthOfSide / 2 - 3;

  secondMidleGroup.children[2].scale.x = rearWallMidel.scale.x;
};
/** endfun */

/** addEventListener */
/** change the number of the sids */
inputNumberOfSide.addEventListener("change", (e) => {
  sideNumber = e.target.value;
  sideLoop(sideNumber);
});

/** change the number of the width */
inputSideWidth.addEventListener("change", (e) => {
  widthOfSide = parseInt(e.target.value);
  if (isNaN(widthOfSide && widthOfSide === null && widthOfSide > 0)) {
    return;
  } else {
    rightGroup.position.x = widthOfSide;

    if (midleGroup.visible === true) {
      rearWallRight.position.x = rightGroup.position.x;
      rearWallMidel.position.x = rearWallRight.position.x - 3 - widthOfSide / 2;
      rearWallMidel.scale.x = 1 + widthOfSide / 4;
      midleClone();
    }
    // rightLeftClone(rightSecond, leftSecond, 9, 1, widthOfSide);
    // rightLeftClone(thirdAreaRight, thridAreaLeft, 18, 3, widthOfSide);
  }
});

/** hide the midle rear wall */
btnRearWallOff.addEventListener("click", () => {
  midleGroup.visible = false;
  secondMidleGroup.visible = false;
});

/** show the midle rear wall */
btnRearWallOn.addEventListener("click", () => {
  if (widthOfSide > 0) {
    rearWallRight.position.x = rightGroup.position.x;
    rearWallMidel.position.x = rearWallRight.position.x - 3 - widthOfSide / 2;
    rearWallMidel.scale.x = 1 + widthOfSide / 4;
  }
  midleGroup.position.z = pos.z - 2;
  midleGroup.visible = true;

  if (secondArea === true) {
    secondMidleGroup.visible = true;
  }
});

/** add second clon */

two.addEventListener("click", () => {
  secondArea = true;
  // rightSecond = leftGroup.clone();
  // leftSecond = rightGroup.clone();
  // secondMidleGroup = midleGroup.clone();
  // console.log("secondMidleGroup:", secondMidleGroup);
  // secondMidleGroup.visible = false;
  // rightLeftClone(rightSecond, leftSecond, 9, 1, widthOfSide);
  // midleClone();

  // if (midleGroup.visible === true) {
  //   secondMidleGroup.visible = true;
  // }

  // scene.add(rightSecond, leftSecond, secondMidleGroup);
});
/** end add second clon */

/**  add third clon */
third.addEventListener("click", () => {
  thirdAreaRight = leftGroup.clone();
  thridAreaLeft = rightGroup.clone();

  rightLeftClone(thirdAreaRight, thridAreaLeft, 18, 3, widthOfSide);
  scene.add(thirdAreaRight, thridAreaLeft);
});
/** end add third clon */

/** end EventListener */

/** function */
const sideLoop = (num) => {
  lastElement = rightGroup.children.length - 1;

  const last = rightGroup.children.length;
  let x = num - last;

  if (last > num) {
    let removeRightEle = rightGroup.children.length - num;

    for (let i = 0; i < removeRightEle; i++) {
      let leR = rightGroup.children.length - 1;
      let leL = leftGroup.children.length - 1;

      rightGroup.remove(rightGroup.children[leR]);
      scene.add(rightGroup);

      leftGroup.remove(leftGroup.children[leL]);

      if (midleGroup.visible === true) {
        lastElement = rightGroup.children.length - 1;
        pos = rightGroup.children[lastElement].position;
        midleGroup.position.z = pos.z;
      }

      scene.add(leftGroup);
    }
  } else {
    for (let i = 0; i <= x; i++) {
      lastElement = rightGroup.children.length - 1;

      pos = rightGroup.children[lastElement].position;
      posLeft = leftGroup.children[lastElement].position;

      cloneRightSide = rightSide.clone();
      cloneLeftSide = lefttSide.clone();

      if (midleGroup.visible === true) {
        midleGroup.position.z = pos.z - 2;
      }

      cloneRightSide.position.set(pos.x, pos.y, pos.z + 1 * -2);
      rightGroup.add(cloneRightSide);

      cloneLeftSide.position.set(posLeft.x, posLeft.y, posLeft.z + 1 * -2);
      leftGroup.add(cloneLeftSide);

      leftSecond = lefttSide.clone();
      leftSecond.position.set(
        cloneRightSide.position.x + 4,
        cloneRightSide.position.y - 2,
        cloneRightSide.position.z
      );

      leftSecondAreaGroup.add(leftSecond);

      rightSecond = rightSide.clone();
      rightSecond.position.set(
        leftSecond.position.x + 4 + widthOfSide,
        leftSecond.position.y,
        leftSecond.position.z
      );

      rightSecondAreaGroup.add(rightSecond);

      leftThird = lefttSide.clone();
      leftThird.position.set(
        rightSecond.position.x + 4,
        rightSecond.position.y,
        rightSecond.position.z
      );
      leftThridAreaGroup.add(leftThird);

      rightThrid = rightSide.clone();
      rightThrid.position.set(
        leftThird.position.x + 4 + widthOfSide,
        leftThird.position.y,
        leftThird.position.z
      );

      rightThridAreaGroup.add(rightThrid);

      leftFour = lefttSide.clone();
      leftFour.position.set(
        rightThrid.position.x + 4,
        rightThrid.position.y,
        rightThrid.position.z
      );
      leftFourAreaGroup.add(leftFour);

      rightThrid = rightSide.clone();
      rightThrid.position.set(
        leftFour.position.x + 4 + widthOfSide,
        leftFour.position.y,
        leftFour.position.z
      );

      rightThridAreaGroup.add(rightThrid);
    }
  }

  scene.add(
    rightGroup,
    leftGroup,
    leftSecondAreaGroup,
    rightSecondAreaGroup,
    leftThridAreaGroup,
    rightThridAreaGroup,
    rightThridAreaGroup,
    leftFourAreaGroup
  );
};

/** Scene */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9eaf9);

/** Material */
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1,
  roughness: 1,
});
material.DoubleSide = true;

/** Loaders */

/** Draco loader */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

/** GLTF loader */
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/** light */
const light1 = new THREE.PointLight(0xffffff, 1, 800);
light1.position.set(-9.25, 7, 0);
scene.add(light1);

gui.add(light1.position, "x").min(-100).max(100).step(0.25).name("light1 X");
gui.add(light1.position, "y").min(-100).max(100).step(0.25).name("light1 Y");
gui.add(light1.position, "z").min(-100).max(100).step(0.25).name("light1 Z");

const light2 = new THREE.PointLight(0xffffff, 1, 1000);
light2.position.set(27.25, 0, 1);
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

/** gltf Loader */
gltfLoader.load("boschbetonV101.glb", (gltf) => {
  const model = gltf.scene;

  rightSide = model.children[1];
  lefttSide = model.children[2];

  rearWallMidel = model.children[4];
  rearWallLeft = model.children[5];

  rearWallRight = model.children[6];
  midleGroup.add(rearWallRight, rearWallLeft, rearWallMidel);
  midleGroup.visible = false;

  rwr = rearWallRight.position.x;
  rwmP = rearWallMidel.position.x;
  rwmS = rearWallMidel.scale.x;
  rightGroup.add(rightSide);

  rightGroup.traverse((child) => {
    child.material = material;
  });

  leftGroup.add(lefttSide);

  model.position.set(2, -2, 0);
  rightGroup.position.set(2, -2, 0);
  leftGroup.position.set(2, -2, 0);
  midleGroup.position.y = model.position.y;
  midleGroup.position.x = rightGroup.position.x;

  leftGroup.traverse((child) => {
    child.material = material;
  });

  scene.add(gltf.scene, rightGroup, leftGroup, midleGroup);
  sideLoop(sideNumber);
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
camera.position.x = -4;
camera.position.y = 5;
camera.position.z = 14;

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
