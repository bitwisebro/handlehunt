"use client";

import React, { useState, useEffect } from "react";
import { checker } from "../handlers/Checker";

function Search(props: any) {
  const [username, setUsername] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Load the saved username from localStorage if available
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  async function handleSubmit(event: any) {
    event.preventDefault();
    localStorage.setItem("username", username);
    console.log("Searching for:", username);
  }

  async function handleSearch(e: any) {
    e.preventDefault();
    localStorage.setItem("username", username);
    const isAvailable = await checker(username, "github");
    console.log(`${username} isAvailable: ${isAvailable}`);
    setIsAvailable(isAvailable);
    setShowResult(true);
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
          onClick={handleSearch}
          type="submit"
        >
          Search
        </button>
      </form>
      {showResult && isAvailable !== null && (
        <p id="githubcheck">
          {isAvailable ? "Username is available" : "Username is not available"}
        </p>
      )}
    </div>
  );
}

export default Search;
