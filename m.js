let scene, camera, renderer;
let hlight, directionalLight, light, light2, light3, light4, controls, car;
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js";

function init() {
  console.log("start");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  hlight = new THREE.AmbientLight(0x404040, 2);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  light = new THREE.PointLight(0xc4c4c4, 2);
  light.position.set(0, 300, 500);
  scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4, 2);
  light2.position.set(500, 100, 0);
  scene.add(light2);
  light3 = new THREE.PointLight(0xc4c4c4, 2);
  light3.position.set(0, 100, -500);
  scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4, 2);
  light4.position.set(-500, 300, 500);
  scene.add(light4);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   document.body.appendChild(renderer.domElement);
  $("#myObj")[0].appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer.domElement);

  let loader = new GLTFLoader();
  loader.load("./3D/earth.glb", function (gltf) {
    console.log("Start2");

    car = gltf.scene.children[0];
    car.scale.set(1.5, 1.5, 1.5);
    scene.add(gltf.scene);
    animate();
    console.log("done2");
  });
  console.log("done");
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();

// https://sbtron.github.io/makeglb/
