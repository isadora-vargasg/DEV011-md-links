const {
  isAbsolutePath,
  toAbsolutePath,
  existsPath,
  isMarkdownFile,
  readFileContent,
  extractLinks, } = require("./function.js");

const mdLinks = (route) => {
  return new Promise((resolve, reject) => {
    //Path Validate
    const completePath = toAbsolutePath(route);
    if(!existsPath(route)) {
      return reject("Ruta inexistente");
    }
    if(!isMarkdownFile(route)) {
      return reject('El archivo no es tipo marckdown');
    }
    const content = readFileContent(route);
    const arrLinks = extractLinks(content, route);
    return resolve(arrLinks);
    // .then((content) => {
    //   const arrLinks = extractLinks(data, file);
    //   resolve(arrLinks);
    // })
    // .catch((error) => {
    //   reject(new Error(`Error al leer el archivo: ${error.message}`));
    // });
  });
}

module.exports = {
  mdLinks
}
