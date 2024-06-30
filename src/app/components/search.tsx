"use client";

import React, { useState, useEffect } from "react";

function Search(props: any) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Load the saved username from localStorage if available
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    // Save the username to localStorage
    localStorage.setItem("username", username);
    // Implement your search functionality here
    console.log("Searching for:", username);
  }

  async function searchSites(e: any) {
    // Implement any additional search functionality if needed
  }

  async function handleChange(event: any) {
    const value = event.target.value;
    setUsername(value);
    event.preventDefault();
  }

  return (
    <div>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          id="inputBox"
          className="form-control me-2"
          name="inputBox"
          onChange={handleChange}
          value={username}
          placeholder="Search a username......"
        />
        <button
          id="searchBtn"
          className="btn btn-primary"
          onClick={searchSites}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
