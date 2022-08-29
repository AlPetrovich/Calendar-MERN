const { response } = require('express');

const createUser = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'registro'
    })
}

// endpoints de remover, crear y login


module.exports = {
    createUser
}