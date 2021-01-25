import React,{useEffect, useState} from 'react';
import {Redirect,useParams} from 'react-router-dom';

import {
    
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Row,
    Col,
    Card,
    CardImg,
    Badge
    
    
    



} from 'reactstrap';

import axios from 'axios';


function InfoSerie(props) {
    
    const [invalidate, setInvalidate] = useState(false);
    const [validadeS, setValidadeS] = useState(false);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState(null);
    const [form, setForm] = useState(null);
    const [generos, setGeneros] = useState([])

    const {id} = useParams();

  
    
   
    useEffect(()=>{

        axios.get(`http://localhost:3002/api/series/${id}`)
        .then(response=>{
          
           setForm(response.data)
            setData(response.data)
        })


        axios.get('http://localhost:3002/api/genres')
        .then(response=>{
           
            setGeneros(response.data.data)
        })

    },[]);




    const sendData = () =>
        axios.put(`http://localhost:3002/api/series/${id}`,form)
        .then(r=>{
        })

    
    const onSubmitSeries = event => {

        event.preventDefault()

        if(!form.name.length){
            setInvalidate(true);
            return;
        }

        setValidadeS(true);
        sendData();


        
        

    };


    const masterHeader = {
        height:'',
        minHeight:'500px',
        backgroundImage:`url('${data && data.background}')`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'cover'
    }
  
    const rules = () => (
        <>

            { invalidate && 
                <Alert color={'danger'}>Preencha o gênero</Alert>
            }
            { validadeS && 
                <>
                    <Alert color={'primary'}>Dados enviados com sucesso</Alert>
                    <Redirect to='/series' />
                </>
            }


        </>

    )


    const onChangeFild = field => event =>{

        setForm({...form,[field]:event.target.value})

    }

    const generosDataJ = () =>(
        <>

        <option ></option>
        {generos.map(item=>(
            <option key={item.id} value={item.id === form.id}>{item.name}</option>
        )) } 


        </>

    )

    const seleciona = e => setForm({...form,['status']:e.target.value})


  return (
    <>
    <header>

        <div className='h-100'  style={{backgroundColor:'rgba(0,0,0,0.7)',...masterHeader}}>
           <Container style={{padding:'10px'}}>
                <Row>
                    <Col sm='3'>
                        <Card>
                            <CardImg className='img-fluid'  src={data && data.poster} />
                        </Card>
                    </Col>


                    <Col sm='8'>
                        <h1 className='font-weight-light text-white'> {data && data.name}</h1>
                        <div className='lead text-white'>
                            <Badge color={ data && data.status == 'ASSISTIDO' ? 'success' : 'warning'}>{data && data.status == 'ASSISTIDO' ? 'Assistido' : 'Para Assitir'}</Badge>
                        </div>

                    </Col>

                </Row>
           </Container>

        </div>


    </header>

    <Container style={{marginTop:'20px'}}>
        <Button onClick={()=> setEdit(!edit)}>{!edit ? 'Editar' : 'Cancelar Edição'}</Button>
    </Container>
        {edit &&
            <Container style={{marginTop:'20px',marginBottom:'90px'}}>
                <h4>Editar Série</h4>
                <Form onSubmit={onSubmitSeries}>
                    <FormGroup>
                        <Label>Nome</Label>
                        <Input type='text'  value={form.name} onChange={onChangeFild('name') }
                        placeholder='Digite o nome da série'  />
                    </FormGroup>


                    {rules()}


                    
                    <FormGroup>
                        <Label>Comentários</Label>
                        <Input type='text'  value={form.comments} onChange={onChangeFild('comments') }
                        placeholder='Digite os comentários sobre a série'  />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleSelect">Generos</Label>
                        <Input type="select" onChange={onChangeFild('genre')}>
                            {generosDataJ()}
                        </Input> 
                    </FormGroup>



                    <div className='form-check'>
                        <input className='form-check-input' name='status' type='radio' id='assistido' value='ASSISTIDO' 
                        defaultChecked={form.status === 'ASSISTIDO' && true } onClick={seleciona}  />
                        <label className='form-check-label' >
                            Assistido
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' name='status' type='radio' id='para_assistir' value='PARA_ASSISTIR' 
                        defaultChecked={ form.status === 'PARA_ASSISTIR' && true } onClick={seleciona} />
                        <label className='form-check-label' >
                            Para Assitir
                        </label>
                    </div>
                    

                    <Button>Salvar série</Button>
                </Form>




        </Container>
        }
    </>
  );
}

export default InfoSerie;
