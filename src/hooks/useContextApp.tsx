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
