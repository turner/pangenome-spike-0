import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls';
import { addBackgroundTexture } from './utils/utils.js'

let scene
let camera
let renderer
let controls
let box
document.addEventListener("DOMContentLoaded", async (event) => {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x222222)

    // Add grid for context. Rotate to lie in x-y plane
    const gridHelper = new THREE.GridHelper(20, 20)
    gridHelper.rotation.x = Math.PI / 2
    scene.add(gridHelper)

    // Box
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

    // Light attached to camera
    const light = new THREE.PointLight(0xffffff, 2.5, 0, 0);
    camera.add(light)

    const backgroundPlane = await addBackgroundTexture(scene, frustumSize, aspectRatio)
    // scene.add(backgroundPlane)
    camera.add(backgroundPlane)

    // Pan/Zoom control
    controls = new MapControls(camera, renderer.domElement);
    controls.enableRotate = false;   // Disable rotation for 2D visualization
    controls.screenSpacePanning = true; // Enable panning in screen space (x, y)
    controls.zoomSpeed = 1.2
    controls.panSpeed = 1;

    controls.addEventListener('change', () => {
        const mesh = camera.children.find((child) => child.isMesh)
        if (mesh) {
            mesh.geometry.dispose()
            const aspect = window.innerWidth / window.innerHeight
            const effectiveFrustumSize = frustumSize / camera.zoom
            mesh.geometry = new THREE.PlaneGeometry(effectiveFrustumSize * aspect, effectiveFrustumSize);
        }
    });

    window.addEventListener('resize', () => {

        const aspect = window.innerWidth / window.innerHeight;
        camera.left = (-frustumSize * aspect) / 2;
        camera.right = (frustumSize * aspect) / 2;
        camera.top = frustumSize / 2;
        camera.bottom = -frustumSize / 2;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        const mesh = camera.children.find((child) => child.isMesh)
        if (mesh) {
            mesh.geometry.dispose()
            const effectiveFrustumSize = frustumSize / camera.zoom
            mesh.geometry = new THREE.PlaneGeometry(effectiveFrustumSize * aspect, effectiveFrustumSize);
        }
    })

    animate();

})

function animate (){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

