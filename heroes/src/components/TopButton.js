
import '../App.css'
import axios from 'axios'
import { useState } from 'react'
export default function TopButton(){
    const [input, setInput] = useState(false)
    const [formData, updateFormData] = useState(null);
    const [check, setCheck] = useState(false);

    const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim()
      });
    };

    const submit = (e)=>{
        e.preventDefault()
        console.log(formData)

        const url = 'http://localhost:4000/heroes'
        const option = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(formData),
          }
        fetch(url, option)
        .then((response)=>console.log(response))
        .then((data) => console.log(data))       
    }
    const inputChange = ()=>{
        if(check){
            setCheck(false)
        }else{
            setCheck(true)
        }
    }
    return(
       <div className="container">
            <a href="#" onClick={()=>{setInput(true)}}className="btn btn-primary">Ajouter un Heros</a>
            {
                input?
                    <form onSubmit={(e)=>{submit(e)}} method="post">
                    <div className="form-group" >
                        <label htmlFor="exampleInputEmail1">Slug</label>
                        <input name="slug" type="text" className="form-control"  placeholder="Slug" onChange={handleChange}/>
    
                        <label htmlFor="exampleInputPassword1">Name</label>
                        <input name="name" type="text" className="form-control" placeholder="Name" onChange={handleChange} />
    
                        <label htmlFor="exampleInputPassword1">Age</label>
                        <input name="age" type="number" className="form-control"  placeholder="Age" onChange={handleChange}/>
    
                        <label htmlFor="exampleInputPassword1">Color</label>
                        <input name="color" type="text" className="form-control"  placeholder="color" onChange={handleChange}/>

                        <label htmlFor="exampleInputPassword1">image</label>
                        <input name="image" type="text" className="form-control"  placeholder="image" onChange={handleChange}/>

                        <label htmlFor="exampleInputPassword1">Power</label>
                        <input name="power" type="text" className="form-control"  placeholder="Power" onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                    </form>

                :
                null
            }
       </div>
    )
}