import React from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  NavLink,
} from 'reactstrap';
import { isLogout } from '../../redux/actions';

const logout = () => { localStorage.clear(); };


const Header = (props) => {
  const { auth, statusUser } = props;
  // console.log(props.statusUser);
  
  const url = `/personal/${statusUser}`
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">MedicalTODO</NavbarBrand>
        <Nav className="mr-auto" navbar />
        <Nav />
        {
          auth && <NavLink href={url}><Button  onClick={() => { isLogout(); logout(); }}>Личный кабинет</Button></NavLink>
        }
        {
          auth && <NavLink href="/"><Button color="success" onClick={() => { isLogout(); logout(); }}>Выход</Button> </NavLink>
        }
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) =>{
// console.log('..>',state)
return (
    {
      auth: state.logIn.auth,
      statusUser: state.logIn.statusUser,
    });
  }
const mapDispatchToProps = (dispatch) => ({
  isLogout: () => dispatch(isLogout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
