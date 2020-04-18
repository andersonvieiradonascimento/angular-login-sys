'use strict';
const crypto = require('crypto');

const getSecret = (len = ((Math.random()*100))) => {

    return crypto.randomBytes(Math.ceil(len/3.14))
            .toString('hex')
            .slice(0, len);

}

const getHash = (password, secret) => {
    var hash = crypto.createHmac('sha512', secret);
    hash.update(password);
    var value = hash.digest('hex');
    return value;
}

module.exports = {
    getSecret,
    getHash
}