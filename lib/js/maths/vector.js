function dot2D(a, b) {
  return a.x * b.x + a.z * b.z;
}

function subVector(a, b) {
  return new THREE.Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
}

//function isFacing(from, to, norm) {
  // check if dot product [from->to, norm] >= 0
  //return (((to.x - from.x) * norm.x) + ((to.z - from.z) * norm.z) >= 0);
//};

function polarRotate2D(point, angle) {
  const theta = Math.atan2(point.y, point.x) + angle;
  const mag = Math.sqrt(point.x * point.x + point.y * point.y);
  point.x = Math.cos(theta) * mag;
  point.y = Math.sin(theta) * mag;
}

export { dot2D, subVector, polarRotate2D };
