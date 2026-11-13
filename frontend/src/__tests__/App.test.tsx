import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("HandleHunt App", () => {
  it("renders the navbar with HandleHunt branding and links", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const nav = screen.getByRole("navigation");
    expect(within(nav).getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /faqs/i })).toBeInTheDocument();
    expect(screen.getAllByText(/HandleHunt/i).length).toBeGreaterThan(0);
  });

  it("renders the search input and search button on the home page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(
      screen.getByPlaceholderText(/Enter username/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search/i })
    ).toBeInTheDocument();
  });

  it("renders supported platform cards in the grid", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // Platform cards
    expect(screen.getAllByText("GitHub").length).toBeGreaterThan(0);
    expect(screen.getByText("Reddit")).toBeInTheDocument();
    expect(screen.getByText("YouTube")).toBeInTheDocument();
    expect(screen.getByText("Twitch")).toBeInTheDocument();
    expect(screen.getByText("Discord")).toBeInTheDocument();
  });
});
