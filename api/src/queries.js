const Pool = require('pg').Pool;
const jwt = require('jsonwebtoken');
const fs = require('file-system');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testedb',
    password: 'admin', 
    port: 5432
});

const utils = require('./utils/index.js');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error){
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const getUserByEmailOrNickname = (request, response) => {
    const content = request.params.content;
    const param1 = content.split(' ')[0];
    const param2 = content.split(' ')[1];

    pool.query(`SELECT DISTINCT * FROM users 
                WHERE email LIKE $1 OR nickname LIKE $2`
                , [param1, param2], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const createUser = (request, response) => {
    const { name, nickname, nickreal, email, password } = request.body;
    const secret = utils.getSecret();
    const hash = utils.getHash(password, secret);
    var queryString = `
        INSERT INTO users (name, nickname, nickreal, email, secret, hash)
        VALUES ($1, $2, $3, $4, $5, $6)
    `
    pool.query(queryString, 
        [name, nickname, nickreal, email, secret, hash], (error, results) => {
        if(error){
            throw error;
        }
        response.status(201).send(results);
    });
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(results);
    })
}

const authLogin = (request, response) => {
    const {userinfo, password} = request.body;
    const privateKey = fs.readFileSync('jwtRS256.key');
    jwt.sign({info: userinfo, pass: password}, privateKey, {algorithm: 'RS256'}, (err, token) => {
        if(err){
            throw err;
        }
        return response.status(200).send({access_token : token});
    });
}

module.exports = {
    getUsers,
    getUserByEmailOrNickname,
    createUser,
    updateUser,
    deleteUser,
    authLogin
}