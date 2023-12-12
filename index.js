const fs = require("fs");

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Path Validate
    if (fs.existsSync(path)) {

    }else {
      //Path not validate
      reject("La ruta no existe");
    }
      
  })
}

module.exports = () => {
  mdLinks
};
