const fs = require('fs');
const path = require('path');
const { isAbsolutePath, existsPath, isMarkdownFile, } = require("../src/function.js");

jest.mock('fs');

//Test de la función que comprueba si la ruta es absoluta
test('Debe retornar TRUE si la ruta es absoluta', () => {
  expect(isAbsolutePath('/absolute/path')).toBe(true);
  expect(isAbsolutePath('C:\\Users\\username\\file.txt')).toBe(true);
});

test('Debe retornar FALSE si la ruta es relativa', () => {
  expect(isAbsolutePath('relative/path')).toBe(false);
  expect(isAbsolutePath('./file.txt')).toBe(false);
});

//Test de la función que comprueba si la ruta existe
describe('existsPath function', () => {
  it('Debe retornar TRUE si la ruta existe', () => {
      fs.existsSync.mockReturnValueOnce(true);
      const existingPath = '/path/to/existing/file.txt';
      expect(existsPath(existingPath)).toBe(true);
      expect(fs.existsSync).toHaveBeenCalledWith(existingPath);
  });

  it('Debe retornar FALSE si la ruta existe', () => {
      fs.existsSync.mockReturnValueOnce(false);
      const nonExistingPath = '/path/to/non_existing/file.txt';
      expect(existsPath(nonExistingPath)).toBe(false);
      expect(fs.existsSync).toHaveBeenCalledWith(nonExistingPath);
  });
});
