//Dependencies
import React from "react";
import { Menu, Image, Breadcrumb, Container } from 'semantic-ui-react'
import { Link, NavLink } from "react-router-dom";

//Assets
import logo from "../../assets/images/ramen-icon.png";

//CSS
import "./Navbar.css";

const Navbar = () => {

  return (
    <div>
      <Container>
        <Menu top="true" inverted className="Navbar-menu">
          <Menu.Item fixed="true" as={Link} to="/" className="Navbar-menu-item">
            <Image size="mini" src={logo} />
          </Menu.Item>
          <Menu.Item> 
            <Link to={"/"}><h1 className='Navbar-header'>foodie</h1></Link>
          </Menu.Item>
          <Menu.Menu>
            <Menu.Item fixed="true" position="left">
              <Breadcrumb>
                <Breadcrumb.Section as={NavLink} exact activeClassName="active" to="/about" className="Navbar-navlink">About Foodie</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section as={NavLink} exact activeClassName="active" to="/dashboard" className="Navbar-navlink">Dashboard</Breadcrumb.Section>
              </Breadcrumb>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </div>
  );
}

export default Navbar;