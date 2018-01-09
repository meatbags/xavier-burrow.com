
const isFacing = (from, to, norm) => {
  // check if vector from -> to is facing norm (x, z) only

  return (((to.x - from.x) * norm.x) + ((to.z - from.z) * norm.z) >= 0);
};

const polarRotate2D = (point, angle) => {
  // rotate vector using polar coord transform

  const theta = Math.atan2(point.y, point.x) + angle;
  const mag = Math.sqrt(point.x * point.x + point.y * point.y);

  // rotate

  point.x = Math.cos(theta) * mag;
  point.y = Math.sin(theta) * mag;
}

export { isFacing, polarRotate2D };
