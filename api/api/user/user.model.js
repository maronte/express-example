/**
 *  User model
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryptjs = require('bcryptjs');

const AdditionalDataSchema = new Schema({
    address: { type: String, uppercase: true },
    phoneNumber: { type: String },
    country: { type: String, default: "MÉXICO", uppercase: true },
    city: { type: String, default: "CDMX", uppercase: true },
    language: { type: String, default: "ES", uppercase: true },
    timezone: { type: String, default: "America/Mexico_City" },
    picture: { type: String, lowercase: true, trim: true }
});

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
    },
    additionalData: AdditionalDataSchema,
    provider: String,
    salt: String,
    google: {},
    github: {},
    passwordResetToken: String,
    passwordResetExpires: Date 
}, { timestamps: true });

UserSchema
    .path('role')
    .validate(value => /admin|manager|user/i.test(value), 'role, assigned role is invalid');

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
 *  Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {    
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
UserSchema
    .path('password')
    .validate(function(password) {    
        return password.length; 
    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(async function(value) {    
      const user = await this.constructor.findOne({email: value}).exec();
      if (user) {
        if (this.id === user.id) {
            return true;
        }
        return false;
      }
      return true;  
    }, 'The specified email address is already in use');

const validatePresenceOf = function (value) {
    return value && value.length;
  };
      
/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    // Handle new/update passwords
    if (!this.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(this.password)) {
      return next();
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    this.password = bcryptjs.hashSync( this.password, salt );
    return next();
  });
      
module.exports = mongoose.model('User', UserSchema);