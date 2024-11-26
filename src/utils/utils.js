import * as THREE from 'three';

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

async function createTexturedPlane(texture, frustumSize, aspectRatio) {
    try {

        const geometry = new THREE.PlaneGeometry(frustumSize * aspectRatio, frustumSize)
        const material = new THREE.MeshBasicMaterial({ map: texture, depthTest: false })

        const plane = new THREE.Mesh(geometry, material)
        plane.name = 'cameraPlane'
        plane.position.z = -4; // Push it behind everything else
        plane.renderOrder = -1;

        return plane

    } catch (error) {
        console.error('Error loading texture:', error);
    }
}

function updatePlaneGeometry(camera, frustumSize, aspectRatio) {

    const plane = camera.children.find(child => 'cameraPlane' === child.name)

    if (plane) {
        const effectiveFrustumSize = frustumSize / camera.zoom
        plane.geometry.dispose()
        plane.geometry = new THREE.PlaneGeometry(effectiveFrustumSize * aspectRatio, effectiveFrustumSize)
    }
}

export { updatePlaneGeometry, loadTexture, createTexturedPlane }
