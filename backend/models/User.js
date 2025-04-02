const mongoose = require('mongoose');

const bcrypt=require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePic:{
        type: String,
        default:null,
    }},
    { timestamps: true}
);

//Hash the password before saving the user
UserSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});

//compare 
UserSchema.methods.comparePassword = async function(Candidatepassword){
    const user = this;
    return await bcrypt.compare(Candidatepassword,user.password);
};
module.exports=mongoose.model('User',UserSchema);