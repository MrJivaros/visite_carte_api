const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config({
    path: '../config/.env'
})

const bcrypt = require('bcrypt')

maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({
            id
        },
        process.env.TOKEN_KEY, {
            expiresIn: maxAge
        }
    )
}


module.exports.signUp = async (req, res) => {
    const {
        password,
        fullname,
        email,
        telephone,
        
    } = req.body
    try {
        await userModel.create({
                password,
                fullname,
                email,
                telephone,
            },
            (err, docs) => {
               if(!err){
					res.status(201).json({
						status:true,
						content: docs
					})
			   } 
                else{
					res.status(401).json({
						status:false,
						content:err
					})
				}
            }
        )

    } catch (err) {
        // const error = signUpErrors(err)
        res.status(400).json({
            status: false,
            content: err

        })
    }
}


module.exports.logout = (req, res) => {
    res.cookie('jwt', "", {
        maxAge: 1
    })
    res.redirect('/')
}


module.exports.connexion = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        
        const user = await userModel.findOne({email:email});
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                const token = createToken(user._id)
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge
                })
                res.status(200).json({
                    status: true,
                    content:user,
                    token: token
                })
            } else {
                res.status(404).json({
                    status: false,
                    content: "bad password"
                })
            }

        } else {
            res.status(404).json({
                status: false,
                content: "Veuillez confirmer votre compte"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            content: "erreur du serveur"
        })
    }

}

module.exports.getAll = async (req, res)=>{
    try{
        await userModel.find(
            (err, docs)=>{
                if(!err){
                    res.status(201).json(
                        {
                            status : true,
                            content: docs
                        }
                    )
                }else{
                    res.status(400).json({
                        status: false,
                        content: err
                    })
                }
            }
        )

    }catch(err){
        res.status(401).json(
            {
                status: false,
                content: err
            }
        )
    }
}