
import { useEffect, useState } from 'react';
import apiFilmes from '../../service/ApiFilmes';
import styles  from './Card.module.css';

export default function Card() {
  const[filmes,setFilmes]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    async function carregarFilmes(){
    try{
      const response= await apiFilmes.get("/movie/popular",{
        params:{page:1}
      });
      setFilmes(response.data.results);
      setLoading(false);
    } catch(error){
      console.log("Erro ao carregar os filmes",error);
      setLoading(false);
    }
  }
  carregarFilmes();
  },[]);
  if(loading){
return <h2>Carregando filmes ...</h2>

  }

  return (
    <div>
   
        {filmes.map((filme)=>(
           <div key={filme.id}>
            <h3>{filme.title}</h3>
<img src={"https://image.tmdb.org/t/p/w342/"+filme.poster_path} alt={filme.title} style={{width:"168px",borderRadius:"4px"}} />

           </div> ))}

    </div>
  )
}
