
const isFacing = (from, to, norm) => {
  // check if 2D vector from -> to is facing norm
  
  return (((to.x - from.x) * norm.x) + ((to.z - from.z) * norm.z) >= 0);
};

export { isFacing };
