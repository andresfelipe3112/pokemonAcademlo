
import { useForm, SubmitHandler } from "react-hook-form";
import { FormValues } from "../interfaces/interfaceConstext"
import "../styles/login.css"
import PokemonLogo from "../styles/img/Pokémon_logo.svg.png"
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"

export default function Login() {
    let history = useHistory()

    const [dataInput, setDataInput] = useState<null | {}>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        sessionStorage.setItem("user", data.user);
        setDataInput(data)



    }

    useEffect((): any => {

        if (dataInput) {
            history.push("/pokedex")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataInput])


    return (
        <div className="ContainerLogin" >

            <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
                <label className="control-label">
                    <img className="pokemonLogo" src={PokemonLogo} alt="" />
                    Pokemon Trainer Name
                    <input {...register("user", {

                        required: {
                            value: true,
                            message: 'User´s name is requerided'
                        },
                    })}
                        placeholder="ej: Andres Felipe" />

                    {errors?.user && <p>{errors.user.message}</p>}

                    <button className="button_Sumit_Login" type="submit">Sing In</button>

                </label>
            </form>
        </div >
    )
}

