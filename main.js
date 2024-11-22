import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls';

let scene
let camera
let renderer
let controls
let box
document.addEventListener("DOMContentLoaded", (event) => {

    // scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x222222)

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    //
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
    box = new THREE.Mesh(geometry, material)
    scene.add(box)

    // 2D Camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 5; // Controls the visible area size
    const [ left, right, top, bottom ] =
        [
            (-frustumSize * aspectRatio) / 2,
            (frustumSize * aspectRatio) / 2,
            frustumSize / 2,
            -frustumSize / 2
        ];
    const [ near, far ] = [ 0.1, 1000 ]
    camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
    camera.position.set(0, 0, 5)
    scene.add(camera)

    const light = new THREE.PointLight(0xffffff, 2.5, 0, 0);
    camera.add(light);

    // 2D Control
    controls = new MapControls(camera, renderer.domElement);
    controls.enableRotate = false;   // Disable rotation for 2D visualization
    controls.screenSpacePanning = true; // Enable panning in screen space (x, y)
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 1;

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

