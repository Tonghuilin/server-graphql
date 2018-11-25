const SHA256 = require('crypto-js/sha256');

const getHash = (index = 2) => SHA256(process.argv[index]).toString();

console.log(getHash(), getHash(3), getHash() === getHash(3));
