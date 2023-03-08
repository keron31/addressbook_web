import React from "react";

export default function Footer() {
    return (
        <React.Fragment>
            <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="text-lg-start text-center">
                                <p className="mb-0">2023 © Address Book</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <ul className="list-unstyled text-lg-end text-center mb-0">
                                <li className="list-inline-item"><a href="
                                ">Norbert Boguski</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}