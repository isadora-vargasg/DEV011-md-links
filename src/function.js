const fs = require("fs"); //File Sistem Node
const path = require('path'); //Paths Node
const { JSDOM } = require('jsdom');
const marked = require("marked"); 
const axios = require('axios'); //Solicitudes HTTP

//True = absolute path & false = relative path
const isAbsolutePath = (route) => path.isAbsolute(route); //verifica si es una ruta absoluta


//Path relative to path absolute
const toAbsolutePath = (route) => {
    return isAbsolutePath(route) ? route : path.resolve(route)//si es una ruta absoluta entonces devuelve la ruta tal y como esta si es relativa entonces la convierte en absoluta
}

//Existing path
const existsPath = (route) => {
    return fs.existsSync(route);//con el modulo fs se comprueba que exista el archivo o directorio ingresado
}

//Is a markdown file
const isMarkdownFile = (route) => {
    const fileExtension = path.extname(route)//Usa modulo path para obtener la extención del archivo
    const markdownExtension = [".md", ".mkd", ".mdwn", ".mdown", ".mdtxt", ".mdtext", ".markdown", ".text"];//aray con las extenciones validas
    return markdownExtension.includes(fileExtension);//siel archivo es un markdow devuelve true y sino lo es devuelve false
}

//Read file
const readFileContent = (route) => {
    return new Promise((resolve, reject) => {
        fs.readFile(route, "utf8", (err, data) => { //funcion readFile del modulo fs lee el contenido de un archivo. Parámetros route es la ruta del archivo y utf8 la codificación del archivo
            if(err) reject('Error de lectura')//error al leer el archivo
            resolve(data)//se ejecuto con exito la promesa y se pasa el contenido del archivo
        });
    })
    } 

//Extract links 
const extractLinks = (data, file) => {
    const arrLinks = [] //Crea variable que almacenara en un arreglo la información de cada link
    const html = marked.parse(data) //Se usa la biblioteca marked para convertir el md a HTML
    const dom = new JSDOM(html); //Usa jsdom para crear un DOM basado en el HTML para acceder a elementos HTML 
    const nodeListA = dom.window.document.querySelectorAll("a") //Selecciona todos los elementos "a" en el HTML y los nodos resultantes se almacena 
    nodeListA.forEach((anchor) => { //Se itera sobre cada nodo y se crea un objeto con las siguientes propiedades
        arrLinks.push(
            {
                href: anchor.href, //-url del link
                text: anchor.textContent, //texto dentro del link
                file, //archivo en el que se ejecuto
            }
        )
    })
    return arrLinks //regresa el array con los objetos para cada link
}

//Función para validar links
function validated(listLinks) {
    const linkPromises = listLinks.map(link => { //map recorre cada objeto de objLink y genera un arreglo de
      const url = link.href; //extrae URL
      return axios.get(url) //Realiza la solicitud HTTP 
        .then(response => { //Solicitud exitosa actualiza codigo de respuesta HTTP y ok en caso de exito
          link.status = response.status;
          link.ok = response.statusText;
          return link;
        })
        .catch(error => {//Solicitud con error actualiza codigo de respuesta HTTP y fail en caso de exito
          link.status = error.response ? error.response.status : 500;
          link.ok = 'Fail';
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
