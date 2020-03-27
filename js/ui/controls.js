/** Camera controls */

import * as THREE from 'three';
import Blend from '../util/blend';
import Clamp from '../util/clamp';
import IsMobileDevice from '../util/is_mobile_device';
import MinAngleBetween from '../util/min_angle_between';
import CreateElement from '../util/create_element';
import Mouse from './mouse';
import Keyboard from './keyboard';

class Controls {
  constructor(params) {
    this.camera = params.camera;
    this.domTarget = params.domTarget;
    this.blendPosition = params.blendPosition || 0.25;
    this.blendRotation = params.blendRotation || 0.125;
    this.isMobile = IsMobileDevice();

    // position
    const x = this.camera.position.x;
    const y = this.camera.position.y;
    const z = this.camera.position.z;
    this.height = params.height || 1.8;
    this.speed = params.speed || 2;
    this.speedNoclip = 10;
    this.keys = {up: false, down: false, left: false, right: false, jump: false, noclip: false};
    this.position = {
      x: x, y: y, z: z,
      target: new THREE.Vector3(x, y, z),
      motion: new THREE.Vector3(),
    };
    this.el = CreateElement({
      class: 'controls',
      childNodes: [{
        class: 'controls__inner',
        childNodes: [
          { class: 'controls__control controls__control--left', },
          { class: 'controls__control controls__control--right', },
          { class: 'controls__control controls__control--up', },
          { class: 'controls__control controls__control--down', },
        ]
      }]
    });
    if (!this.isMobile) {
      this.el.classList.add('hidden');
    }
    document.querySelector('body').appendChild(this.el);

    // rotation
    this.maxPitch = Math.PI * 0.25;
    this.minPitch = -Math.PI * 0.25;
    const d = this.camera.position.distanceTo(new THREE.Vector3());
    const pitch = params.pitch || this.camera.rotation.x;
    const yaw = params.yaw || this.camera.rotation.y;
    this.rotation = {
      pitch: pitch,
      yaw: yaw,
      origin: {pitch: pitch, yaw: yaw},
      target: {pitch: pitch, yaw: yaw},
      cache: {pitch: 0, yaw: 0},
      size: {pitch: 0, yaw: 0},
    };

    // init mouse/ keyboard
    this.mouse = new Mouse({
      domTarget: this.domTarget,
      onMouseDown: evt => { this.onMouseDown(evt); },
      onMouseMove: evt => { this.onMouseMove(evt); },
      onMouseUp: evt => { this.onMouseUp(evt); },
      onMouseLeave: evt => { this.onMouseLeave(evt); },
    });
    this.keyboard = new Keyboard((key) => { this.onKeyboard(key); });

    console.log('[Controls] initialised');
  }

  onMouseDown(evt) {
    // calculate working area
    const rect = this.domTarget.getBoundingClientRect();
    this.centre = {x: rect.width / 2, y: rect.height / 2,};

    // cache rotation
    this.rotation.origin.yaw = this.rotation.yaw;
    this.rotation.origin.pitch = this.rotation.pitch;

    // calculate rotation size basis
    this.rotation.size.pitch = (this.camera.fov / 2) * (Math.PI / 180);
    this.rotation.size.yaw = this.rotation.size.pitch * (rect.width / rect.height);

    // set touchmove timeout
    this.touchMoveTimeout = false;
    setTimeout(() => {
      if (this.mouse.active) {
        this.touchMoveTimeout = true;
      }
    }, 100);
  }

  onMouseMove(evt) {
    if (this.mouse.active) {
      // update player rotation
      const dyaw = (this.mouse.delta.x / this.centre.x) * this.rotation.size.yaw;
      const dpitch = (this.mouse.delta.y / this.centre.y) * this.rotation.size.pitch;
      const yaw = this.rotation.origin.yaw + dyaw;
      const pitch = Clamp(this.rotation.origin.pitch + dpitch, this.minPitch, this.maxPitch);

      // reset mouse.y origin is clamped
      if (pitch === this.minPitch || pitch === this.maxPitch) {
        this.mouse.origin.y = evt.clientY - this.mouse.top;
        this.rotation.origin.pitch = pitch;
      }

      // set target
      this.rotation.target.pitch = pitch;
      this.rotation.target.yaw = yaw;
    }
  }

