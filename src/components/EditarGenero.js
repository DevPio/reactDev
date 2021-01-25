import React,{useState,useEffect} from 'react';
import {Redirect,useParams} from 'react-router-dom';

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


function EditarGenero() {
    const [inputvalue, setInputvalue] = useState('');
    const [invalidate, setInvalidate] = useState(false);
    const [validadeS, setValidadeS] = useState(false);
  
    const {id} = useParams();

    
  
  
   

    const sendDataUpdate = (id)=>
        axios.put(`api/genres/${id}`,{
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
        sendDataUpdate(id);


        
        

    };

    const inputName = event => setInputvalue(event.target.value);

    useEffect(()=>{
        axios.get(`/api/genres/${id}`)
        .then(r=>setInputvalue(r.data.name))
    },[])
  


  return (
    <>
        <Container>
            <h4>Atualizar Genero</h4>
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
                        <Alert color={'primary'}>Dados atualizados com sucesso</Alert>
                        <Redirect to='/generos' />
                    </>
                }

                <Button>Atualizar Genero</Button>
            </Form>




        </Container>
    </>
  );
}

export default EditarGenero;
