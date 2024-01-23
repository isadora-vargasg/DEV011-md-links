#! /usr/bin/env node
const { mdLinks } = require('./index');//importa funcion mdLinks desde el index.js
//Ejecutable

console.log(process.argv);//el process.argv contiene los argumentps de la linea de comando 
//es un array en el que el primer elemento es la ruta del ejecutable de Node.js
//el segundo elemento es la ruta del script que se está ejecutando 
//y los elementos subsiguientes son los argumentos de la línea de comandos

const validateLinks = process.argv.includes("--validate")//verifica si el argumento --validate está presente en process.argv
const route = process.argv[2]
console.log(validateLinks, route);

// const response = mdLinks('docs/01-milestone.md')
// console.log(response);

mdLinks(route, validateLinks).then(linksArray => console.log(linksArray))//llama a la función mdLinks con una ruta y la opción de validate
.catch(err => console.log("Error", err))//si todo sale bien devuelve el array de objetos con la información solicitada, sino un mensaje de error
