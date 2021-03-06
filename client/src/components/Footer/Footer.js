//Dependencies
import React from 'react';
import { Container, Image, List, Divider, Icon } from 'semantic-ui-react'

//Assets
import logo from '../../assets/images/pb_logo_grey.png';
import github from '../../assets/images/GitHub-logo.png';

//CSS
import './Footer.css'

const Footer = () => {

  return (
    <div className='footer'>
      <Container textAlign='center'>
        <Divider section hidden />
        <List horizontal>
          <List.Item><a href='https://github.com/pauline-ann/blog-react' target='_blank' rel='noopener noreferrer'><Image src={github} size='mini' centered /></a></List.Item>
          <List.Item><a href='https://www.paulineann.me/' target='_blank' rel='noopener noreferrer'><Image src={logo} size='mini' centered /></a></List.Item>
        </List>
        <br/>
        <List horizontal>
          <List.Item>Designed and Developed by <a href='https://www.linkedin.com/in/pauline-ann/' target='_blank' rel='noopener noreferrer'>Pauline Ann Bantayan</a> — <a href='https://reactjs.org/'>Powered by React<Icon name='react'/></a> — © 2019-2021</List.Item>
        </List>
      </Container>
    </div>
  );
}

export default Footer;