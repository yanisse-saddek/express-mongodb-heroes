import {useState, useEffect} from 'react'
import axios from 'axios'
import TopButton from './TopButton'
import HeroCard  from './HeroCard'
import '../App.css'
export default function HeroesList(){
    const [heroesList, setHeroesList] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:4000/heroes').then(res=>{
            setHeroesList(res.data)
        })
    }, [])
    return(
        <>
        <TopButton/>
        <div className="list">
            {
                heroesList.map(hero=>{
                    return <HeroCard data={hero}/>
                })
            }
        </div>
        </>
    )
}