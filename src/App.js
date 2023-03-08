import React from "react";
import { Buffer } from "buffer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacts from "./Contacts";
import NewContact from "./NewContact";
import DetailsContact from "./DetailsContact";
import EditContact from "./EditContact";

function App() {
  const accessToken = sessionStorage.getItem('accessToken') ? Buffer.from(sessionStorage.getItem('accessToken'), 'base64').toString() : null;

  if (!accessToken) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Contacts />} />
          <Route path="*" element={<Contacts />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Contacts />} >
          <Route path="new-contact" element={<NewContact />} />
          <Route path="details-contact/:id" element={<DetailsContact />} />
          <Route path="edit-contact/:id" element={<EditContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
