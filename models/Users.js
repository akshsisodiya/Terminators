const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");

const users = Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
<<<<<<< HEAD
        type: String,
    },
    lastName: {
        type: String,
=======
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
>>>>>>> 22f250ebacf381adcc89a05df8e33c305473add5
    },
    image: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// users.methods.generateJWT = function(){
//     const token = jwt.sign({
//         _id: this._id,
//         number: this.number
//     }, process.env.JWT_SECERET_KEY, {expiresIn: "7d"})
//     return token
// }

module.exports.User = model("User", users);
