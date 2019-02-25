import GameObject from './GameObject'
import {
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  RepeatWrapping, TextureLoader,
} from "three";




export default class Terrain extends GameObject{
  constructor() {
    super()
  }

  draw() {
    return new Promise((res) => {

      let textureLoader = new TextureLoader();
      textureLoader.load(
        // resource URL
        'http://localhost:3000/public/textures/grasslight-big.jpg',
        (texture) => {

          texture.anisotropy = 16
          texture.wrapS = RepeatWrapping;
          texture.wrapT = RepeatWrapping;
          texture.repeat.x = 16;
          texture.repeat.y = 16;

          let grassTex = new MeshBasicMaterial( {
            map: texture
          } );


          this.mesh = new Mesh(  new PlaneBufferGeometry( 100, 100,32,32 ), grassTex);
          this.mesh.scale.set(10,10,0);
          this.mesh.rotation.x = - Math.PI / 2;
          res(this.mesh)
        }
      )

    })
  }
}
