const userModel = require('../models/user.model')
const adminModel = require('../models/admin.model')
const jwt = require('jsonwebtoken')
const machineModel = require('../models/machine.model')
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt || String(req.headers.authorization).split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                res.cookie('jwt', '', { maxAge: 1 })
                next()
            } else {
                let user 
                try{
                    user= await userModel.findById(decodedToken.id)
                    res.locals.user = user

                }catch(err){
                    user= await machineModel.findById(decodedToken.id)
                    res.locals.user = user
                }
                next()
            }
        })
    } else {
        console.log('user not logged in')
        next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt || String(req.headers.authorization).split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
            if (err) {  
                res.status(401).json({
                    status: false,
                    content: err
                })
            } else {
               
                next()
            }
        })

    } else {
        res.status(401).json({
            status: false,
            content: 'utilisateur non connecté'
        })
        console.log('user not logged in')
    }
}

module.exports.security = (req, res,next)=>{
    const token = req.cookies.jwt || String(req.headers.authorization).split(' ')[1]
    if(token){
        jwt.verify(token, process.env.TOKEN_KEY, async(err,decotedToken)=>{
            try{
                await adminModel.findById({_id: decotedToken.id},(err,docs)=>{
                    if(!err && docs.privilege && docs.privilege==1){
                        console.log("autorisé")
                        next()
                    }else{
                        res.status(401).json({
                            status:false,
                            content:'Non autorisé'
                        })
                        console.log("Non autorisé")
                    }
                })

            }catch(error){
                console.log("user connected")
            }
        })
    }else{
        res.status(401).json({
            status:false,
            content:'utilisateur non connecté'
        })
        console.log("utilisateur non connecté")
    }
}

