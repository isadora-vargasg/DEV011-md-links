const fs = require("fs"); //File Sistem Node
const path = requiere('path'); //Paths Node

//True = absolute path & false = relative path
const isAbsolutePath = (relativePath) => {
    return path.isAbsolute(relativePath);
}

//Path relative to path absolute
const absolutePath = (relativePath) => {
    return path.resolve(relativePath)
}


