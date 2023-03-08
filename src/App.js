import React from "react";
import { Buffer } from "buffer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacts from "./Contacts";
import NewContact from "./NewContact";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
