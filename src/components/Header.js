import React,{useState} from 'react';

import {
    Navbar, 
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavbarToggler,
    Container



} from 'reactstrap';
import {Link} from 'react-router-dom';
function Headers() {
    const [open, setOpen] = useState(false)
    return (
    
      <Navbar color='light' light expand='md'>
      <Container>
        <NavbarBrand to='/' tag={Link}>Minhas series</NavbarBrand>




        <NavbarToggler onClick={()=> setOpen(!open)} />
        <Collapse isOpen={open} navbar>

            <Nav className='ml-auto'>
                <NavItem>
                 <Container><Link to='/generos'>Generos</Link></Container>
                </NavItem>

        

                <NavItem>
                  <Container><Link to='/series'>Series</Link></Container>
                </NavItem>
            </Nav>

        </Collapse>
        </Container>
      </Navbar>
     
    );
  }
  
  export default Headers;
  