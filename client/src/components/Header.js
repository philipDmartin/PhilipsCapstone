import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" >
        <NavbarBrand tag={RRNavLink} to="/">Moo-V</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/reviews">Reviews</NavLink>
              </NavItem>
            }
          </Nav> 

          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/userreviews">My Reviews</NavLink>
              </NavItem>
            }
          </Nav>

          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to={`/profile/${userProfile.id}`}>Profile</NavLink>
              </NavItem>
            }
            </Nav>

            <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/favoritePosts">FavoritePost</NavLink>
              </NavItem>
            }
          </Nav> 

          {/* <Nav className="mr-auto" navbar>
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/userposts">My Posts</NavLink>
              </NavItem>
            }
          </Nav> */}

          {/* <Nav className="mr-auto" navbar> */}
            { /* When isLoggedIn === true, we will render the Home link */}
            {/* {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/posts/add">New Post</NavLink>
              </NavItem>
            }
          </Nav>

          <Nav className="mr-auto" navbar>
            {isLoggedIn && userProfile.userTypeId === 1 &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/categories">Categories</NavLink>
              </NavItem>
            }
          </Nav>

          <Nav className="mr-auto" navbar>
            {isLoggedIn && userProfile.userTypeId === 1 &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/tags">Tags</NavLink>
              </NavItem>
            }
          </Nav> */}

          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
