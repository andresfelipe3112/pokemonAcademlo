
import { useLocation, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/pokemon.css"



export default function Pokemon() {

    const [state, setstate] = useState<any>([])


    let location: any = useLocation();
    let history = useHistory()

    const todos = () => {
        history.push({
            pathname: "/pokedex",
            state: {
                render: false,
                initial: location.state ? location.state.initial : "0",
                limite: location.state ? location.state.limite : "10",
                buttonSellect: location.state ? location.state.buttonSellect : "1"
            }
        })

    }

    useEffect(() => {

        const getPokemon: any = async (id: any) => {

            const response: any = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const data = await response.data

            setstate([data])

            const responseAbility: any = await axios.get(`https://pokeapi.co/api/v2/ability/${data.id}`)
            const dataAbility: any = await responseAbility.data

            setstate((prev: any) => {
                return [...prev, dataAbility]
            })

        }


        var regex = /(\d+)/g;
        getPokemon(location.pathname.match(regex)[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






    return (
        <div className="ContainerPokemonID">
            <div className="ContainerImagenID">
                {state.length > 0 && <img className="imagenGrandePokemonID" src={state[0].sprites.other["official-artwork"].front_default} alt="" />}
                {state.length > 0 && <img className="imagenPequeñaPokemonID" src={`https://play.pokemonshowdown.com/sprites/xyani/${state[0].name}.gif`} alt="" />}
                <h3 style={{
                    position: "relative",
                    top: "-40px",
                    left: "-150px",
                    fontSize: "45px",
                    fontFamily: "'Press Start 2P', cursive",
                    color: "rgba(0, 0, 0, 0.522)",
                    marginBottom: "-56px"

                }}>{state.length > 0 && state[0].types[0].type.name}</h3>
                <h1 style={{ fontSize: "25px" }} className="h1_id">#{state.length > 0 && state[0].id} {state.length > 0 && state[0].name}</h1>
                <button style={{ backgroundColor: "red", fontSize: "15px" }} onClick={todos}>Return to All Pokemon</button>
            </div>

            <div className="containerStatsID">
                <div className="containerTodo"  >

                    <h1 className="h1_id">Carateristics</h1>
                    <h3 className="h3_id" >Pokedex number: {state.length > 0 && state[0].order}</h3>
                    <h3 className="h3_id" >Weight: {state.length > 0 && state[0].weight}</h3>
                    <h3 className="h3_id" >Height: {(state.length > 0 && state[0].height) * 100 / 10} hc</h3>
                </div>
                <div className="containerTodo">
                    <h1 className="h1_id">Base Stats</h1>
                    <h3 className="h3_id">{state.length > 0 && state[0].stats[0].stat.name}: {state.length > 0 && state[0].stats[0].base_stat}</h3>
                    <h3 className="h3_id">{state.length > 0 && state[0].stats[1].stat.name}: {state.length > 0 && state[0].stats[1].base_stat}</h3>
                    <h3 className="h3_id">{state.length > 0 && state[0].stats[2].stat.name}: {state.length > 0 && state[0].stats[2].base_stat}</h3>
                    <h3 className="h3_id">{state.length > 0 && state[0].stats[3].stat.name}: {state.length > 0 && state[0].stats[3].base_stat}</h3>
                    <h3 className="h3_id">{state.length > 0 && state[0].stats[4].stat.name}: {state.length > 0 && state[0].stats[4].base_stat}</h3>
                    <h3 className="h3_id">{state.length > 0 && state[0].stats[5].stat.name}: {state.length > 0 && state[0].stats[5].base_stat}</h3>
                </div>
                <div className="containerTodo">
                    <h1 className="h1_id">Abilities</h1>
                    <h3 className="h3_id">{state.length > 0 && state[0].abilities[0] && state[0].abilities[0].ability.name}</h3>
                    <h3 className="h3_id">{state.length > 0 && state[0].abilities[1] && state[0].abilities[1].ability.name}</h3>
                </div>

                <div className="containerTodo">
                    <h1 className="h1_id">Effects</h1>
                    <h3 className="h3_id">{state.length > 0 && state[1] && state[1].flavor_text_entries[0].flavor_text}</h3>
                </div>

            </div>

        </div>
    )
}
