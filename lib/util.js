const Util = {
  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  times(n, iterator) {
    let accum = Array(Math.max(0, n));
    for (let i = 0; i < n; i++) accum[i] = iterator.call();
    return accum;
  },
};



module.exports = Util;
