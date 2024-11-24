import * as THREE from 'three';
import texturePath from '../assets/noisey-thread-dense-multi-color.png';

async function loadTexture(url) {

    const loader = new THREE.TextureLoader()

    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (texture) => resolve(texture),
            undefined,
            (err) => reject(err)
        );
    });
}

async function createCameraBackgroundPlane(frustumSize, aspectRatio) {
    try {

        // Plane geometry - match frustum size
        const geometry = new THREE.PlaneGeometry(frustumSize * aspectRatio, frustumSize)

        // Textured material
        const texture = await loadTexture(texturePath)
        const material = new THREE.MeshBasicMaterial({ map: texture, depthTest: false })

        const plane = new THREE.Mesh(geometry, material)
        plane.position.z = -4; // Push plane behind everything else
        plane.renderOrder = -1;

        return plane

    } catch (error) {
        console.error('Error creating textured camera background:', error);
    }
}

function updatePlaneGeometry(plane, camera, frustumSize) {
    if (plane) {
        const aspect = window.innerWidth / window.innerHeight
        const effectiveFrustumSize = frustumSize / camera.zoom
        plane.geometry.dispose()
        plane.geometry = new THREE.PlaneGeometry(effectiveFrustumSize * aspect, effectiveFrustumSize);
    }
}
export { updatePlaneGeometry, loadTexture, createCameraBackgroundPlane }
