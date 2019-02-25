import GameObject from './GameObject'

let FBXLoader = require('three-fbxloader-offical')

//import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

export default class EnvironmentObject extends GameObject {
  constructor () {
    super()
  }

  loadModel (url) {
    // let mtlLoader = new MTLLoader()
    // let objLoader = new OBJLoader()
    let fbxLoader = new FBXLoader()

    // return new Promise((res) => {
    //   mtlLoader.load('http://localhost:3000/public/models/WoodenCabinObj.mtl', (materials) => {
    //     materials.preload()
    //     objLoader.setMaterials(materials)
    //     objLoader.load('http://localhost:3000/public/models/WoodenCabinObj.obj', (object3d) => {
    //       res(object3d)
    //     })
    //   })
    // })



    return new Promise((res) => {
      fbxLoader.load('http://localhost:3000/public/models/WoodenCabinFbx.fbx', (object3d) => {
        res(object3d)
      })

      fbxLoader.onError = (e) => {
        console.log(e)
      }
    })
  }
}
