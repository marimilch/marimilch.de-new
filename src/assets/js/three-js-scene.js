import * as THREE from 'three';

export function initialize({
    canvasWrap = null,
    focalLength = null,
    antialias = null,
    backgroundColor = null,
    cameraDistance = null,
    modelLifes = [{
        path = null,
        init = ()=>{},
        animation = ({
            model = null,
            time = null,
            scene = null
        }) => {}
    }]
}) {
    const sceneData = {}

    // Not using data on purpose (workaround for three js in vue)
    // Scene
    const wrap = canvasWrap
    const rect = wrap.getBoundingClientRect()
    const gltfLoader = new GLTFLoader()

    sceneData.scene = new THREE.Scene()
    sceneData.camera = new THREE.PerspectiveCamera(
        focalLength,
        rect.width / rect.height,
        0.1,
        1000
    )

    sceneData.renderer = new THREE.WebGLRenderer({ antialias: antialias })
    updateSize(rect, renderer)
    sceneData.renderer.setClearColor(new THREE.Color(backgroundColor))
    wrap.appendChild(sceneData.renderer.domElement)
    sceneData.renderer.domElement.classList.add('three-js')

    // Model
    gltfLoader.load(this.modelPath, function (gltf) {
        const light1 = new THREE.DirectionalLight(0xffffff, .4, .05, .05) // soft white light
        light1.position.set(
            1,
            1,
            1
        )

        const light2 = new THREE.DirectionalLight(0xffffff, .4, .05, .05) // soft white light
        light2.position.set(
            -1,
            3,
            1
        )

        const light3 = new THREE.DirectionalLight(0xffffff, .4, .05, .05) // soft white light
        light3.position.set(
            0,
            .1,
            1
        )

        const ambientLight = new THREE.AmbientLight(0x888888) // soft white light
        ambientLight.position.set(
            0,
            10,
            0
        )

        this.scene.add(light1)
        this.scene.add(light2)
        this.scene.add(light3)
        this.scene.add(ambientLight)

        this.model = gltf.scene
        // this.model.translateY(-.17)
        this.model.position.set(...this.startPositionModel)
        this.scene.add(this.model)

        const material = new THREE.MeshStandardMaterial({
            color: this.color,
            roughness: 0,
        })

        let i = 0
        this.model.traverse((o) => {
            if (o.isMesh) {
                o.material = material
                ++i
            }
        })

        wrap.style.opacity = '1'

        this.lerpStart = this.model.position.clone()
        this.lerpEnd = this.model.position.clone()

        this.renderCascade()
    }.bind(this), undefined, function (error) {
        console.error(error)
    });

    this.camera.position.z = this.cameraDistance
}

function updateSize(rect, renderer){
    renderer.setSize( 
        rect.width / this.pixelation, 
        rect.height / this.pixelation
    )
}