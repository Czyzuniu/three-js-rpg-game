import GameObject from './GameObject'
import {
  Mesh,
  MeshBasicMaterial,
  PlaneBufferGeometry,
  RepeatWrapping, TextureLoader,
} from "three";
import EnvironmentObject from './EnvironmentObject'
const ColladaLoader = require('three-collada-loader-2')




export default class Terrain extends GameObject{
  constructor() {
    super()
  }

  draw() {
    return new Promise((res) => {
      const colladaLoader = new ColladaLoader()
      colladaLoader.load('http://localhost:3000/public/models/world.dae', colladaModel => {
          res(colladaModel.scene)
      })
    })
  }
}
