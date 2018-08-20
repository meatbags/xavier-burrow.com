/**
 * Create a dom element with props.
 */

function el(type, params) {
  const res = document.createElement(type);
  Object.keys(params).forEach(key => {
    const val = params[key];
    if (typeof(val) === 'object') {
      if (!res[key]) {
        res[key] = {};
      }
      Object.keys(val).forEach(subkey => {
        res[key][subkey] = val[subkey];
      });
    } else {
      res[key] = val;
    }
  });
  return res;
}

export { el };
