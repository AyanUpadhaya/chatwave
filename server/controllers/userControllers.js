//import model in cotroller
const User = require('../model/userModel');

//for password hashing import
const bcrypt = require('bcrypt');
//register controller
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        //check if user already exists
        const userNameCheck = await User.findOne({ username });
        if (userNameCheck) {
            return res.json({ msg: "Username already used", status: false })
        }
        //check if email already exist
        const userEmailCheck = await User.findOne({ email });
        if (userEmailCheck) {
            return res.json({ msg: "Email already exists", status: false });
        }
        //if everything is ok then hash password
        const hashPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            email,
            username,
            password: hashPassword,
        })

        //return info to the client
        delete user.password;
        return res.json({ status: true, user })
    }catch(exception){
        next(exception)
    }


}

//login controller
const login = async (req, res, next) => {
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.json({msg:"Incorrect username or password",status:false})
    }

    //check password
    const isPasswordAvailable = bcrypt.compare(password,user.password)

    if(!isPasswordAvailable){
        return res.json({msg:"Incorrect username or password",status:false})
    }
    delete user.password;
    return res.json({ status: true, user })
}

module.exports = {
    register,
    login
}