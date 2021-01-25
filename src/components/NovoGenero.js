import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';

import {
    
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert



} from 'reactstrap';

import axios from 'axios';


function NovoGenero() {
    const [inputvalue, setInputvalue] = useState('');
    const [invalidate, setInvalidate] = useState(false);
    const [validadeS, setValidadeS] = useState(false);
  
   

    const sendData = ()=>
        axios.post('http://localhost:3002/api/genres',{
            name:inputvalue
        })
        .then(r=>{
            
                
        })

    
    const onSubmitGenero = event => {

        event.preventDefault()

        if(!inputvalue.length){
            setInvalidate(true);
            return;
        }

        setValidadeS(true);
        sendData();


        
        

    };

    const inputName = event =>{

        setInputvalue(event.target.value);

        
    }
  


  return (
    <>
        <Container>
            <h4>Novo Genero</h4>
            <Form onSubmit={onSubmitGenero}>
                <FormGroup>
                    <Label>Nome</Label>
                    <Input type='text'  value={inputvalue} onChange={inputName}
                    placeholder='Digite o nome do genero'  />
                </FormGroup>

                { invalidate && 
                    <Alert color={'danger'}>Preencha o gênero</Alert>
                }
                { validadeS && 
                    <>
                        <Alert color={'primary'}>Dados enviados com sucesso</Alert>
                        <Redirect to='/generos' />
                    </>
                }

                <Button>Salvar Genero</Button>
            </Form>




        </Container>
    </>
  );
}

export default NovoGenero;
