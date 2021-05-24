module.exports = function removeCommentsLoader(source) {
  return source.replace(/<!--(.*?)-->/g, '');
};
