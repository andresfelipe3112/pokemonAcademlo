import { useEffect, useRef } from 'react';
import { Route, Link } from 'react-router-dom'
import "../styles/protectorRouter.css"


type Props = {
    children: JSX.Element,
    props?: any
};


const ProtectedRoute = ({ children, ...props }: Props) => {
    const h1Ref = useRef<any>();


    useEffect(() => {
        if (typeof sessionStorage.getItem("user") === "string") {
        } else {
            setTimeout((e) => {
                h1Ref.current.click();
            }, 3000);
        }
    }, [])


    if (typeof sessionStorage.getItem("user") === "string") {
        return <Route {...props}> {children} </Route>
    }



    return (
        <div className="containerProtector">
            <div className="fondoNegro">
                <h1 className="control-h1" >please enter a pokemon trainer name</h1>
                <Link to='/login'>
                    <button ref={h1Ref} > ir a login</button>
                </Link>
            </div>
        </div>
    )



}

export default ProtectedRoute