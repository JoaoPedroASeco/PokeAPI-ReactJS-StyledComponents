import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Styled from "styled-components";

export default function Pokemons ({ max, width}) {
    const [pokemon, setPokemon] = useState(null);
    const { id } = useParams();

    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((r) => r.json())
        .then((json) => {
          setPokemon(json);
        });
    }, [id]);
  
    if (!pokemon) {
      return null;
    }

    const type = pokemon.types[0].type.name;
    const weight = parseFloat(pokemon.weight)/ 10;
    const height = parseFloat(pokemon.height)/ 10;
    const newWeight = JSON.stringify(weight).replace(".", ",")
    const newHeight = JSON.stringify(height).replace(".", ",")

    let color = '';

    if(type === "rock") {
        color = "#B69E31";
    }else if(type === "ghost") {
        color = "rgba(144, 101, 176, 1)"
    }else if(type === "psychic") {
        color = "rgba(193, 76, 138, 1)"
    }else if(type === "electric") {
        color = "rgba(203, 145, 47, 1)"
    }else if(type === "bug") {
        color = "rgba(68, 131, 97, 1)"
    }else if(type === "poison") {
        color = "#A43E9E"
    }else if(type === "normal") {
        color = "rgba(159, 107, 83, 1)"
    }else if(type === "steel") {
        color = "rgba(120, 119, 116, 1)"
    }else if(type === "flying") {
        color = "#A891EC"
    }else if(type === "fire") {
        color = "#E29345"
    }else if(type === "grass") {
        color = "#74CB48"
    }else if(type === "water") {
        color = "#6493EB"
    }
    
    return (
        <CardComponent color={color} className="pokemon-container-details">
            <img className="pokedisplay-background" src="/img/pokemon-background-img.svg" alt="" />

            <div className="header-pokemon-details">
                <div>
                    <Link to="/">
                        <img src="/img/icon-come-back.svg" alt="" />
                    </Link>
                    <h1>{pokemon.name}</h1>
                </div>

                <p>#0{String(id).padStart(2, '0')}</p>

            </div>

            <div className="pokemon-container-info">

                <Link className="next-pokemon" to={`${parseFloat(id) + 1}`}>
                    <img  src="/img/icon-next-pokemon.svg" alt="" />
                </Link >

                <img className="pokemon-main-img" src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />

                <Link className="previous-pokemon" to={`${parseFloat(id) - 1}`}>
                    <img  src="/img/icon-previous-pokemon.svg" alt="" />
                </Link>

                <div className="pokemon-info">

                    <ul className="pokemon-types">
                        {pokemon.types.map(resp => {
                            return (
                                <li className={`${resp.type.name} pokemon-types-item` } key={resp.type.name}>{resp.type.name}</li>
                            )
                        })}
                    </ul>

                    <section className="pokemon-container-about">
                        <span className="pokemon-container-about-title">About</span>

                        <div className="pokemon-about">
                            
                            <div className="pokemon-about-info">
                                <div className="info-description">
                                    <img src="/img/icon-weigth.svg" alt="Pokemon Weigth"/>
                                    <p>{newWeight} kg</p>
                                </div>
                                <p className="pokemon-about-title">Weight</p>
                            </div>

                            <span className="pokemon-about-separator" />

                            <div className="pokemon-about-info">
                                <div className="info-description">
                                    <img src="/img/icon-height.svg" alt="Pokemon Height"/>
                                    <p>{newHeight} m</p>
                                </div>
                                <p className="pokemon-about-title">Height</p>
                            </div>

                            <span className="pokemon-about-separator" />

                            <div className="pokemon-abilities">
                                <div className="pokemon-abilities-description">
                                    <ul>
                                        {pokemon.abilities.map(resp => {
                                            return (
                                                <li>{resp.ability.name}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <p className="pokemon-abilities-title">Moves</p>
                            </div>

                        </div>

                        <p className="pokemon-preferences">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis eros vitae tellus condimentum maximus sit amet in eros.</p>
                    </section>

                    <section className="pokemon-container-stats">
                        <span className="pokemon-container-stats-title">Base Stats</span>
                        
                        <div className="pokemon-container-stats-list">
                            <ul className="stats-title">
                                {pokemon.stats.map(resp => {
                                    if (resp.stat.name === 'attack'){
                                        resp.stat.name = "atk"
                                    }
                                    if (resp.stat.name === 'defense'){
                                        resp.stat.name = "def"
                                    }
                                    if (resp.stat.name === 'special-attack'){
                                        resp.stat.name = "satk"
                                    }
                                    if (resp.stat.name === 'special-defense'){
                                        resp.stat.name = "sdef"
                                    }
                                    if (resp.stat.name === 'speed'){
                                        resp.stat.name = "spd"
                                    }

                                    return (
                                        <li><span>{resp.stat.name}</span></li>
                                    )
                                })}
                            </ul>

                            <span className="pokemon-about-separator" />

                            <ul className="stats-data">
                                {pokemon.stats.map(resp => {
                                    return (
                                        <li>
                                            <p>{String(resp.base_stat).padStart(3, '0')}</p>
                                            <Container color={color} width={width}>
                                                <progress className="progress" value={resp.base_stat} max={max} />
                                            </Container>
                                        </li>
                                    )
                                })}
                            </ul>


                        </div>
                    </section>
                </div>
            </div>
        </CardComponent>
    )
}

const CardComponent = Styled.div`
    background-color: ${props => props.color};

    span {
        color: ${props => props.color};
      }
      
    .pokemon-types-item {
        text-transform: capitalize;
        color: white;
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 51px;
        height: 20px;
        border-radius: 10px;
        background-color: ${props => props.color};
    }
`;

const Container = Styled.div`
  progress {
    margin-right: 8px;
  }

  progress[value] {
    width: ${props => props.width};
    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 4px;
    border-radius: 20px;
    background-color: #eee;
  }  

  progress[value]::-webkit-progress-value {
    height: 4px;
    border-radius: 20px;
    background-color: ${props => props.color};
  }
`;

Pokemons.defaultProps = {
  max: 230,
  width: "230px"
};