import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MapControls } from 'three/examples/jsm/controls/MapControls';


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

    // const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

// Camera: OrthographicCamera
    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 5; // Controls the visible area size
    camera = new THREE.OrthographicCamera(
        (-frustumSize * aspectRatio) / 2, // left
        (frustumSize * aspectRatio) / 2,  // right
        frustumSize / 2,                  // top
        -frustumSize / 2,                 // bottom
        0.1,                              // near
        1000                              // far
    );
    camera.position.set(0, 0, 5);
    scene.add(camera)

    const light = new THREE.PointLight(0xffffff, 2.5, 0, 0);
    camera.add(light);

    /*
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableRotate = false

    controls.enablePan = true
    controls.panSpeed = 1

    controls.enableZoom = true
    controls.zoomSpeed = 1.2
    */

    controls = new MapControls(camera, renderer.domElement);
    controls.enableRotate = false;   // Disable rotation for 2D visualization
    controls.screenSpacePanning = true; // Enable panning in screen space (x, y)
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.5;

    window.addEventListener('resize', () => {
        const aspect = window.innerWidth / window.innerHeight;

        // Update camera frustum to match new aspect ratio
        camera.left = (-frustumSize * aspect) / 2;
        camera.right = (frustumSize * aspect) / 2;
        camera.top = frustumSize / 2;
        camera.bottom = -frustumSize / 2;
        camera.updateProjectionMatrix();

        // Update renderer size
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();

})

function animate (){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

