import styled from "styled-components";
import { useState, useEffect } from "react";
import Recipe from "./Recipe";
import { axiosInstance } from "../config/axiosConfig";

const Container = styled.div``;
const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 33.33%;
  height: 400px;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 30px;
  font-size: 38px;
  font-weight: 300;
  text-decoration: underline;
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 30px;
`;

const Recipes = () => {
  const [recipe, setRecipes] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (item) => {
    setRecipes(recipe.filter((e) => e._id !== item._id));
  };
  return (
    <Container>
      <Title>MY RECIPES</Title>
      <Wrapper>
        {recipe.map((item, index) => (
          <CardWrapper key={item._id}>
            <Recipe
              item={item}
              index={index}
              handleDelete={() => handleDelete(item)}
            />
          </CardWrapper>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Recipes;
