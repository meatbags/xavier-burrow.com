/** Load FBX & OBJ */

import * as THREE from 'three';
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import './OBJLoader';
import './FBXLoader';

class Loader {
  constructor(path) {
    this.path = `${APP_ROOT}/${path}/`;
    this.materials = {};
    this.images = {};
    this.loaderFBX = new THREE.FBXLoader();
    this.loaderOBJ = new THREE.OBJLoader();
  }

  loadFBX(filename) {
    return new Promise(
      (resolve, reject) => {
        try {
          filename += filename.indexOf('.fbx') === -1 ? '.fbx' : '';
          this.loaderFBX.load(this.path + filename, (model) => { resolve(model); });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    );
  }

  loadOBJ(filename) {
    return new Promise(
      (resolve, reject) => {
        try {
          filename += filename.indexOf('.obj') === -1 ? '.obj' : '';
          this.loaderOBJ.load(this.path + filename, (model) => { resolve(model); });
        } catch(error) {
          console.log(error);
          reject(error);
        }
      }
    )
  }
}

export default Loader;
