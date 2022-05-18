import React from 'react'
import { Link } from 'react-router-dom';
import Styled from "styled-components";

const PokemonCard = ({ id, image, name, type, _callback }) => {
    const Cartstyle = " card-container";
    const PokeId = type + " poke-id";

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
        <Link to={`/pokemons/${id}`}>
            <CardComponent color={color} className={Cartstyle}>
                <div className={PokeId}>
                    <span>#0{String(id).padStart(2, '0')}</span>
                </div>

                <div className="pokeimg-container">
                    <img src={image} alt={name} />
                </div>

                <div className="poke-name">
                    <h3>
                        {name}
                    </h3>
                </div>
            </CardComponent>
        </Link>
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
    }
`;

export default PokemonCard
