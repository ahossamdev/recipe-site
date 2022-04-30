const express = require("express");
const router = express.Router();
const { upload } = require("../imgMulter");
const {
  create,
  find,
  findOne,
  remove,
  update,
} = require("../controller/recipes");

router.get("/recipe", async (req, res) => {
  try {
    const recipes = await find({}, {});
    res.status(200).json(recipes);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/recipe/create", upload.single("dishImage"), async (req, res) => {
  const myRecipe = {
    dishImage: req.file?.path,
    title: req.body.title,
    ingredient: req.body.ingredient,
    recipe: req.body.recipe,
  };
  try {
    const savedRecipe = await create(myRecipe);
    if (
      savedRecipe === "All fields can't be empty!" ||
      savedRecipe === "recipe already exist !"
    ) {
      return res.status(404).json(savedRecipe);
    }
    return res.status(200).json(savedRecipe);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.delete("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const deletedRecipe = await remove(recipeId);
    res.status(200).json(deletedRecipe);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

router.patch("/recipe/:id", upload.single("dishImage"), async (req, res) => {
  const recipeId = req.params.id;
  const recipe = {
    title: req.body.title,
    ingredient: req.body.ingredient,
    recipe: req.body.recipe,
    dishImage: req.file?.path,
  };
  try {
    const updatedRecipe = await update(recipeId, recipe);
    if (updatedRecipe === "All fields can't be empty!") {
      res.status(404).json(updatedRecipe);
    }
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

router.get("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  if (!recipeId) {
    res.status(404).json("Recipe not found !");
  }
  try {
    const recipe = await findOne(recipeId, {});
    res.status(200).json(recipe);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
