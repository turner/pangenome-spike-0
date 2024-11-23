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

async function addBackgroundTexture(scene, frustumSize, aspectRatio) {
    try {

        const texture = await loadTexture('/texture/noisey-thread-dense-multi-color.png')

        // Create plane geometry that matches frustum size
        const geometry = new THREE.PlaneGeometry(frustumSize * aspectRatio, frustumSize)

        const material = new THREE.MeshBasicMaterial({ map: texture, depthTest: false })

        const plane = new THREE.Mesh(geometry, material)
        plane.position.z = -4; // Push it behind everything else
        plane.renderOrder = -1;

        return plane

    } catch (error) {
        console.error('Error loading texture:', error);
    }
}

export { loadTexture, addBackgroundTexture }
