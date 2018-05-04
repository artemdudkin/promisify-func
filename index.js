/** 
 * if func returns not Promise then wraps it with Promise.resolve()
 * if func throws error then wraps it with Promise.reject()
 *
 * @param {Function} func - function to call
 *
 * @returns Promise
 */
const promisify = (func) => {
    if (func.promisified) {
      return func;
    }
  
    const f = (...rest) => {
      let res;
      let err;
      try {
        res = func.apply(this, rest);
      } catch (e) {
        err = e;
      }
      if (err) {
        return Promise.reject(err);
      } else {
        if (typeof res.then != 'function') {
          return Promise.resolve( res );
        } else {
          return res;
        }
      }
    } 
    f.promisified = true;
    return f;   
}

module.exports = promisify;
