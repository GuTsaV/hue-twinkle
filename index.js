const axios = require('axios');

lights = (process.argv.slice(2)).map((v) => parseInt(v));
console.log(lights);
