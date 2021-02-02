//Dependencies
import React from "react";
import { Container, Image, List } from 'semantic-ui-react'

//Assets
import logo from "../assets/images/pb_logo_grey.png";

const Footer = () => {

  const footerStyle = {
    "margin-top": "5em",
    "padding-top": "1em",
    "padding-bottom": "1em",
  }

  return (
    <div style={footerStyle}>
      <Container textAlign="center" fluid>
        <Image src={logo} size="mini" centered /><br/>
        <List horizontal>
          <List.Item content="© 2019-2020 | Pauline Ann Bantayan" />
        </List>
      </Container>
    </div>
  );
}

export default Footer;