const fs = require("fs"); //File Sistem Node
const path = require('path'); //Paths Node
const { JSDOM } = require('jsdom');
const marked = require("marked"); 
const axios = require('axios'); //Solicitudes HTTP

//True = absolute path & false = relative path
const isAbsolutePath = (route) => path.isAbsolute(route);


//Path relative to path absolute
const toAbsolutePath = (route) => {
    return isAbsolutePath(route) ? route : path.resolve(route)
}

//Existing path
const existsPath = (route) => {
    return fs.existsSync(route);
}

//Is a markdown file
const isMarkdownFile = (route) => {
    const fileExtension = path.extname(route)
    const markdownExtension = [".md", ".mkd", ".mdwn", ".mdown", ".mdtxt", ".mdtext", ".markdown", ".text"];
    return markdownExtension.includes(fileExtension);
}

//Read file
const readFileContent = (route) => {
    // return fs.readFileSync(route, "utf8", (err, data) => {
        // if(err) reject('Error de lectura')
    //     return data;
    // });
    return new Promise((resolve, reject) => {
        fs.readFile(route, "utf8", (err, data) => {
            if(err) reject('Error de lectura')
            resolve(data)
        });
    })
    } 

//Extract links 
const extractLinks = (data, file) => {
    const arrLinks = []
    const html = marked.parse(data)
    const dom = new JSDOM(html);
    const nodeListA = dom.window.document.querySelectorAll("a")
    nodeListA.forEach((anchor) => {
        arrLinks.push(
            {
                href: anchor.href,
                text: anchor.textContent,
                file,
            }
        )
    })
    return arrLinks
}

//Función para validar links
function validated(listLinks) {
  // let dogs = ['hoa', 'maia', 'olivia']
  // let mdogs = dogs.filter((dog) => dog.includes('m'))
    const linkPromises = listLinks.map(link => { //map recorre cada objeto de objLink y genera un arreglo de
      const url = link.href; //extrae URL
      return axios.get(url) //Realiza la solicitud HTTP 
        .then(response => { //Solicitud exitosa actualiza codigo de respuesta HTTP y ok en caso de exito
          link.status = response.status;
          link.ok = response.statusText;
          return link;
        })
        .catch(error => {//Solicitud con error actualiza codigo de respuesta HTTP y fail en caso de exito
          link.ok = 'Fail';
          link.status = error.response ? error.response.status : 500;
          return link;
        });
    });
  
    return Promise.all(linkPromises) //Devuelve una promesa esperar a que todas las promesas en linkPromises se resuelvan. Cuando todas las solicitudes estén completas, devuelve un array de enlaces validados.
      .then(validated => {
        return validated;
      })
      .catch(err => {
        console.error('Error al validar enlaces:', err);
        throw err;
      });
  }

module.exports = {
    isAbsolutePath,
    toAbsolutePath,
    existsPath,
    isMarkdownFile,
    readFileContent,
    extractLinks,
    validated,
}
