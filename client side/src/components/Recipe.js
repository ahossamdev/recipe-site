import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstance } from "../config/axiosConfig";
import { useHistory } from "react-router-dom";

const Info = styled.div`
  width: 100%;
  height: 100%;
  z-index: 4;
  position: absolute;
  transition: all 0.7s ease;
  position: absolute;
`;

const Card = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  width: 85%;
  height: 85%;
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: all 0.7s ease;
`;

const Bottom = styled.div`
  flex: 1;
  background-color: #dbdad6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex: 3;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
  &:hover ${Info} {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
  &:hover ${Image} {
    transform: scale(1.2);
  }
`;
const Icon = styled.div`
  margin: 10px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.7s ease;
  &:hover {
    transform: scale(1.2);
  }
`;
const RecipeTitle = styled.h2``;
const Recipe = (props) => {
  const history = useHistory();
  const handleImageClick = () => {
    history.push(`/recipedetails/${props.item._id}`);
  };

  const handleClick = () => {
    axiosInstance
      .delete(`/${props.item._id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    props.handleDelete();
  };
  return (
    <Card>
      <ImageContainer onClick={() => handleImageClick()}>
        <Image
          alt="kebab"
          src={`http://localhost:8080/${props.item.dishImage}`}
        />
        <Info>
          <Icon onClick={() => handleClick()}>
            <DeleteIcon />
          </Icon>
        </Info>
      </ImageContainer>
      <Bottom>
        <RecipeTitle>{props.item.title}</RecipeTitle>
      </Bottom>
    </Card>
  );
};

export default Recipe;
