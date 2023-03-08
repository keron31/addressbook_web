import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import Header from "./PartialPages/HeaderPartialPage";
import Footer from "./PartialPages/FooterPartialPage";
import requestToApi from "./hooks/requestToApi";
import { variables } from "./Variables";

export default function Home() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            const response = await requestToApi(variables.GET_CONTACTS_URL, "GET", null, false);
            if (response) {
                console.log(response);
                setContacts(response);
            }
        }
        getContacts();
    }, []);

    const DisplayContactsTable = () => {
        if(contacts.length === 0) {
            return <h1>No contacts</h1>
        }
        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className="text-center align-middle">#</th>
                        <th className="text-center align-middle">First Name</th>
                        <th className="text-center align-middle">Last Name</th>
                        <th className="text-center align-middle">Email</th>
                        <th className="text-center align-middle">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center align-middle">{index + 1}</td>
                                <td className="text-center align-middle">{contact.firstName}</td>
                                <td className="text-center align-middle">{contact.lastName}</td>
                                <td className="text-center align-middle">{contact.email}</td>
                                <td className="text-center align-middle">
                                    <button className="btn btn-primary">Details</button>
                                    <button className="btn btn-primary">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }

    return (
                <div>
            <div className="app sidebar-mini ltr light-mode">
                <div className="page">
                    <div className="page-main">
                        <Header />
                        <div className="main-content mt-0">
                            <Outlet />
                            <div className="side-app">
                                <div className="main-container container-fluid" style={{marginTop:'80px'}}>
                                    <div className="col-md-12 col-lg-12 col-xl-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Contacts</h3>
                                            </div>
                                            <div className="card-body">
                                                <DisplayContactsTable />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                <a href="#top" id="back-to-top"><i className="fa fa-angle-up"></i></a>
            </div>
        </div>
    );
}