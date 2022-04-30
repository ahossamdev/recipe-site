import styled from "styled-components";
import { Button } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { axiosInstance } from "../config/axiosConfig";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 40px 0px 20px 20px;
  font-size: 25px;
  font-weight: 300;
  text-decoration: underline;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

const Left = styled.div`
  flex: 1;
  height: 400px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  border-radius: 50%;
  width: 200px;
  height: 200px;
  transition: all 0.7s ease;
  object-fit: cover;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const ImgInput = styled.input`
  margin-top: 20px;
`;

const Right = styled.form`
  flex: 2;
  height: 400px;
`;

const InputWrapper = styled.div`
  width: 50%;
  display: flex;
  margin: 15px;
  justify-content: space-between;
`;

const InputTitle = styled.h2`
  font-weight: 200;
`;

const Input = styled.input`
  outline: none;
  width: 300px;
  border: 1px solid;
`;
const TextArea = styled.textarea`
  outline: none;
  width: 300px;
  border: 1px solid;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const EditRecipe = () => {
  const params = useParams();
  const history = useHistory();
  const [editableRecipe, setEditableRecipe] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    ingredient: "",
    recipe: "",
    dishImage: "",
  });
  const [formValuesErr, setFormValuesErr] = useState({
    titleErr: null,
    ingredientErr: null,
    recipeErr: null,
  });
  const imgTypes = ["image/png", "image/jpeg"];
  const [previewImg, setPreviewImg] = useState(null);
  const [previewImgErr, setPreviewImgErr] = useState("");
  const [backEndMsg, setBackEndMsg] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/${params.id}`)
      .then((res) => setEditableRecipe(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFormChange = (e) => {
    switch (e.target.name) {
      case "title":
        setFormValues({ ...formValues, title: e.target.value });
        setFormValuesErr({
          ...formValuesErr,
          titleErr: e.target.value.length === 0 ? "Title is required !" : null,
        });
        break;
      case "ingredient":
        setFormValues({ ...formValues, ingredient: e.target.value });
        setFormValuesErr({
          ...formValuesErr,
          ingredientErr:
            e.target.value.length === 0 ? "Ingredient is required !" : null,
        });
        break;
      case "recipe":
        setFormValues({ ...formValues, recipe: e.target.value });
        setFormValuesErr({
          ...formValuesErr,
          recipeErr:
            e.target.value.length === 0 ? "Recipe is required !" : null,
        });
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    let selectedFile = e.target.files[0];
    setFormValues({ ...formValues, dishImage: selectedFile });
    if (selectedFile) {
      if (selectedFile && imgTypes.includes(selectedFile.type)) {
        setPreviewImg(URL.createObjectURL(selectedFile));
        setPreviewImgErr("");
      } else {
        setPreviewImg(null);
        setPreviewImgErr("please select valid image type !");
      }
    } else {
      console.log("select your file ");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formValuesErr.titleErr &&
      !formValuesErr.ingredientErr &&
      !formValuesErr.recipeErr
    ) {
      const form = new FormData();
      form.append("title", formValues.title);
      form.append("ingredient", formValues.ingredient);
      form.append("recipe", formValues.recipe);
      form.append("dishImage", formValues.dishImage);
      axiosInstance
        .patch(`/${params.id}`, form)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => setBackEndMsg(err.response.data));
      history.push("/recipes");
    }
  };

  return (
    <Container>
      <Navbar />
      <Title>Edit Recipe</Title>
      <Wrapper>
        <Left>
          <ImageWrapper>
            <ImageContainer>
              <Image
                src={
                  previewImg
                    ? previewImg
                    : `http://localhost:8080/${editableRecipe.dishImage}`
                }
              />
            </ImageContainer>
            <ErrorMessage>
              {previewImgErr ? <p>{previewImgErr}</p> : null}
            </ErrorMessage>

            <ImgInput
              type="file"
              name="dishImage"
              placeholder="upload image"
              onChange={(e) => handleImageChange(e)}
            />
          </ImageWrapper>
        </Left>
        <Right onSubmit={(e) => handleSubmit(e)}>
          <InputWrapper>
            <InputTitle>Title: </InputTitle>
            <Input
              name="title"
              placeholder={
                editableRecipe.title ? editableRecipe.title : "title"
              }
              onChange={(e) => handleFormChange(e)}
              value={formValues.title}
            />
          </InputWrapper>
          <ErrorMessage>
            {formValuesErr.titleErr ? <p>{formValuesErr.titleErr}</p> : null}
          </ErrorMessage>

          <InputWrapper>
            <InputTitle> Ingredient: </InputTitle>
            <Input
              name="ingredient"
              placeholder={
                editableRecipe.ingredient
                  ? editableRecipe.ingredient
                  : "ingredient"
              }
              onChange={(e) => handleFormChange(e)}
              value={formValues.ingredient}
            />
          </InputWrapper>
          <ErrorMessage>
            {formValuesErr.ingredientErr ? (
              <p>{formValuesErr.ingredientErr}</p>
            ) : null}
          </ErrorMessage>
          <InputWrapper>
            <InputTitle>Recipe: </InputTitle>
            <TextArea
              name="recipe"
              placeholder={
                editableRecipe.recipe ? editableRecipe.recipe : "recipe"
              }
              onChange={(e) => handleFormChange(e)}
              value={formValues.recipe}
              rows="3"
            />
          </InputWrapper>
          <ErrorMessage>
            {formValuesErr.recipeErr ? <p>{formValuesErr.recipeErr}</p> : null}
          </ErrorMessage>
          <Button
            type="submit"
            style={{
              width: "fit-content",
              fontSize: "16px",
              margin: "15px 0px 0px 30px",
            }}
            variant="outlined"
            size="small"
            disabled={
              formValuesErr.titleErr ||
              formValuesErr.ingredientErr ||
              formValuesErr.recipeErr ||
              previewImgErr
            }
          >
            Edit Recipe
          </Button>
          {backEndMsg ? <ErrorMessage> {backEndMsg} </ErrorMessage> : null}
        </Right>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default EditRecipe;
