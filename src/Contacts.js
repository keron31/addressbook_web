import React, { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import Header from "./PartialPages/HeaderPartialPage";
import Footer from "./PartialPages/FooterPartialPage";
import requestToApi from "./hooks/requestToApi";
import { variables } from "./Variables";
import Swal from "sweetalert2";

export default function Contacts() {
    const location = useLocation();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            const response = await requestToApi(variables.GET_CONTACTS_URL, "GET", null, false);
            if (response) {
                setContacts(response);
            }
        }
        getContacts();
    }, []);

    const DisplayContactsTable = () => {
        if (contacts.length === 0) {
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
                                    <Link className="btn btn-primary" to={`/details-contact/${contact.id}`} >Details</Link>
                                    <Link className="btn btn-primary" to={`/edit-contact/${contact.id}`}>Edit</Link>
                                    <button className="btn btn-danger" onClick={() => deleteContact(contact.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }

    // Delete category
    const deleteContact = async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async result => {
                if (result.isConfirmed) {
                    const responseToDelete = await requestToApi(variables.DELETE_CONTACT_URL + id, 'DELETE', null, true);
                    if (responseToDelete) {
                        Swal.fire(
                            'Deleted!',
                            'Your category has been deleted.',
                            'success'
                        )
                        const response = await requestToApi(variables.GET_CONTACTS_URL, 'GET', null, false);
                        if (response) {
                            setContacts(response);
                        }
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="app sidebar-mini ltr light-mode">
                <div className="page">
                    <div className="page-main">
                        <Header />
                        <div className="main-content mt-0">
                            <Outlet key={location.pathname} />
                            <div className="side-app">
                                <div className="main-container container-fluid" style={{ marginTop: '80px' }}>
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
                            <Link to="/new-contact" className="btn btn-primary btn-block float-end my-2">
                                <i className="fa fa-plus-square me-2"></i>
                                Add new contact
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </div>
                <a href="#top" id="back-to-top"><i className="fa fa-angle-up"></i></a>
            </div>
        </div>
    );
}