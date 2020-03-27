/** Material handler */

import * as THREE from 'three';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js';

class MaterialHandler {
  constructor() {
    this.silent = false;

    // load default environment map
    const sources = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz'].map(name => `${APP_ROOT}/assets/envmap/${name}.jpg`);
    this.envMap = new THREE.CubeTextureLoader().load(sources);
    this.envMapIntensity = 0.5;

    // tessellation
    this.tessellation = {};
    this.tessellation.flags = {
      //'floor': 'emissiveMap',
    };
    this.tessellation.passes = 3;
    this.tessellation.width = 0.25;
    this.tessellation.modifier = new TessellateModifier(this.tessellation.width);

    // material library
    this.library = {};
  }

  processMaterial(mat) {
    if (Array.isArray(mat) === false) {
      mat.envMap = this.envMap;
      mat.envMapIntensity = this.envMapIntensity;
      if (mat.name.indexOf('neon') !== -1) {
        mat.emissive.setHex(0xffffff);
        mat.emissiveIntensity = 1;
      }

      // add to library
      if (this.library[mat.name] === undefined) {
        this.library[mat.name] = mat;
        if (!this.silent) {
          console.log('[MaterialHandler] processed:', mat.name);
        }
      }
    } else {
      mat.forEach(child => {
        this.processMaterial(child);
      });
    }
  }

  tessellate(obj) {
    const keys = Object.keys(this.tessellation.flags);
    const index = keys.findIndex(term => obj.name.indexOf(term) !== -1);
    if (index === -1) {
      return;
    }

    // get geometry
    let geo = obj.geometry.clone();
    if (geo.isBufferGeometry) {
      geo = (new THREE.Geometry()).fromBufferGeometry(geo);
      geo.mergeVertices();
    }

    // apply tessellation
    const before = geo.vertices.length;
    for (let i=0; i<this.tessellation.passes; ++i) {
      this.tessellation.modifier.modify(geo);
    }
    const after = geo.vertices.length;

    // set displacement map
    const propertyKey = keys[index];
    const property = this.tessellation.flags[propertyKey];
    const callback = mat => {
      if (Array.isArray(mat)) {
        mat.forEach(child => { callback(child); });
      } else {
        mat.displacementMap = mat[property];
        mat.needsUpdate = true;
        console.log(mat, mat[property]);
      }
    };
    callback(obj.material);

    // set geometry
    obj.geometry.fromGeometry(geo);
    if (!this.silent) {
      console.log('[MaterialHandler] tessellated:', obj.name, before, '->', after);
    }
  }

  processObject(obj) {
    if (obj.material) {
      this.processMaterial(obj.material);
      this.tessellate(obj);
    }

    if (obj.children && obj.children.length) {
      obj.children.forEach(child => {
        this.processObject(child);
      });
    }
  }

  getMaterial(name) {
    if (this.library[name] === undefined) {
      console.log('[MaterialHandler] material not found:', name);
      return new THREE.MeshStandardMaterial({color: 0x22ff22});
    }
    return this.library[name];
  }
}

export default MaterialHandler;
