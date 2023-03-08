import React, { useState, useEffect } from "react";
import { variables } from "./Variables";
import requestToApi from "./hooks/requestToApi";
import Swal from "sweetalert2";

export default function NewContact() {
    const NAME_OF_THE_CATEGORY_THAT_ALLOWS_YOU_TO_ENTER_YOUR_SUBCATEGORY = "Inny";
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [showSubCategoryInput, setShowSubCategoryInput] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await requestToApi(variables.GET_CATEGORIES_URL, "GET", null, true);
            if (result) {
                setCategories(result);
                console.log(result);
            }
        };
        fetchData();
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [phone, setPhone] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        var body = {
            firstName, lastName, email, password, category, phone, dateOfBirth
        };

        if (selectedSubCategory !== "") {
            body.subCategory = selectedSubCategory;
        }

        var response = await requestToApi(variables.ADD_CONTACT_URL, "POST", body, true);

        if (response) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Contact added!",
            });
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
        setCategory(e.target.value);
        const selectedCategory = categories.find((x) => x.id === e.target.value);
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

        if (selectedCategory.name === NAME_OF_THE_CATEGORY_THAT_ALLOWS_YOU_TO_ENTER_YOUR_SUBCATEGORY) {
            setShowSubCategoryInput(true);
        } else {
            setShowSubCategoryInput(false);
        }
        setSelectedSubCategory("");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center">Add New Contact</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="Enter first name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" placeholder="Enter last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select className="form-control" id="category" onChange={handleCategoryChange} required>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                ))}
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
                            <input type="text" className="form-control" id="phone" placeholder="Enter phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" className="form-control" id="dateOfBirth" placeholder="Enter date of birth" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={() => window.location.href = "/"}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}