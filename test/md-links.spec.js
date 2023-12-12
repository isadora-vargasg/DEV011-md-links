const { mdLinks }  = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('path not validate', () => {
    return mdLinks('/noExiste.md').catch((error) => {
      expect(error).toBe("La ruta no existe")
    })
  });
});

// describe('mdLinks function', () => {
//   test('should return a promise', () => {
//     const result = mdLinks('path', 'options');
//     expect(result).toBeInstanceOf(Promise);
//   });
// });
