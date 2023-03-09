import * as THREE from 'three';
import Experience from '../Experience.js';
import Model from './Model.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Ground
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.5, 10),
      new THREE.MeshBasicMaterial({ color: '#9a6a5c' })
    );
    mesh.position.set(0.3, -0.25, 0);
    this.scene.add(mesh);

    this.resources.on('ready', () => {
      // Setup
      this.model = new Model();
    });
  }
}
