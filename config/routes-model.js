const db = require('../database/dbConfig.js')

module.exports = {
    find,
    add,
    remove,
    findById

}


function findById(id) {
    return db('users').where({id: id}).first()
}

async function add(user) {
    const [id] = await db('users').insert(user)

    return findById(id)
}