import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { mobile } from "../Responsive";

const Container = styled.div`
  display: flex;
  background-color: gainsboro;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  height: 40px;
  width: 40px;
  color: white;
  border-radius: 50%;
  background-color: #${(props) => props.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Recipe blog,</Logo>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          pretium egestas varius. Nam ac mauris nec nisl tristique faucibus. Nam
          vulputate odio eget elit faucibus, sed sagittis magna rhoncus.
        </Desc>
        <SocialContainer>
          <SocialIcon bg={"129af6"}>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon bg={"e6650f"}>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon bg={"0a66c2"}>
            <LinkedInIcon />
          </SocialIcon>
          <SocialIcon bg={"111"}>
            <GitHubIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Dish</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Whishlist</ListItem>
          <ListItem>Terms</ListItem>
          <ListItem>Conditions</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon style={{ color: "teal", marginRight: "10px" }} />
          31 Salah Salem , Egypt 95010
        </ContactItem>
        <ContactItem>
          <PhoneEnabledIcon style={{ color: "teal", marginRight: "10px" }} />
          (20) - 102 5359 797
        </ContactItem>
        <ContactItem>
          <AlternateEmailIcon style={{ color: "teal", marginRight: "10px" }} />
          ahossamdev@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
