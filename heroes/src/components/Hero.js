import { useContext } from "react"
import { UserContext } from "../App"
export default function Hero(props){
    const context = useContext(UserContext)
    return(
        <>
        <div>
            <a href="#"  onClick={()=>{context.changePage('heroeslist')}} class="btn btn-success">Retour en arriere</a>
            <img src={props.data.image} style={{width:"100vw", height:"500px"}}/>
            <h5>{props.data.name}</h5>
                <p>Age: {props.data.age}</p>
                <p>Power: {props.data.power}</p>
                <p>slug: {props.data.slug}</p>
                <a href="#" class="btn btn-danger" onClick={()=>{context.delete(props.data)}}>Supprimer</a>
        </div>
        </>
    )
}