import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene
let camera
let renderer
let controls
let torusKnot
document.addEventListener("DOMContentLoaded", (event) => {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera = new THREE.PerspectiveCamera(
        75, // FOV
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.set(0, 0, 5);
    scene.add(camera)

    const light = new THREE.PointLight(0xffffff, 2.5, 0, 0);
    camera.add(light);

    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    animate();

})

function animate (){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

