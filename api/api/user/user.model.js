/**
 *  User model
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: [true, "Email is required"]
    },
    role: { type: String, default: 'user' },
    password: {
        type: String,
        required: [true, "Pasword is required"]
    }
}, { timestamps: true });

/**
 *  Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            name: this.name,
            role: this.role
        }
    });

// Non-sensituve info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            _id: this._id,
            role: this.role
        }
    });
      
/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    this.password = bcryptjs.hashSync( this.password, salt );
    return next();
  });
      
module.exports = mongoose.model('User', UserSchema);