import React, { useEffect, useMemo, useContext } from 'react';
import { useState } from "react";
import axios from 'axios';

//interface typeScript
import { getAPI, urlInterface, } from "../interfaces/interfaceConstext"






const usuarioContext = React.createContext<any | null>(null); // Se crea el contexto

export function UsuarioProvider(props?: any) { // props son opcionales si es que se necesitan

    //variables Para typar Estados
    const objUrl: urlInterface = {
        urlActual: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=4",
        nextUrl: "",
        prevUrl: "",
    }

    //useState
    const [pokemonData, setPokemoData] = useState<any>({});
    const [url, seturl] = useState(objUrl);
    const [buttonsReder, setbuttonsReder] = useState<any>(1)


    let array: any = [];






    //functions

    const getPokemonDinamic = async (numero: string) => { //llamar los primeros pokemon

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${numero}&limit=4`);
        const data: getAPI = await response.data;
        const arra: any = data.results.map((x) => x.name)


        arra.map(async (x: any) => {
            const response: any = axios.get(`https://pokeapi.co/api/v2/pokemon/${x}`)

            //     return {
            //        name: info.data.name,
            //        img: `https://play.pokemonshowdown.com/sprites/xyani/${info.data.name}.gif`,
            //        tipos: info.data.types.map((type) => type.type.name),
            //        hp: info.data.stats[0].base_stat,
            //        attack: info.data.stats[1].base_stat,
            //        defense: info.data.stats[2].base_stat,
            //        speed: info.data.stats[5].base_stat,
            //        id: info.data.id
            //     }
            //  })

            array.push(response)
        })
        let dataFinaly: any = await Promise.all(array)
        setPokemoData(dataFinaly)


    }



    //llamar anterior pokemon
    const getAPI_Previus = async () => {
        const response = await axios.get(url.prevUrl);
        const data: getAPI = await response.data;
        setPokemoData(data.results);
        // console.log(data);
        const obj = {
            urlActual: url.nextUrl,
            nextUrl: data.next,
            prevUrl: data.previous === null ? "" : data.previous,
        }
        seturl((prev: any) => {
            return {
                ...prev, ...obj
            }
        })
    }


    //llamar Botones
    const getButtunsArray = async () => {

        const response = await axios.get(url.urlActual);
        const data: getAPI = await response.data;
        const Buttunslength: Number | any = data.count;
        // console.log(Buttunslength);


        let numeros = []
        for (let index = 0; index < Buttunslength / 4 + 0.5; index++) {
            numeros.push((index + 1).toString())

        }

        setbuttonsReder(numeros)
    }



    //useMemo para que no se refresque imnecesariamente al actualizarse el DOM mejorano el performace

    const value = useMemo(() => {
        return ({

            url,
            getAPI_Previus,
            buttonsReder,
            pokemonData,
            getPokemonDinamic,

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonData, url, buttonsReder])



    //useEffect
    useEffect(() => {
        getButtunsArray()
        getPokemonDinamic("0")
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [seturl])

    return value
}


export const ProvideAuth = ({ children, ...props }: any) => {
    const auth = UsuarioProvider();
    return <usuarioContext.Provider value={auth} {...props} >{children}</usuarioContext.Provider> // props son opcionales si es que se necesitan
}


export const useAuth = () => useContext(usuarioContext)




// codigo reciclaje

//    //get API Initial
//    const getPokemonInitial = async () => { //llamar los primeros pokemon

//     // const response = await axios.get(url.urlActual);
//     // const data: getAPI = await response.data;



//     //meto los pokemon llamados en un array
//     const arra: any = data.results.map((x) => x.name)


//     let array: any = [];
//     arra.map(async (x: any) => {


//         const response: any = await axios.get(`https://pokeapi.co/api/v2/pokemon/${x}`)
//         const data: any = await response.data



//         let obj: any = {
//             name: data.name,
//             img: `https://play.pokemonshowdown.com/sprites/xyani/${data.name}.gif`,
//             tipos: data.types.map((type: any) => { return type.type.name }),
//             hp: data.stats[0].base_stat,
//             attack: data.stats[1].base_stat,
//             defense: data.stats[2].base_stat,
//             speed: data.stats[5].base_stat,
//             id: data.id,
//             color: data.color,
//         }
//         array.push(obj)
//     })
//     setPokemondataStats(array);

//     // const obj = {
//     //     nextUrl: data.next,
//     //     prevUrl: data.previous ? data.previous : "",
//     // }
//     // //se agrega la pagina siguiente y anterior
//     // seturl(prev => {
//     //     return {
//     //         ...prev, ...obj
//     //     }
//     // })




// }


// const color: any = async () => {

//     let arrayColors: any = [];

//     pokemonData.length > 0 && pokemonData.data.map(async (pokemon: any) => {
//         const response = axios.get(`https://pokeapi.co/api/v2/pokemon-color/${pokemon.id}`)

//         arrayColors.push(response)
//     })

//     let dataFinaly = await Promise.all(arrayColors)
//     setColors(dataFinaly)
// }