"use client";

import React, { useState, useEffect } from "react";
import { checker } from "../handlers/Checker";

function Search(props: any) {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState({github:null, reddit:null});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
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
    const isGithubAvailable = await checker(username, "github");
    const isRedditAvailable = await checker(username, "reddit");
    console.log(`${username} isAvailable: ${results}`);
    setResults({github:isGithubAvailable, reddit:isRedditAvailable});
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
      {showResult && results !== null && (
        <div id="results"> 
         <p id="githubcheck">
            GitHub: {results.github ? "Username is available" : "Username is not available"}
          </p>
        <p id="redditcheck">
            Reddit: {results.reddit ? "Username is available" : "Username is not available"}
          </p>
        </div>
        
      )}
    </div>
  );
}

export default Search;
