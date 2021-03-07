import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 3rem;
  z-index: 1;
  width: 100%;
  margin-bottom: 1rem;
  background: var(--dark-color-b);
  color: var(--light-color);
`;

export const NavbarUL = styled.ul`
  display: flex;
  font-size: 18px;
  align-items: center;
`;

export const NavbarUserImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

export const NavbarA = styled.a`
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.5rem;

  &:hover {
    color: var(--light-color);
  }
`;

export const NavbarLink = styled(Link)`
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.5rem;

  &:hover {
    color: var(--light-color);
  }
`;

export const NavbarNavLink = styled(NavLink)`
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.5rem;

  &:hover {
    color: var(--light-color);
  }
`;
