import bcrypt from 'bcryptjs'
import Person from "../authModel/Person.js";
import jwt from "jsonwebtoken"
import config from "config"

class authController {
    async registration(req, res) {
        try {
            const {username, password} = req.body;
            const candidate = await Person.findOne({username});
            if (candidate) return res.status(409).json({message: "a user with the same name is already registered"})
            if (!username && !password) return res(400).json({message: 'login and password are empty strings'})
            const hashPass = bcrypt.hashSync(password, 7);
            const user = new Person({username, password: hashPass})
            await user.save();
            return res.status(201).json({message: "the user has been successfully registered"})
        } catch (e) {
            res.status(400).json({message: "registration error"});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await Person.findOne({username});
            if(!user) return res.status(401).json({message: "cannot find a user with this login"})

            const validPass = bcrypt.compareSync(password, user.password);
            if(!validPass) return res.status(401).json({message: "wrong password"})

            const token = jwt.sign({_id: user._id}, config.get('secretKey'), {expiresIn: '3d'});
            return res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    username: user.username
                }
            })
        } catch (e) {
            res.status(401).json({message: 'authorization error'});
        }
    }

    async me(req, res) {
        const user = await Person.findOne({_id: req.user._id});
        if(!user) return res.status(401).json({message: "cannot find a user with this login"})

        const token = jwt.sign({_id: user._id}, config.get('secretKey'), {expiresIn: '3d'});
        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username
            }
        })
    }

    // async getUsers(req, res) {
    //     try {
    //         res.json("it's work")
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }
}

export default new authController();