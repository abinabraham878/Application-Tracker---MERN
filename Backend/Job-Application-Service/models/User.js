const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
}, 
{ timestamps: true });

// Hash the password before saving the user
UserSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch(err){
        return next(err);
    }
});

// Compare the password
UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);