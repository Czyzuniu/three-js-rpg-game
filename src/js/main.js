// forked from https://github.com/superguigui/Wagner/blob/master/example/index.js

import AbstractApplication from 'views/AbstractApplication'
import Player from './classes/Player'
import Terrain from "./classes/Terrain";
import {AmbientLight, CubeTextureLoader} from "three";

let player

class Main extends AbstractApplication {
  constructor () {
    super()

    const envMap = new CubeTextureLoader()
      .setPath( 'http://localhost:3000/public/textures/skyboxsun25deg/')
      .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
    this._scene.background = envMap;

    this.player = new Player()
    player = this.player
    this.terrain = new Terrain()

    const light = new AmbientLight( 0x404040 ); // soft white light
    this._scene.add( light );

    this.player.draw().then((mesh) => {
      console.log(mesh)
      this._scene.add(mesh)
      mesh.add(this._camera)
    })

    this.terrain.draw().then((ground) => {
      this._scene.add(ground)
    })

    this.animate()
  }



  animate () {

    if (this.player.mesh) {
      this.player.update()
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
