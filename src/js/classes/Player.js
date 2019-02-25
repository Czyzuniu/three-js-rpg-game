
import {
  Vector3, Math
} from 'three'

import GameObject from './GameObject'
const ColladaLoader = require('three-collada-loader-2');



export default class Player extends GameObject{

  constructor() {
    super()
    this.prevTime = performance.now();
    this.velocity = new Vector3();
    this.mesh = null
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveSpeed = 100
  }


  update() {

    let time = performance.now();
    // Create a delta value based on current time
    let delta = ( time - this.prevTime ) / 1000;

    let rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

    // Set the velocity.x and velocity.z using the calculated time delta
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;
    //this.velocity.y = 0



    if ( this.moveForward ) {
      this.velocity.z -= this.moveSpeed * delta;
    }

    if (this.moveBackward) {
      this.velocity.z += this.moveSpeed * delta;
    }

    if (this.moveLeft ) {
      this.mesh.rotateOnAxis(new Vector3(0,1,0), -2.5 * delta);
    }

    if (this.moveRight ) {
      this.mesh.rotateOnAxis(new Vector3(0,1,0), 2.5 * delta);
    }

    this.mesh.translateZ(this.velocity.z * delta )
    this.mesh.translateX(this.velocity.x * delta )


    this.prevTime = time;

  }


  move(event) {
    switch (event.keyCode) {
      case 87: // w
        this.moveForward = true;
        break;
      case 83: // s
        this.moveBackward = true;
        break;
      case 65: // a
        this.moveLeft = true;
        break;
      case 68: // d
        this.moveRight = true;
        break;
    }
  }

  stop(event) {
    switch (event.keyCode) {
      case 87: // w
        this.moveForward = false;
        break;
      case 83: // s
        this.moveBackward = false;
        break;
      case 65: // a
        this.moveLeft = false;
        break;
      case 68: // d
        this.moveRight = false;
        break;
    }
  }

  draw() {
    return new Promise((res) => {
      const colladaLoader = new ColladaLoader();
        colladaLoader.load('http://localhost:3000/public/models/collada.dae', colladaModel => {
            this.mesh = colladaModel.scene.children[0]
            this.mesh.rotateX(Math.degToRad(-90))
            this.mesh.position.y = 4.6
            res(this.mesh)
        });
      })

  }


}
