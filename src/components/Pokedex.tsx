import React, { useState } from 'react'
import { useAuth } from "../hooks/useContextApp"
import "../styles/pokedex.css";
import { useEffect } from 'react';




export default function Pokedex() {
    const { buttonsReder, pokemonData, getAPI_Next, getAPI_Previus, getPokemonDinamic } = useAuth()

    // console.log(pokemonData);
    // console.log(buttonsReder);


    const [sliceParams, setsliceParams] = useState({
        inicial: 0,
        limite: 10
    })



    const colorBoton = async (e: any) => {
        console.log(e);

        let htmlB: any = document.getElementsByClassName("bigButtons")

        for (let index = 0; index < htmlB.length; index++) {
            htmlB[index].className = ""

        }
        // console.log(document.getElementsByClassName("bigButtons"))
        e.target.className = "bigButtons";


        // let buttonAfter: any = document.getElementById("a");
        // buttonAfter.className = "button"



    }

    const colorBotonAfter = async () => {


        let htmlB = document.getElementsByClassName("bigButtons")

        let ultimo: any = htmlB[htmlB.length - 1]
        console.log(ultimo);



        if (ultimo.previousSibling.innerText !== "AFTER") {
            for (let index = 0; index < htmlB.length; index++) {
                // htmlB[index - 1].className = "bigButtons";
                htmlB[index].className = "";
            }
            ultimo.previousSibling.className = "bigButtons"
        }



    }
    const colorBotonNext = async () => {


        let htmlB = document.getElementsByClassName("bigButtons")

        let ultimo: any = htmlB[htmlB.length - 1]




        if (ultimo.nextSibling.innerText) {
            for (let index = 0; index < htmlB.length; index++) {
                // htmlB[index - 1].className = "bigButtons";
                htmlB[index].className = "";
            }
            ultimo.nextSibling.className = "bigButtons";
            // ultimo.parentElement.firstElementChild.className = "button"
        }



    }


    useEffect(() => {




        console.log(document.getElementsByClassName("button")[0]);



        if (buttonsReder.length > 1) {
            let buttonPag: any = document.getElementsByClassName("button")[0]
            buttonPag.className = "bigButtons"
        }



    }, [buttonsReder])


    return (
        <div>
            <div>
                {/* <button className="displaynone" id="a" onClick={() => {
                    document.getElementsByClassName("bigButtons").length !== 0 && getAPI_Previus();
                    colorBotonAfter();
                }}> after</button> */}
                {
                    buttonsReder.length > 1 && buttonsReder.slice(sliceParams.inicial, sliceParams.limite).map((buttonString: string, index: number) => {
                        return (
                            <button onClick={(e) => {
                                colorBoton(e);

                                setsliceParams({
                                    //7                                                                                   
                                    inicial: (parseInt(buttonString, 10) - 1) >= 5 ? (parseInt(buttonString, 10) - 1) - 5 : 0,
                                    limite: (parseInt(buttonString, 10) - 1) >= 5 ? (parseInt(buttonString, 10) - 1) + 5 : 10,
                                })
                                getPokemonDinamic(
                                    ((parseInt(buttonString, 10) - 1) * 4).toString());
                            }}
                                className="button" id="" key={(parseInt(buttonString, 10) - 1)}>{buttonString}</button>
                        )
                    })
                }
                {/* <button className="" onClick={() => {
                    getAPI_Next()
                    colorBotonNext();
                }}> Next</button> */}
            </div>
            <div>

                {
                    pokemonData.length > 0 && pokemonData.map((pokemon: any) => {
                        return (

                            <h1 key={pokemon.name}>{pokemon.name}</h1>
                        )
                    })
                }
            </div>
        </div>
    )
}
