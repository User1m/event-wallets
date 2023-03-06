// https://gist.github.com/therightstuff/9f83967b9c23354a27ed691a6b591b0c
const BigNumber = require('bignumber.js');
// import BigNumber from 'bignumber';

const id = 'b64c5f74-4b45-40f3-b36c-2c1e9663b5c2';

export const convertGuidToInt = (id) => {
  // remove the dashes from the given uuid and convert to a hexadecimal BigNumber object
  const bn = new BigNumber(id.replace(/-/g, ''), 16);
  // return the string representation of the BigNumber object as a decimal
  return bn.toString(10);
};

// const int = convertGuidToInt(id);
// console.log("int", int);

export const convertIntToGuid = (num) => {
  // convert the string representation of the decimal number to a BigNumber object
  const bn = new BigNumber(num, 10);
  // convert the BigNumber to a hexadecimal string
  const id = bn.toString(16);
  // return the string with the dashes (8-4-4-4-12)
  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16, 4)}-${id.substr(20)}`;
};

// const uuid = convertIntToGuid(int);
// console.log("uuid", uuid);

// int 242316045836777632676711398808299484610
// uuid b64c5f74-4b45-40f3-b36c-2c1e9663b5c2
