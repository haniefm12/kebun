import User from "../models/user.js";

//login user
const loginUser = async (req, res)=> {
    res.json({mssg: 'login user'})
};


//signup user?
const signupUser = async (req, res)=> {
    const {name, email, password, phoneNumber, role, image } = req.body
    try{
        const user = await User.signup(name, email, password, phoneNumber, role, image)
        res.status(200).json({email,user})
    } catch(error){
        res.status(400).json({error: error.message})
    }
};
    


//export?
export { loginUser, signupUser };


