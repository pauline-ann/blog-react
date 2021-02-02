//Dependencies
import React from "react";
import { Container, Image, List, Divider } from 'semantic-ui-react'

//Assets
import logo from "../assets/images/pb_logo_grey.png";

const Footer = () => {

  const footerStyle = {
    "margin-top": "3em",
    "padding-top": "1em",
    "padding-bottom": "1em",
  }

  return (
    <div style={footerStyle}>
      <Container textAlign="center">
        <Divider /><br/>
        <a href='https://www.paulineann.me/' target='_blank'><Image src={logo} size="mini" centered /></a><br />
        <List horizontal>
          <List.Item>Designed and Developed by <a href='https://www.linkedin.com/in/pauline-ann/' target='_blankl'>Pauline Ann Bantayan</a> — <a href='google.com'>Powered by React.js</a> — © 2019-2020</List.Item>
        </List>
      </Container>
    </div>
  );
}

export default Footer;