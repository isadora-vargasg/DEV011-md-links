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
    const completePath = toAbsolutePath(route);//se usa la funcion toAbsolutePath para obtener la ruta absoluta
    if(!existsPath(completePath)) {//verifica que esa ruta exista 
      return reject("Ruta inexistente");//si no existe la promesa se rechaza 
    }
    if(!isMarkdownFile(completePath)) {//verifica que el archivo sea de tipo markdown usando la función isMarkdownFile 
      return reject('El archivo no es tipo marckdown');//si no es tipomarkdown se rechaza la promesa
    }
    readFileContent(completePath)//lee el archivo usando la función readFileContent
      .then((data)=>{//guarda el contenido del archivo en 'data'
        const arrLinks = extractLinks(data, route);//usa la función extractLinkspara extrar información sobre los links en el archivo y crea un array para almacenar objetos con esa información 
        if(validate){//verifica si se prporciono el parametro 'validate'
         validated(arrLinks)//si es true entonces se usará la función validated
            .then((validatedLinks) => {//para validar links y agregar su estatus
              console.log(validatedLinks)
            })
        } else {
          resolve(arrLinks);//si no se validará entonces solamente se proporcionará solamente el array con la URL, texto y archivo
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
