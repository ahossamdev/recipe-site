import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact component={Home}></Route>
          <Route path={"/recipes"} exact component={Home}></Route>
          <Route path={"/createrecipe"} exact component={CreateRecipe}></Route>
          <Route path={"/editrecipe/:id"} exact component={EditRecipe}></Route>
          <Route
            path={"/recipedetails/:id"}
            exact
            component={RecipeDetails}
          ></Route>
          <Route path={"*"} exact component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
