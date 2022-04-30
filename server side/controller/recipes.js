const Recipe = require("../models/recipes");

const create = async (recipes) => {
  const { title, ingredient, recipe, dishImage } = recipes;
  const isExistRecipe = await Recipe.findOne({ title });

  if (!title || !ingredient || !recipe || !dishImage) {
    return "All fields can't be empty!";
  } else if (isExistRecipe) {
    return "recipe already exist !";
  } else {
    return Recipe.create(recipes);
  }
};

const update = (recipeId, newData) => {
  if (!recipeId || !newData) {
    return "All fields can't be empty!";
  }
  return Recipe.findByIdAndUpdate(recipeId, newData, {
    new: true,
    runValidators: true,
  });
};

const remove = (recipeId) => {
  return Recipe.findByIdAndDelete(recipeId);
};

const find = (query, projection) => {
  return Recipe.find(query, projection);
};

const findOne = (recipeId, projection) => {
  return Recipe.findById(recipeId, projection);
};

module.exports = { create, update, remove, find, findOne };
