import React,{useState,useEffect} from 'react';

import {Table,Button,Container} from 'reactstrap';
import {Link}  from 'react-router-dom';
import axios from 'axios';


function Series() {
    const [data, setData] = useState([]);
    


    const update = ()=>{
        
    }
    const deleteItem = id => {
        axios.delete(`api/series/${id}`)
        .then(res=>{
            if(res.status==200){
                setData(data.filter(item=> item.id != id))
            }
        })

        
    }
    useEffect(()=>{
        axios.get('api/series')
        .then(response=>{
            setData(response.data.data)
        })
    },[data])

    


    const renderList = dataList => (
        <tr key={dataList.id}>
            <th scope="row">{dataList.id}</th>
            <td>{dataList.name}</td>
            <td><Button color='danger' onClick={()=>deleteItem(dataList.id)}>Apagar</Button></td>
            <td><Button color='primary' ><Link style={{color:'white'}} to={`/series/info/${dataList.id}`}>Informaçoes</Link></Button></td>
        </tr>
    )


  return (
    <>
    <Container style={{marginTop:'70px'}}>
        <Button color='info' ><Link to='/series/nova' style={{color:'white'}}>Nova Série</Link></Button>
            <Table style={{marginTop:'10px'}} >
            
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Deletar</th>
                    <th>Informações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item=>(

                    renderList(item)
                ))

                }
            </tbody>



            </Table>
        </Container>
    </>
  );
}

export default Series;
