import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import requestToApi from "../hooks/requestToApi";
import saveToSessionStorage from "../hooks/saveToSessionStorage";
import { variables } from "../Variables";
import { Buffer } from "buffer";

export default function Header() {
    // Register Variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");

    // Login Variables
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const loginHandleSubmit = async e => {
        e.preventDefault();

        var response = await requestToApi(variables.LOGIN_URL, "POST", { email: emailLogin, password: passwordLogin }, false);

        if ("accessToken" in response) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "You are logged in!",
            });
            saveToSessionStorage(response);
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const registerHandleSubmit = async e => {
        e.preventDefault();

        var response = await requestToApi(variables.REGISTER_URL, "POST", { firstName, lastName, email: emailRegister, password: passwordRegister }, false);

        if ("accessToken" in response) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "You are registered!",
            });
            saveToSessionStorage(response);
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const handleLogout = async () => {
        const response = await requestToApi(variables.LOGOUT_URL, 'POST', {
            accessToken: Buffer.from(sessionStorage.getItem('accessToken'), 'base64').toString(),
            refreshToken: Buffer.from(sessionStorage.getItem('refreshToken'), 'base64').toString()
        }, true);
        if (response) {
            sessionStorage.clear();
            window.location.href = "/";
        }
    };

    const DisplayLoggedOptions = () => {
        return (
            <div className="form-group text-center">
                <span className="text-xl-left">You are logged in!</span>
                <button className="btn btn-primary btn-lg" type="button" onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className="header">
                {sessionStorage.getItem('accessToken') ? (
                    <DisplayLoggedOptions />
                ) : (
                    <div className="form-group text-center">
                <button className="btn btn-primary btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={loginHandleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="loginEmail" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" onChange={(e) => setEmailLogin(e.target.value)} />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="loginPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="loginPassword" onChange={(e) => setPasswordLogin(e.target.value)} />
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg" type="button" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
                <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="registerModalLabel">Register</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={registerHandleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="registerFirstName" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="registerFirstName" onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="registerLastName" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="registerLastName" onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="registerEmail" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" onChange={(e) => setEmailRegister(e.target.value)} />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="registerPassword" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="registerPassword" onChange={(e) => setPasswordRegister(e.target.value)} />
                                    </div>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                )}
            </div>
        </React.Fragment>
    );
}