import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import requestToApi from "./hooks/requestToApi";
import { variables } from "./Variables";
import moment from "moment";

export default function DetailsContact() {
    let {id} = useParams();

    const [contact, setContact] = useState({});

    useEffect(() => {
        const getContact = async () => {
            const response = await requestToApi(variables.GET_CONTACT_BY_ID_URL + id, "GET", null, true);
            if (response) {
                setContact(response);
            }
        }
        getContact();
    }, []);

    return (
        <div className="row">
            <div className="col-lg-12">
                    <div key={contact.id} className="card">
                        <div className="card-header">
                            <div className="card-title">Contact Details</div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="id">Id</label>
                                        <input type="text" readOnly className="form-control" id="id" placeholder="Enter id" value={contact.id} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="firstName">First Name</label>
                                        <input type="text" readOnly className="form-control" id="firstName" placeholder="Enter first name" value={contact.firstName} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                        <input type="text" readOnly className="form-control" id="LastName" placeholder="Enter name" value={contact.lastName} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input type="email" readOnly className="form-control" id="email" placeholder="Enter email" value={contact.email} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="category">Category Name</label>
                                        <input type="text" readOnly className="form-control" id="category" placeholder="Enter category" value={contact.category} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="subcategory">Subcategory</label>
                                        <input type="email" readOnly className="form-control" id="subcategory" placeholder="Enter subcategory" value={contact.subCategory === null || contact.subCategory === "" ? 'None' : contact.subCategory} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="phone">Phone Number</label>
                                        <input type="text" readOnly className="form-control" id="phone" placeholder="Enter phone number" value={contact.phone} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
                                        <input type="text" readOnly className="form-control" id="dateOfBirth" placeholder="Enter date of birth" value={moment(contact.dateOfBirth).format("DD/MM/YYYY")} />
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="col-md-12">
                                    <Link to={`/edit/${contact.id}`} className="btn btn-primary">Edit</Link>
                                    <Link to="/" type="reset" className="btn btn-warning float-end">Close</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}