  onMouseUp(evt) {
    const dt = performance.now() - this.timestamp;
    const dx = Math.hypot(this.mouse.delta.x, this.mouse.delta.y);
    if (dt < this.clickThreshold && dx < window.innerWidth * this.threshold.mouseDelta) {
      if (this.isMobile) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    }
  }

  onMouseLeave() {}

  onKeyboard(key) {
    switch (key) {
      case 'a': case 'A': case 'ArrowLeft':
        this.keys.left = this.keyboard.keys[key];
        break;
      case 'd': case 'D': case 'ArrowRight':
        this.keys.right = this.keyboard.keys[key];
        break;
      case 'w': case 'W': case 'ArrowUp':
        this.keys.up = this.keyboard.keys[key];
        break;
      case 's': case 'S': case 'ArrowDown':
        this.keys.down = this.keyboard.keys[key];
        break;
      case ' ':
        this.keys.jump = this.keyboard.keys[key];
        break;
      case 'x': case 'X':
        // toggle noclip on ctrl+x
        if (this.keyboard.keys['x'] || this.keyboard.keys['X']) {
          if (this.keyboard.isControl()) {
            this.keys.noclip = this.keys.noclip === false;
            console.log('[Controls] noclip:', this.keys.noclip);
          }
          this.keyboard.release('x');
          this.keyboard.release('X');
        }
        break;
      default:
        break;
    }
  }

  updatePosition(delta) {
    if (this.keys.up || this.keys.down || this.keys.left || this.keys.right) {
      const speed = (this.keys.noclip) ? this.speedNoclip * (1 - Math.abs(Math.sin(this.rotation.pitch))) : this.speed;
      const ws = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
      const ad = ((this.keys.left) ? 1 : 0) + ((this.keys.right) ? -1 : 0);
      const scale = ws != 0 && ad != 0 ? 0.7071 : 1;
      this.position.motion.x = (Math.sin(this.rotation.yaw) * speed * ws + Math.sin(this.rotation.yaw + Math.PI / 2) * speed * ad) * scale * -1;
      this.position.motion.z = (Math.cos(this.rotation.yaw) * speed * ws + Math.cos(this.rotation.yaw + Math.PI / 2) * speed * ad) * scale * -1;
    } else {
      this.position.motion.x = 0;
      this.position.motion.z = 0;
    }

    // noclip
    if (this.keys.noclip) {
      if (this.keys.up || this.keys.down) {
        const d = ((this.keys.up) ? 1 : 0) + ((this.keys.down) ? -1 : 0);
        this.position.motion.y = Math.sin(this.rotation.target.pitch) * d * this.speedNoclip;
      } else {
        this.position.motion.y = 0;
      }
    }

    // set position
    this.position.target.x += this.position.motion.x * delta;
    this.position.target.y += this.position.motion.y * delta;
    this.position.target.z += this.position.motion.z * delta;
    if (!this.keys.noclip) {
      this.position.target.y = 0;
    }
    this.position.x = Blend(this.position.x, this.position.target.x, this.blendPosition);
    this.position.y = Blend(this.position.y, this.position.target.y, this.blendPosition);
    this.position.z = Blend(this.position.z, this.position.target.z, this.blendPosition);
  }

  update(delta) {
    this.updatePosition(delta);

    // position
    this.camera.position.x = this.position.x;
    this.camera.position.y = this.position.y + this.height;
    this.camera.position.z = this.position.z;

    // rotation
    this.rotation.yaw += MinAngleBetween(this.rotation.yaw, this.rotation.target.yaw) * this.blendRotation;
    this.rotation.pitch = Blend(this.rotation.pitch, this.rotation.target.pitch, this.blendRotation);
    this.camera.rotation.x = this.rotation.pitch;
    this.camera.rotation.y = this.rotation.yaw;
  }
}

export default Controls;
