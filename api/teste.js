const crypto = require('crypto')

var hash = crypto.createHmac('sha512', '7986dee94e0e0d984b3395c728a87b232821a4176759')
hash.update('123abcABC@@@')
console.log(hash.digest('hex'))
