/*import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component{

  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)

    //set orbit controls
    const OrbitControls = require("three-orbit-controls")(THREE)
    this.controls = new OrbitControls(this.camera,this.renderer.domElement)
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;

    //ADD CUBE
    //const geometry = new THREE.BoxGeometry(1, 1, 1)
    //const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    //this.cube = new THREE.Mesh(geometry, material)
    //this.scene.add(this.cube)
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    //const texture = new THREE.TextureLoader().load('./images/templates/back_body/back_body00bee.png')
    //const material = new THREE.MeshBasicMaterial({map : texture})
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    this.start()
  }

componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

stop = () => {
    cancelAnimationFrame(this.frameId)
  }

animate = () => {
   this.cube.rotation.x += 0.01
   this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }

renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}

render(){
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeScene*/