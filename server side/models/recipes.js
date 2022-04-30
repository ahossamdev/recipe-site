const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, lowercase: true },
    ingredient: { type: String, required: true },
    recipe: { type: String, required: true },
    dishImage: { type: String},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Recipe", recipeSchema);
