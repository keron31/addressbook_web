import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import requestToApi from "./hooks/requestToApi";
import { variables } from "./Variables";
import Swal from "sweetalert2";
import moment from "moment";

export default function EditContact() {
    let { id } = useParams();

    const [contact, setContact] = useState({});
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [showSubCategoryInput, setShowSubCategoryInput] = useState(false);

    useEffect(() => {
        const getContactAndCategories = async () => {
            const responseToGetContact = await requestToApi(variables.GET_CONTACT_BY_ID_URL + id, "GET", null, true);
            const responseToGetCategories = await requestToApi(variables.GET_CATEGORIES_URL, "GET", null, true);
            if (responseToGetContact && responseToGetCategories) {
                setContact(responseToGetContact);
                console.log(responseToGetContact)
                setCategories(responseToGetCategories);
            }
        }
        getContactAndCategories();
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    if (contact.id && !firstName) {
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setEmail(contact.email);
        setPassword(contact.password);
        setCategory(contact.category);
        setSelectedSubCategory(contact.subCategory);
        if (contact.subCategory !== "" || contact.subCategory !== null || contact.subCategory !== undefined) {
            categories.forEach(category => {
                if (category.name === contact.category && category.subCategoryNames) {
                    setSubCategories(category.subCategoryNames);
                    setShowSubCategoryInput(false);
                } else {
                    setShowSubCategoryInput(false);
                    setSubCategories([]);
                }
            });
            if (contact.category === variables.NAME_OF_THE_CATEGORY_THAT_ALLOWS_YOU_TO_ENTER_YOUR_SUBCATEGORY) {
                setShowSubCategoryInput(true);
            } else {
                setShowSubCategoryInput(false);
            }
        }
        setPhone(contact.phone);
        setDateOfBirth(moment(contact.dateOfBirth).format("YYYY-MM-DD"));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        var body = {
            firstName, lastName, email, password, category, phone, dateOfBirth
        };

        if (selectedSubCategory !== contact.subCategory) {
            body.subCategory = selectedSubCategory;
        }

        var response = await requestToApi(variables.EDIT_CONTACT_URL + id, "PUT", body, true);

        if (response) {
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }

    const handleCategoryChange = async (e) => {
        const selectedCategory = categories.find((x) => x.name === e.target.value);
        setCategory(selectedCategory.name);
        if (
            selectedCategory &&
            selectedCategory.subCategoryNames
        ) {
            setSubCategories(selectedCategory.subCategoryNames);
            setShowSubCategoryInput(false);
        } else {
            setShowSubCategoryInput(false);
            setSubCategories([]);
        }

        if (selectedCategory.name === variables.NAME_OF_THE_CATEGORY_THAT_ALLOWS_YOU_TO_ENTER_YOUR_SUBCATEGORY) {
            setShowSubCategoryInput(true);
        } else {
            setShowSubCategoryInput(false);
        }
        setSelectedSubCategory("");
    };

    const DisplayCategoryAndSubCategory = () => {
        if (categories.length > 0) {
            return (
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-control" id="category" defaultValue={category} onChange={handleCategoryChange}>
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center">Edit contact</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" className="form-control" id="firstName" defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" className="form-control" id="lastName" defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select className="form-control" id="category" value={category} onChange={handleCategoryChange}>
                                {categories.map(category => <option key={category.name} value={category.name}>{category.name}</option>)}
                            </select>
                        </div>
                        {showSubCategoryInput && (
                            <div className="form-group">
                                <label htmlFor="subCategory">Sub Category</label>
                                <input type="text" className="form-control" id="subCategory" placeholder="Enter sub category" value={selectedSubCategory} onChange={e => setSelectedSubCategory(e.target.value)} required />
                            </div>
                        )}
                        {subCategories.length > 0 && (
                            <div className="form-group">
                                <label htmlFor="subCategory">Sub Category</label>
                                <select
                                    className="form-control"
                                    id="subCategory"
                                    onChange={e => setSelectedSubCategory(e.target.value)}
                                    required
                                    value={selectedSubCategory}
                                >
                                    {subCategories.map((subCategory, index) => (
                                        <option key={index} value={subCategory}>
                                            {subCategory}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        )}
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" id="phone" defaultValue={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of birth</label>
                            <input type="date" className="form-control" id="dateOfBirth" defaultValue={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/" className="btn btn-danger">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}