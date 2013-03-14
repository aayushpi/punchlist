var mongoose   = require( 'mongoose' )
,   userSchema = mongoose.Schema({
      userId: Number,
      displayName: String,
      username: String,
      punches: { type: Number, default: 0}
})

,  UserModel      = mongoose.model( 'user', userSchema);
module.exports = UserModel;


