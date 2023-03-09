import * as THREE from 'three';
import Experience from '../Experience';

export default class Model {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.resource = this.resources.items.pubgModel;
    this.bakedTexture = this.resources.items.modelTexture;

    this.setTexture();
    this.setMaterial();
    this.setModel();
  }

  setTexture() {
    this.bakedTexture.flipY = false;
  }

  setMaterial() {
    this.bakedMaterial = new THREE.MeshBasicMaterial({
      map: this.bakedTexture,
    });
  }

  setModel() {
    this.model = this.resource.scene;
    this.bakedMesh = this.model.children.find(
      (child) => child.name === 'baked'
    );
    this.bakedMesh.material = this.bakedMaterial;
    this.scene.add(this.model);
  }
}
