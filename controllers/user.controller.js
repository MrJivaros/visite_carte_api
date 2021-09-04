const userModel = require('../models/user.model')
const adminModel = require('../models/admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectID = require('mongoose').Types.ObjectId
const mongoose = require('mongoose')
module.exports.getAllUsers = async (req, res) => {
    try {
        const token = String(req.headers.authorization).split(' ')[1] || req.cookies.jwt
        const users = await userModel.find().select("-password")
        if (token) {
            jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
                await adminModel.findById({ _id: decodedToken.id }, async (error, docs) => {
                    if (!error && docs.privilege && docs.privilege == "1") {
                        res.status(201).json({
                            status: true,
                            content: users
                        })
                    } else {
                        res.status(401).json({
                            status: false,
                            content: "Vous avez pas le droit d'accès a ses informations"
                        })
                    }

                })

            })
        } else {
            res.status(400).json({
                status: false,
                content: " Veuillez vous connecter"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            content: "Erreur de recuperation"
        })
    }

}

module.exports.getUser = async (req, res) => {
    const token = req.cookies.jwt || String(req.headers.authorization).split(' ')[1]
    if (token) {
        const userID = req.params.id
        try{
            userModel.findOne(
                {_id:userID},
                (err,docs)=>{
                    if(!err){
                        res.status(200).json({
                            status:true,
                            content:docs
                        })
                    }else{
                        res.status(400).json({
                            status:false,
                            content: "Invalide ID"
                        })
                    }
                }
            )
        }catch(e){
            res.status(400).json({
                status:false,
                content:'Invalide ID'
            })
        } 
    } else {
        res.status(404).json({
            status: false,
            content: "Pas de token l'utilisateur n'est pas connecté"
        })
    }

}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(200).json({
            status: false,
            content: "ID uknow:" + req.params.id
        })
    try {
        const whatsapp = req.body.whatsapp
        const localisation = req.body.localisation
        const fullname = req.body.fullname
        const city = req.body.city
        const country = req.body.country
        let userUpdateInfo = {}
        if(req.body.password){
            const salt = await bcrypt.genSalt();
            let password = await bcrypt.hash(req.body.password, salt)
            userUpdateInfo={
                password,
                whatsapp,
                localisation,
                fullname,
                city,
                country
            }
            
        }else{
            userUpdateInfo=req.body
        }
        

        await userModel.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { ...userUpdateInfo } },
            { new: true },
            (err, docs) => {
                if (!err) {
                    res.status(200).json({
                        status: true,
                        content: docs

                    })
                } else {
                    return res.status(200).json({
                        status: false,
                        content: err

                    })
                }
            }
        ).select('-password')

    } catch (err) {
        return res.status(200).json({
            status: false,
            content: err

        })
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(200).json({
            status: false,
            content: "ID uknow:" + req.params.id

        })
    try {

        await userModel.findByIdAndRemove({ _id: req.params.id }, (err, docs) => {
            if (!err) {
                res.status(200).json({
                    status: true,
                    content: "user : " + req.params.id + " is remove successfuly"
                })
            }
            else {
                res.status(200).json({
                    status: false,
                    content: err

                })
            }
        })

    } catch (err) {
        res.status(200).json({
            status: false,
            content: err

        })
    }

}

module.exports.dropCollection = async (req, res) => {
    let db = mongoose.connection
    await db.dropDatabase()
    res.status(200).json({
        status:true,
        content:'drop'
    })
}

module.exports.getMe = async (req, res) => {
    const token = req.cookies.jwt || String(req.headers.authorization).split(' ')[1]
    console.log(token)
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, async (err, decotedToken) => {
            try {
                const user = await userModel.findById({
                    _id:decotedToken.id
                }).select('-password')
                res.status(200).json({
                    status: true,
                    content: user
                })
            } catch (err) {
                res.status(404).json({
                    status: false,
                    content: err

                })
            }
        })
    } else {
        res.status(404).json({
            status: false,
            content: "Pas de token l'utilisateur n'est pas connecté"
        })
    }

}