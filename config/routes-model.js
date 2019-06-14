const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findById,
    findBy

}


function findById(id) {
    return db('users').where({id: id}).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}

function findBy(filter) {
    return db('users').where(filter) //returns the users where username = username
}

