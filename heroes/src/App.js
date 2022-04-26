import logo from './logo.svg';
import './App.css';
import HeroesList from './components/HeroesList';
import {useState, createContext} from 'react'
import Hero from './components/Hero'

export const UserContext = createContext()
function App() {
  const [page, setPage] = useState('heroeslist')
  const [hero, setHero] = useState(null)
  const changePage = (page, hero)=>{
    setPage(page)
    setHero(hero)
  }
  const deleteHero = (hero)=>{
    const url =  `http://localhost:4000/heroes/${hero.slug}`
    console.log(url)
    const option = {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(hero),
      }
   
    fetch(url, option)
    .then((response)=>console.log(response))
    .then((data) => console.log(data))       
    setPage('heroeslist')

  }
  const sendToContext = {
    changePage:changePage,
    delete:deleteHero
  }
  
  return (
    <div className="App">
      <UserContext.Provider value={sendToContext}>
        {
          page === 'heroeslist' 
          ?
          <HeroesList/>
          :
          <Hero data={hero} />
        }
      </UserContext.Provider>
    </div>
  );
}

export default App;
