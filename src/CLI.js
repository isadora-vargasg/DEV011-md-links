#! /usr/bin/env node
const { mdLinks } = require('./index');
//Ejecutable

console.log(process.argv);

const validateLinks = process.argv.includes("--validate")
// console.log('Soy el process argv: ', process.argv);
const route = process.argv[2]
console.log(validateLinks, route);

// const response = mdLinks('docs/01-milestone.md')
// console.log(response);

mdLinks(route, validateLinks).then(linksArray => console.log(linksArray))
.catch(err => console.log("Error", err))
// .then(res => console.log("Respuesta", res))
// .catch(err => console.log("Error", err))