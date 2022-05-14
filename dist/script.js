import * as THREE from 'http://unpkg.com/three@0.127.0/build/three.module.js'

// Loading
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/rocky2.png')
const terrainTexture = textureLoader.load('/mountain.jpg')
const terrainHeight = textureLoader.load('/displacement.png')
const terrainAlpha = textureLoader.load('/alphamap.png')
const sunTexture = textureLoader.load('/sun-texture.jpeg')
const htmlTexture = textureLoader.load('/htmlTextTexture.png')
const cssTexture = textureLoader.load('/cssTexture.png')
const jsTexture = textureLoader.load('/jsTexture.png')
const threejsTexture = textureLoader.load('/threejsTexture.png')


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const scene2 = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(4,32, 32) // title sphere
const terrainObj = new THREE.PlaneBufferGeometry(6,6,64,64) // terrain

// Objects : Solar System Section (My Skills)//
const sunObj = new THREE.SphereBufferGeometry(3,32,32) // sun
const planetConceptObj = new THREE.SphereBufferGeometry(1.5, 32, 32) // planet idea
const planetConceptObj2 = new THREE.SphereBufferGeometry(1, 32, 32) // planet idea
const planetConceptObj3 = new THREE.SphereBufferGeometry(0.8, 32, 32) // planet idea
const moonConceptObj = new THREE.SphereBufferGeometry(0.3, 32, 32) // moon idea


// Materials
    //title sphere
const material = new THREE.MeshStandardMaterial()
material.normalMap = normalTexture;
material.metalness = 0.8;
material.roughness = 2;
material.color = new THREE.Color(0x00ffff)
    //terrain material
const terrainMat = new THREE.MeshStandardMaterial({
    color: '#00ffff',
    map: terrainTexture,
    displacementMap: terrainHeight,
    alphaMap: terrainAlpha,
    transparent: true,
    displacementScale: .6
})
const terrainMatRed = new THREE.MeshStandardMaterial({
    color: '#f00000',
    map: terrainTexture,
    displacementMap: terrainHeight,
    alphaMap: terrainAlpha,
    transparent: true,
    displacementScale: 1.2
})

const sunMat = new THREE.MeshStandardMaterial({
    color: "black",
    roughness:0.8,
    metalness:2,
    map: sunTexture
})

const htmlMat = new THREE.MeshStandardMaterial({
    color: "#00000",
    map: htmlTexture,
    transparent: true,
    opacity: 0.8,
    metalness: 0.1,
    roughness: 0
})
const cssMat = new THREE.MeshStandardMaterial({
    color: "#00000",
    map: cssTexture,
    transparent: true,
    opacity: 0.8,
    metalness: 0.1,
    roughness: 0
})
const jsMat = new THREE.MeshStandardMaterial({
    color: "#00000",
    map: jsTexture,
    transparent: true,
    opacity: 0.8,
    metalness: 0.1,
    roughness: 0
})
const threejsMat = new THREE.MeshStandardMaterial({
    color: "#00000",
    map: threejsTexture,
    transparent: true,
    opacity: 0.8,
    metalness: 0.1,
    roughness: 0
})


// Mesh

const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const terrainMesh = new THREE.Mesh(terrainObj, terrainMat)
scene.add(terrainMesh)
terrainMesh.position.x = 1
terrainMesh.rotation.x = 5.2

const terrainMesh2 = new THREE.Mesh(terrainObj, terrainMatRed)
scene.add(terrainMesh2)
terrainMesh2.position.x = -1
terrainMesh2.position.z = -10
terrainMesh2.rotation.x = 5.3

const sunMesh = new THREE.Mesh(sunObj, sunMat)
scene.add(sunMesh)
sunMesh.position.z = -30
// sunMesh.rotation.x = -270

const planetConceptMesh = new THREE.Mesh(planetConceptObj, htmlMat)
sunMesh.add(planetConceptMesh)
planetConceptMesh.position.x = 9
const planetConceptMesh2 = new THREE.Mesh(planetConceptObj2, cssMat)
sunMesh.add(planetConceptMesh2)
planetConceptMesh2.position.x = -9
const planetConceptMesh3 = new THREE.Mesh(planetConceptObj2, jsMat)
sunMesh.add(planetConceptMesh3)
planetConceptMesh3.position.z = 10
planetConceptMesh3.position.x = -3
const planetConceptMesh4 = new THREE.Mesh(planetConceptObj3, threejsMat)
sunMesh.add(planetConceptMesh4)
planetConceptMesh4.position.z = -10
planetConceptMesh4.position.x = -5

// const moonConceptMesh = new THREE.Mesh(moonConceptObj, moonConceptMat)
// planetConceptMesh.add(moonConceptMesh)
// moonConceptMesh.position.y = 3


// Lights
const bluelight = new THREE.PointLight(0xFFFFFF,3);
bluelight.position.set(-50,100,-80)
scene.add(bluelight);
const redlight = new THREE.PointLight(0xF00000,50);
redlight.position.set(25,-100,-50)
scene.add(redlight);

let eclipseIntensity = 8;
const eclipselight = new THREE.PointLight(0x0FFFFF, 0);
eclipselight.position.set(0,400,-500);
scene.add(eclipselight);
const eclipselight2 = new THREE.PointLight(0xFF0000, 0);
eclipselight2.position.set(0,-400,-500);
scene.add(eclipselight2);

const textlight = new THREE.PointLight(0xFFFFFF, 2);
textlight.position.set(0,0,2);
scene.add(textlight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10
scene.add(camera)

/**
 * Renderer
 */

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
var lastScrollTop = 0;
function updateCamera(ev)
{
//     var st = window.scrollTop();
//     if (st > lastScrollTop)
//     {
//         //downscroll
//     }
//     else
//     {
//        //upscroll
//     }
//    lastScrollTop = st;

    if(window.scrollY < 6300)
    {
        camera.position.z = 10 - window.scrollY / 300.0;
    }
    else
    {
        camera.position.z = -1 * (32 - window.scrollY / 300.0);
    }

    if(camera.position.z < -10)
    {
        sunMesh.position.x = 0;
        bluelight.intensity = 0;
        redlight.intensity = 0;
        if(eclipseIntensity < 10 && textlight.intensity < 1)
        {
            eclipseIntensity += 0.8;
            textlight.intensity += 0.1;
        }
    }
    else
    {
        sunMesh.position.x = 100;
        bluelight.intensity = 3;
        eclipseIntensity = 0;
        redlight.intensity = 50;
        textlight.intensity = 0;
    }
    eclipselight.intensity = eclipseIntensity;
    eclipselight2.intensity = eclipseIntensity;

}

window.addEventListener("scroll", updateCamera);

const clock = new THREE.Clock()


 ///--------------RENDER UPDATE----------------------///
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .25 * elapsedTime
    terrainMesh.rotation.z = .05 * elapsedTime
    terrainMesh2.rotation.z = -.05 * elapsedTime
    sunMesh.rotation.y = .25 * elapsedTime

    planetConceptMesh.rotation.y = 1 * elapsedTime

    planetConceptMesh2.rotation.y = 1 * elapsedTime

    planetConceptMesh3.rotation.y = 1 * elapsedTime

    planetConceptMesh4.rotation.y = 1 * elapsedTime
    

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()