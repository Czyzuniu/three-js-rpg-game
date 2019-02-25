// forked from https://github.com/superguigui/Wagner/blob/master/example/index.js

import AbstractApplication from 'views/AbstractApplication'
import Player from './classes/Player'
import Terrain from './classes/Terrain'
import { AmbientLight, CubeTextureLoader, AudioListener, AudioLoader, Audio, Raycaster, Vector3 } from 'three'
import EnvironmentObject from './classes/EnvironmentObject'

let player

class Main extends AbstractApplication {
  constructor () {
    super()

    this.collidableMeshList = []

    const envMap = new CubeTextureLoader()
      .setPath('http://localhost:3000/public/textures/skyboxsun25deg/')
      .load([ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ])
    this._scene.background = envMap

    let raycaster = new Raycaster()

    this.player = new Player()
    player = this.player
    this.terrain = new Terrain()

    const light = new AmbientLight('#ffffff') // soft white light
    this._scene.add(light)

    this.player.draw().then((mesh) => {
      this._scene.add(mesh)
      mesh.add(this._camera)
    })

    this.terrain.draw().then((ground) => {
      this.ground = ground
      this._scene.add(ground)
      console.log(ground)
    })

    this.animate()

    const listener = new AudioListener()
    this._camera.add(listener)
    const sound = new Audio(listener)

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new AudioLoader()
    audioLoader.load('http://localhost:3000/public/sounds/nature_theme1.mp3', buffer => {
      sound.setBuffer(buffer)
      sound.setLoop(true)
      sound.setVolume(0.5)
      // sound.play()
    })

    var terrain_geometry = new PlaneGeometry(5, 20, 32)
    var terrain_material = new MeshLambertMaterial({ color: new THREE.Color(0.9, 0.55, 0.4) })
    var terrain = new THREE.Mesh(terrain_geometry, terrain_material)
    terrain.position.x = -2
    terrain.position.z = -2
    terrain.updateMatrixWorld(true)
    scene.add(terrain)
  }

  detectCollision (object) {
    let originPoint = object.position.clone()

    let geometry = object.geometry

    for (let i = 0; i < geometry.vertices.length; i++) {
      let localVertex = geometry.vertices[i].clone()
      let globalVertex = localVertex.applyMatrix4(object.matrix)
      let directionVector = globalVertex.sub(object.position)

      let ray = new Raycaster(originPoint, directionVector.clone().normalize())

      let collisionResults = ray.intersectObjects(this.collidableMeshList)
      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        console.log('hit ground')
        return true
      }
    }

    return false
  }

  animate () {
    if (this.player.mesh && this.ground) {
      var raycaster = new Raycaster()
      raycaster.set(this.player.physicalObject.position, new Vector3(0, -1, 0))
      var intersects = raycaster.intersectObject(this.ground)
      console.log(intersects)
      this.player.update()
      // this.detectCollision(this.player.physicalObject)
    }

    super.animate()
  }
}

window.addEventListener('keydown', (event) => {
  player.move(event)
})

window.addEventListener('keyup', (event) => {
  player.stop(event)
})

export default Main
