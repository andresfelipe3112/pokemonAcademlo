import { useState, useEffect } from 'react'
import { useAuth } from "../hooks/useContextApp"
import "../styles/pokedex.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom'





type FormValues = {
    PokemonName: string;
};


export default function Pokedex() {

    let history = useHistory()
    let location: any = useLocation()



    const { buttonsReder, pokemonData, getPokemonDinamic } = useAuth()
    const [sliceParams, setsliceParams] = useState({
        inicial: location.state === undefined ? 0 : location.state.initial,
        limite: location.state === undefined ? 10 : location.state.limite,
    })

    const [tipoPokemonOnlyNames, setTipoPokemonOnlyNames] = useState<any>("")
    const [typoPokemon, setTypoPokemon] = useState<any>("")
    const [render, setrender] = useState(true)
    const [itemColor, setitemColor] = useState("")
    const [buttonsTypesNext, setbuttonsTypesNext] = useState(0)





    //  hook form SEARCH

    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data, e) => {


        try {

            const response: any = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.PokemonName}/`)
            const data2: any = await response.data.id


            history.push({
                pathname: `/pokedex/pokemon/:${data2}`,
                state: {
                    id: data2,
                    initial: sliceParams.inicial,
                    limite: sliceParams.limite,
                    buttonSellect: itemColor
                }

            })

        } catch (error) {
            alert("pokemon no exist")
            e.target.reset();
        }






    }

    // option TYPES
    let array: any = []

    const typesSearch = async (e: any) => {


        const response: any = await axios.get(`https://pokeapi.co/api/v2/type/${e.target.value}`)
        const data: any = await response.data

        const arra: any = data.pokemon.map((x: any) => x.pokemon.name)

        arra.map(async (x: any) => {
            const response: any = axios.get(`https://pokeapi.co/api/v2/pokemon/${x}`)
            array.push(response)
        })
        let dataFinaly: any = await Promise.all(array)

        setTypoPokemon(dataFinaly)
        setrender(false)

    }



    const onlyPOkemonID = (id: any) => {

        history.push({
            pathname: `/pokedex/pokemon/:${id}`,
            state: {
                id: id,
                initial: sliceParams.inicial,
                limite: sliceParams.limite,
                buttonSellect: itemColor
            }
        })

    }



    const colorBoton = async (e: any, d?: any) => {
        let htmlB: any = document.getElementsByClassName("bigButtons")
        for (let index = 0; index < htmlB.length; index++) {
            htmlB[index].className = ""
        }
        e.target.className = "bigButtons";
        setitemColor(e.target.innerHTML)

    }





    useEffect(() => {



        if (render === true && buttonsReder.length > 1) {
            let buttonPag: any = document.getElementsByClassName("button")[0]
            buttonPag.className = "bigButtons"
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const RefreshAfter = (e?: any) => {
        let buton: any = e.target.parentNode.children[0]
        buton.click()
    }

    const RefreshNext = (e?: any) => {
        let buton2: any = e.target.parentElement.childNodes[9]
        buton2.click()
    }



    useEffect(() => {


        window.onbeforeunload = (event) => {
            const e = event || window.event;
            //Cancel the event
            e.preventDefault();
            if (e) {
                e.returnValue = ''; // Legacy method for cross browser support
            }

            history.push("/login")


            return ''; // Legacy method for cross browser support

        };


        render === true && setTimeout(() => {


            let g: any = document.getElementById("0")
            if (itemColor.length > 0 && itemColor === "" && g.className === "button") {

                g.click()
            }

            let d: any = document.getElementsByClassName("button")


            if (render === true && location.state && location.state.buttonSellect !== "") {

                for (let index = 0; index < d.length; index++) {
                    if (d[index].innerHTML === location.state.buttonSellect) {
                        d[index].className = "bigButtons"
                        g.className = "button";
                    }

                }
            }


        }, 100);




        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    useEffect(() => {



        const typesPokemon = async () => {
            const response: any = await axios.get(`https://pokeapi.co/api/v2/type`)
            const data: any = await response.data

            let tipos: any = data && data.results.map((x: any) => {
                return x.name
            })
            setTipoPokemonOnlyNames(tipos)
        }

        typesPokemon()


    }, [])


    const todos: any = () => {
        setrender(true)
    }



    const nextTypes = () => {
        setbuttonsTypesNext((prev: any) => {
            return prev + 4
        })
    }
    const afterTypes = () => {
        setbuttonsTypesNext((prev: any) => {
            if (prev <= 0) {
                return prev = 0
            }
            return prev - 4
        })
    }


    //render DE TYPOS
    if (render === false) {
        return (

            <div className="Container">

                <div className="ContainerSearch" style={{ marginBottom: "5vh" }}>

                    <select style={{ fontSize: "20px", marginTop: "10px", textAlign: "center" }} onChange={typesSearch} >
                        <option style={{ textAlign: "end" }}
                            defaultValue="selected"  > ¡According to the type Element! </option>
                        {
                            tipoPokemonOnlyNames !== "" ?
                                tipoPokemonOnlyNames.map((item: any, index: any) =>
                                    <option key={index} value={item}>{item}</option>
                                ) : null}
                    </select>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input style={{ position: "relative", paddingLeft: "10px", marginRight: "-10px", fontSize: "20px" }} placeholder="Search Pokemon name 
                        " {...register("PokemonName")} />
                        <input style={{ position: "relative", right: "26px" }} type="submit" value="Search" />
                    </form>
                    <button style={{ backgroundColor: "red", fontSize: "15px" }} onClick={todos}>Return to All Pokemon</button>
                    <button onClick={afterTypes}>{"<<<"}</button>
                    <button onClick={nextTypes}>{">>>"}</button>
                </div>


                <div className="containerPokemon">

                    {
                        typoPokemon.length > 0 && typoPokemon.slice(buttonsTypesNext <= 0 ? 0 : buttonsTypesNext, buttonsTypesNext === 0 ? 8 : buttonsTypesNext + 8).map((pokemon: any, index: number) => {


                            return (
                                <div className="containerPokemonUNI" key={index}>
                                    <div className="containerIMG" >
                                        <img className="imagenGrandePokemon" src={pokemon.data.sprites.other["official-artwork"].front_default} alt="" />
                                        <img className="imagenPequeñaPokemon" src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.data.name}.gif`} alt="" />
                                    </div>
                                    <h3 style={{
                                        position: "relative",
                                        top: "-27px",
                                        left: "60px",
                                        fontSize: "25px",
                                        fontFamily: "'Press Start 2P', cursive",
                                        color: "rgba(0, 0, 0, 0.522)",
                                        marginBottom: "-56px"

                                    }}>{pokemon.data.types[0].type.name}</h3>
                                    <div className="containerStats">
                                        <button style={{ backgroundColor: "red", fontSize: "15px", marginBottom: "-3vh" }} onClick={() => onlyPOkemonID(pokemon.data.id)}>more Poke-info</button>
                                        <h1 className="h1">{pokemon.data.name} #0{pokemon.data.id}</h1>
                                        <h3 className="h3"> hp: {pokemon.data.stats[0].base_stat}</h3>
                                        <h3 className="h3">attack: {pokemon.data.stats[1].base_stat}</h3>
                                        <h3 className="h3"> defense: {pokemon.data.stats[2].base_stat}</h3>
                                        <h3 className="h3"> speed: {pokemon.data.stats[2].base_stat}</h3>

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="loader"></div>
            </div>

        )
    }

    else {

        //RENDER DE TODOS LOS POKEMON

        return (
            <div className="Container">
                <div className="ContainerSearch">

                    <select style={{ fontSize: "20px", marginTop: "10px" }} onChange={typesSearch} >
                        <option defaultValue="selected"  > ¡According to the type! </option>
                        {
                            tipoPokemonOnlyNames !== "" ?
                                tipoPokemonOnlyNames.map((item: any, index: any) =>
                                    <option key={index} value={item}>{item}</option>
                                ) : null}
                    </select>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input style={{ position: "relative", paddingLeft: "10px", marginRight: "-10px", fontSize: "15px" }} placeholder="Search Pokemon name" {...register("PokemonName")} />
                        <input style={{ position: "relative", right: "26px" }} type="submit" value="Search" />
                    </form>

                </div>
                <div className="ContainerPOkedex">
                    <div className="">
                        {
                            buttonsReder.length > 0 && buttonsReder.slice(sliceParams.inicial, sliceParams.limite).map((buttonString: string, index: number) => {
                                return (
                                    <button id={index.toString()} onClick={(e) => {
                                        colorBoton(e);

                                        setsliceParams({
                                            //7                                                                                   
                                            inicial: (parseInt(buttonString, 10) - 1) >= 5 ? (parseInt(buttonString, 10) - 1) - 5 : 0,
                                            limite: (parseInt(buttonString, 10) - 1) >= 5 ? (parseInt(buttonString, 10) - 1) + 5 : 10,
                                        })
                                        getPokemonDinamic(
                                            ((parseInt(buttonString, 10) - 1) * 4).toString());

                                    }}
                                        className="button" key={(parseInt(buttonString, 10) - 1)}>{buttonString}</button>
                                )
                            })
                        }
                        <button id="Refresh" type="submit" onClick={(e: any) => { RefreshAfter(e) }}>{`<<<`}</button>
                        <button id="" type="submit" onClick={(e: any) => { RefreshNext(e) }}>{`>>>`}</button>
                    </div>


                    <div className="containerPokemon">

                        {
                            pokemonData.length > 0 && pokemonData.map((pokemon: any, index: number) => {


                                return (
                                    <div className="containerPokemonUNI" key={index}>
                                        <div className="containerIMG" >

                                            <img className="imagenGrandePokemon" src={pokemon.data.sprites.other["official-artwork"].front_default} alt="" />
                                            <img className="imagenPequeñaPokemon" src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.data.name}.gif`} alt="" />
                                        </div>
                                        <h3 style={{
                                            position: "relative",
                                            top: "-27px",
                                            left: "60px",
                                            fontSize: "25px",
                                            fontFamily: "'Press Start 2P', cursive",
                                            color: "rgba(0, 0, 0, 0.522)",
                                            marginBottom: "-56px"

                                        }}>{pokemon.data.types[0].type.name}</h3>
                                        <div className="containerStats">
                                            <button style={{ backgroundColor: "red", fontSize: "15px", marginBottom: "-3vh" }} onClick={() => onlyPOkemonID(pokemon.data.id)}>more Poke-info</button>
                                            <h1 className="h1">{pokemon.data.name} #0{pokemon.data.id}</h1>
                                            <h3 className="h3"> hp: {pokemon.data.stats[0].base_stat}</h3>
                                            <h3 className="h3">attack: {pokemon.data.stats[1].base_stat}</h3>
                                            <h3 className="h3"> defense: {pokemon.data.stats[2].base_stat}</h3>
                                            <h3 className="h3"> speed: {pokemon.data.stats[2].base_stat}</h3>

                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        )
    }
}









// {
//     pokemonData.data.length > 0 && pokemonData.data.map((pokemon: any, index: number) => {
//         return (
//             <div key={index}>
//                 <img src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`} alt="" />
//                 <h1>{pokemon.name}</h1>
//             </div>
//         )
//     })
// }

//{/* <img src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`} alt="" /> */ }




// return (
//     <div className="Container">
//         <div className="">

//             <select onChange={typesSearch} >
//                 <option defaultValue="selected"  > ¡Selected Type! </option>
//                 {
//                     tipoPokemonOnlyNames !== "" ?
//                         tipoPokemonOnlyNames.map((item: any, index: any) =>
//                             <option key={index} value={item}>{item}</option>
//                         ) : null}
//             </select>


//         </div>


//         <div className="ContainerPOkedex">
//             <div className="">
//                 {
//                     buttonsReder.length > 0 && buttonsReder.slice(sliceParams.inicial, sliceParams.limite).map((buttonString: string, index: number) => {
//                         return (
//                             <button id={index.toString()} onClick={(e) => {
//                                 colorBoton(e);

//                                 setsliceParams({
//                                     //7                                                                                   
//                                     inicial: (parseInt(buttonString, 10) - 1) >= 5 ? (parseInt(buttonString, 10) - 1) - 5 : 0,
//                                     limite: (parseInt(buttonString, 10) - 1) >= 5 ? (parseInt(buttonString, 10) - 1) + 5 : 10,
//                                 })
//                                 getPokemonDinamic(
//                                     ((parseInt(buttonString, 10) - 1) * 4).toString());

//                             }}
//                                 className="button" key={(parseInt(buttonString, 10) - 1)}>{buttonString}</button>
//                         )
//                     })
//                 }
//                 <button id="Refresh" type="submit" onClick={(e: any) => { RefreshAfter(e) }}>{`<<<`}</button>
//                 <button id="" type="submit" onClick={(e: any) => { RefreshNext(e) }}>{`>>>`}</button>
//             </div>


//             <div className="containerPokemon">

//                 {
//                     pokemonData.length > 0 && pokemonData.map((pokemon: any, index: number) => {


//                         return (
//                             <div className="containerPokemonUNI" key={index}>
//                                 <div className="containerIMG" >
//                                     <img className="imagenGrandePokemon" src={pokemon.data.sprites.other["official-artwork"].front_default} alt="" />
//                                     <img className="imagenPequeñaPokemon" src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.data.name}.gif`} alt="" />
//                                 </div>
//                                 <div className="containerStats">

//                                     <h1 className="h1">{pokemon.data.name} #0{pokemon.data.id}</h1>
//                                     <h3 className="h3"> hp :{pokemon.data.stats[0].base_stat}</h3>
//                                     <h3 className="h3">attack: {pokemon.data.stats[1].base_stat}</h3>
//                                     <h3 className="h3"> defense: {pokemon.data.stats[2].base_stat}</h3>
//                                     <h3 className="h3"> speed: {pokemon.data.stats[2].base_stat}</h3>

//                                 </div>
//                             </div>
//                         )
//                     })
//                 }

//             </div>
//         </div>
//     </div>
// )
// }
