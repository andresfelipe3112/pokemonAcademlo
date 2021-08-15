import React, { useState, useEffect } from 'react'
// import { useAuth } from "../hooks/useContextApp"
import "../styles/pokedex.css";
import axios from 'axios';







export default function Pokedex() {

    //variables Para typar Estados
    const objUrl: any = {
        urlActual: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=4",
        nextUrl: "",
        prevUrl: "",
    }

    //useState
    const [pokemonData, setPokemoData] = useState<any>();
    const [url, seturl] = useState(objUrl);
    const [buttonsReder, setbuttonsReder] = useState<any>(1)

    const [sliceParams, setsliceParams] = useState({
        inicial: 0,
        limite: 10
    })





    //functions

    const getButtunsArray = async () => {

        const response = await axios.get(url.urlActual);
        const data: any = await response.data;
        const Buttunslength: Number | any = data.count;
        // console.log(Buttunslength);


        let numeros = []
        for (let index = 0; index < Buttunslength / 4 + 0.5; index++) {
            numeros.push((index + 1).toString())

        }

        setbuttonsReder(numeros)
    }



    const colorBoton = async (e: any) => {

        let htmlB: any = document.getElementsByClassName("bigButtons")

        for (let index = 0; index < htmlB.length; index++) {
            htmlB[index].className = ""
        }

        e.target.className = "bigButtons";

    }





    useEffect(() => {
        if (buttonsReder.length > 1) {
            let buttonPag: any = document.getElementsByClassName("button")[0]
            buttonPag.className = "bigButtons"
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonsReder])


    const RefreshAfter = (e?: any) => {
        let buton: any = e.target.previousElementSibling.firstChild
        buton.click()
    }

    const RefreshNext = (e?: any) => {

        let buton2: any = e.target.previousElementSibling.previousElementSibling.lastChild
        buton2.click()
    }


    /////


    const getPokemonDinamic = async (numero?: "0") => { //llamar los primeros pokemon

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${numero}&limit=4`);

        const data: any = await response.data;



        const arra: any = data.results.map((x: any) => x.name)


        let array: any = [];
        arra.map(async (x: any) => {


            const response: any = await axios.get(`https://pokeapi.co/api/v2/pokemon/${x}`)
            const data: any = await response.data



            let obj: any = {
                name: data.name,
                img: `https://play.pokemonshowdown.com/sprites/xyani/${data.name}.gif`,
                tipos: data.types.map((type: any) => { return type.type.name }),
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                id: data.id,
                color: data.color,
            }
            array.push(obj)
        })
        setPokemoData(array);


    }


    // useEffect(() => {

    //     return () => {
    //         gedApiStats()
    //     }


    // }, [pokemonData])


    // useEffect(() => {
    //     setTimeout(() => {
    //         let g: any = document.getElementById("Refresh")
    //         g.click()
    //     }, 100)
    // }, [])


    useEffect(() => {

        pokemoData && getButtunsArray()
        getPokemonDinamic()

    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [seturl])

    return (
        <div>
            <div>
                {
                    buttonsReder && buttonsReder.slice(sliceParams.inicial, sliceParams.limite).map((buttonString: string, index: number) => {
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
                                className="button" id={index.toString()} key={(parseInt(buttonString, 10) - 1)}>{buttonString}</button>
                        )
                    })
                }
            </div>
            <button id="Refresh" type="submit" onClick={(e: any) => { RefreshAfter(e) }}>{`<<<`}</button>
            <button id="" type="submit" onClick={(e: any) => { RefreshNext(e) }}>{`>>>`}</button>
            <div>

                {


                    pokemonData.length > 0 && pokemonData.map((pokemon: any, index: number) => {

                        return (
                            <div key={index}>
                                <img src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`} alt="" />
                                <h1>{pokemon.name}</h1>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
