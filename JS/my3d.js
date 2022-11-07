let server = true;
//
let scene, camera, renderer;
let hlight, directionalLight, light, light2, light3, light4, controls, Planet;
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js";

export function init(nameFile) {
  console.log("start");

  // Canvas -----------
  scene = new THREE.Scene();
  // CMT scene.background = new THREE.Color(0x040718);

  // Camera -----------
  camera = new THREE.PerspectiveCamera(
    40,
    (window.innerWidth - (20 * window.innerWidth) / 100) /
      (window.innerHeight - (50 * window.innerHeight) / 100),
    1,
    5000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  // Ligntning -----------

  hlight = new THREE.AmbientLight(0x404040, 2);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  light = new THREE.PointLight(0xc4c4c4, 2);
  light.position.set(0, 300, 500);
  scene.add(light);
  /* 
   CMT light2 = new THREE.PointLight(0xc4c4c4, 2);
   CMT light2.position.set(500, 100, 0);
   CMT scene.add(light2);
  */
  light3 = new THREE.PointLight(0xc4c4c4, 2);
  light3.position.set(0, 100, -500);
  scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4, 2);
  light4.position.set(-500, 300, 500);
  scene.add(light4);

  // Canvas -----------
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(
    window.innerWidth - (20 * window.innerWidth) / 100,
    window.innerHeight - (50 * window.innerHeight) / 100
  );

  $(".planetsGrp :not([id = myPanet3d])").hide();
  $("#myPanet3d").remove();
  if (server)
    changeMp3(
      `https://github.com/ayoub198fillali/Planets/blob/master/MP3/${nameFile}.mp3?raw=true`
    );
  else changeMp3(`../MP3/${nameFile}.mp3`);

  renderer.domElement.id = "myPanet3d";
  $(".planetsGrp")[0].appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  let loader = new GLTFLoader();
  let cc;
  if (server)
    cc = `https://raw.githubusercontent.com/ayoub198fillali/Planets/master/3D/${nameFile}.glb`;
  else cc = `../3D/${nameFile}.glb`;
  loader.load(cc, function (gltf) {
    console.log("Start2");

    Planet = gltf.scene.children[0];
    Planet.scale.set(2, 2, 2);
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

export function changeMp3(sourceUrl) {
  let audio = $("#myControlerSound");
  $("#myControlerSound source").attr("src", sourceUrl);
  /****************/
  audio[0].pause();
  audio[0].load(); //suspends and restores all audio element

  //audio[0].play(); changed based on Sprachprofi's comment below
  // audio[0].oncanplaythrough = audio[0].play();
  /****************/
}
// $(window).on("load", function () {
//   changeMp3("../MP3/intro.mp3");
// });
