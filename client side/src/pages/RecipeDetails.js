import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosInstance } from "../config/axiosConfig";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Button } from "@mui/material";

const Container = styled.div``;
const Title = styled.h1`
  font-size: 25px;
  font-weight: 300;
  text-align: center;
  padding: 30px;
`;
const Wrapper = styled.div`
  height: 400px;
  display: flex;
  padding: 20px;
`;
const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 80%;
  padding: 20px;
`;
const Left = styled.div`
  flex: 1;
`;
const Image = styled.img`
  position: absolute;
  width: 80%;
  object-fit: cover;
`;
const Right = styled.div`
  margin-top: 20px;
  flex: 2;
`;
const Info = styled.div`
  width: 500px;
  padding: 30px;
  display: flex;
  flex-flow: column;
  overflow-wrap: break-word;
`;
const Recipe = styled.h2`
  font-weight: 300;
  overflow-wrap: break-word;
  margin-left: 15px;
  width: 500px;
`;
const InfoWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Tags = styled.h2``;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
`;

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const params = useParams();
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get(`/${params.id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = () => {
    history.push(`/editrecipe/${params.id}`);
  };
  const handleDelete = () => {
    axiosInstance
      .delete(`/${params.id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    history.push("/recipes");
  };

  return (
    <Container>
      <Navbar />
      <Title>Recipe Details</Title>
      <Wrapper>
        <Left>
          <ImageWrapper>
            <Image src={`http://localhost:8080/${recipe.dishImage}`} />
          </ImageWrapper>
        </Left>
        <Right>
          <Info>
            <InfoWrapper>
              <Tags>Title:</Tags>
              <Recipe>{recipe.title}</Recipe>
            </InfoWrapper>
            <InfoWrapper>
              <Tags>Ingredient:</Tags>
              <Recipe>{recipe.ingredient}</Recipe>
            </InfoWrapper>
            <InfoWrapper>
              <Tags>Recipe:</Tags>
              <Recipe>{recipe.recipe}</Recipe>
            </InfoWrapper>
            <Buttons>
              <Button
                style={{ width: "fit-content", fontSize: "14px" }}
                variant="contained"
                size="small"
                onClick={() => handleEdit()}
              >
                Edit
              </Button>
              <Button
                style={{
                  width: "fit-content",
                  backgroundColor: "crimson",
                  fontSize: "14px",
                }}
                variant="contained"
                size="small"
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Buttons>
          </Info>
        </Right>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default RecipeDetails;
