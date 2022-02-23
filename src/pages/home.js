import { useEffect, useState } from "react"
import PokemonCard from "../components/PokemonCard/PokemonCard"

export default function Home () {
  const[allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=12')

  const fetchPokemons = async () => {
    const resp = await fetch(loadMore)
    const data = await resp.json()

    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    fetchPokemons()
  }, [])


  const formFetchPokemons = async (e) => {
    e.preventDefault();
    const dataInput = e.target[0].value;

    if(dataInput == "") {
      fetchPokemons();
    }else {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${dataInput}`)
      const data =  await res.json()
      console.log(data)
      setAllPokemons([data])
    }
  }

  return (
    <div className="pokemon-container">

      <header className="header-container">
        <div className="header-description">

          <div className="page-title">
            <img src="/img/header-logo.svg" alt="" />
            <h1>Pokédex</h1>
          </div>

          <div className="list-order">
            <p>#<img src="/img/icon-header-ordenation.svg" alt="" /></p>
          </div>
        </div>

        <form className="header-form" onSubmit={formFetchPokemons}>
          <input type="text" name="pokemon-search" />
          <div className="placeholder-edited">
            <img src="/img/icon-form-search.svg" alt="" />
            <span>Procurar</span>
          </div>
          <button type="submit"></button>
        </form>

      </header>

      <ul className="list-pokemon-container">
          {allPokemons.map( (pokemonStats, index) => {
              return (
                  <PokemonCard
                      key={index}
                      id={pokemonStats.id}
                      image={pokemonStats.sprites.other.dream_world.front_default}
                      name={pokemonStats.name}
                      type={pokemonStats.types[0].type.name}
                  />)}
              )
          }
      </ul>

      <button className="load-more" onClick={() => fetchPokemons()}>Carregar Mais</button>

    </div>
  )
}