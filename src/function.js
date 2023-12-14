const fs = require("fs"); //File Sistem Node
const path = require('path'); //Paths Node
const { JSDOM } = require('jsdom');
const marked = require("marked");

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
    return fs.readFileSync(route, "utf8", (err, data) => {
        // if(err) reject('Error de lectura')
        return data;
    });
    // return new Promise((resolve, reject) => {
    //     fs.readFileSync(route, "utf8", (err, data) => {
    //         if(err) reject('Error de lectura')
    //         resolve(data)
    //     });
    // })
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

module.exports = {
    isAbsolutePath,
    toAbsolutePath,
    existsPath,
    isMarkdownFile,
    readFileContent,
    extractLinks,
}
