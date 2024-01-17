const {
  isAbsolutePath,
  toAbsolutePath,
  existsPath,
  isMarkdownFile,
  readFileContent,
  extractLinks,
  validated, } = require("./function.js");

const mdLinks = (route, validate = false) => {
  return new Promise((resolve, reject) => {
    //Path Validate
    const completePath = toAbsolutePath(route);
    if(!existsPath(completePath)) {
      return reject("Ruta inexistente");
    }
    if(!isMarkdownFile(completePath)) {
      return reject('El archivo no es tipo marckdown');
    }
    // const content = readFileContent(route);
    readFileContent(completePath)
      .then((data)=>{
        const arrLinks = extractLinks(data, route);
        if(validate){
         validated(arrLinks)
            .then((validatedLinks) => {
              console.log(validatedLinks)
            })

          //llamar a función validar y resolver ese retorno de validar
          //función validar tiene cómo parametro un array de objetos ( arrLinks)
          // validar(arrLinks)
          // .then((arrLinksValidados)=>{
          //   resolve(arrLinksValidados)
          // })
        } else {
          resolve(arrLinks);
        }
      })
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
