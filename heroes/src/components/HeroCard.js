import { useContext } from "react"
import { UserContext } from "../App"
export default function HeroCard(props){
    const context = useContext(UserContext)
    return(
        <>
        <div className="card" style={{width: "15rem"}}>
            <img className="card-img-top" src={props.data.image} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">{props.data.name}</h5>
                <p className="card-text">Age: {props.data.age}</p>
                <p className="card-text">Power: {props.data.power}</p>
                <p className="card-text">slug: {props.data.slug}</p>
                <a href="#" onClick={()=>{context.changePage('hero', props.data)}}className="btn btn-primary">Afficher</a>
            </div>
        </div>
        </>
    )
}