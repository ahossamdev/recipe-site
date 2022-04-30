import styled from "styled-components";
import { Search } from "@mui/icons-material";
import { Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { mobile } from "../Responsive";

const Navbar = () => {
  const Container = styled.div`
    height: 60px;
    background-color: #dbdad6;
  `;
  const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
  `;

  const Center = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
  `;
  const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "18px", textAlign: "right" })};
  `;
  const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `;
  const MenuItem = styled.div`
    font-size: 16px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "18px", textAlign: "left" })};
  `;
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>Recipe blog.</Logo>
        </Left>
        <Center>
          <MenuItem>
            <Link
              style={{ textDecoration: "inherit", color: "inherit" }}
              to="/recipes"
            >
              Recipes
            </Link>
          </MenuItem>
        </Center>
        <Right>
          <MenuItem>
            <Link
              style={{
                textDecoration: "inherit",
                width: "fit-content",
                color: "inherit",
              }}
              to="/createrecipe"
            >
              Create Recipe
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
