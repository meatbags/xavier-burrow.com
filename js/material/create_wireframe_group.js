/** Wireframe */

import * as THREE from 'three';
import WireframeMaterial from './wireframe_material';

const CreateWireframeGroup = geo => {
  /*
  geo.deleteAttribute('normal');
  // geo.deleteAttribute('uv');

  const vectors = [
		new THREE.Vector3( 1, 0, 0 ),
		new THREE.Vector3( 0, 1, 0 ),
		new THREE.Vector3( 0, 0, 1 )
	];

	var position = geo.attributes.position;
	var centers = new Float32Array( position.count * 3 );

	for (var i=0, l=position.count; i<l; i++) {
		vectors[ i % 3 ].toArray( centers, i * 3 );
  }

	geo.setAttribute( 'center', new THREE.BufferAttribute( centers, 3 ) );
  */

  // mesh
  const mat = WireframeMaterial; //new THREE.MeshStandardMaterial({color: 0x0});
  const mesh = new THREE.Mesh(geo, mat);
  const group = new THREE.Group();
  mesh.scale.set(2, 2, 2);

  const emptyMat = new THREE.MeshBasicMaterial({
    color: 0x0,
    opacity: 0,
    side: THREE.DoubleSide,
    depthTest: false
  });
  const emptyMesh = new THREE.Mesh(geo, emptyMat);
  const wireframe = new THREE.WireframeGeometry(geo);
  const lines = new THREE.LineSegments(wireframe);
  lines.scale.set(1,1,1);

  group.add(emptyMesh);
  group.add(mesh);
  //group.add(lines);
  return group;
};

export default CreateWireframeGroup;
