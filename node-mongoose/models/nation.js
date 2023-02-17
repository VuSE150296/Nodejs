const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

var nationSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

var Nations = mongoose.model("nations", nationSchema);
module.exports = Nations;
