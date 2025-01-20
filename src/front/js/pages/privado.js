import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Privado = () =>{
    const{actions,store} = useContext(Context)
    const navigate = useNavigate()
    const handleLogout = () => {
        actions.logOut(navigate)
    };

useEffect(()=>{
    if (localStorage.getItem("token") === null) {
    navigate("/")
    }
  actions.getPrivateData()
},[])
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header text-center bg-primary text-white">
                            <h3>Bienvenido usuario</h3>
                        </div>
                        <div className="card-body text-center">
                            <p className="mb-4">
                                Esta es la seccion privada de cada usuario donde se cargara contenido exclusivamente visible para el usuario.
                            </p>
                            <button 
                                className="btn btn-primary w-100" 
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};