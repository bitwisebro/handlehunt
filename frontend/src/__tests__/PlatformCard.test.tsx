import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PlatformCard } from "../components/PlatformCard";
import { PLATFORMS } from "../config/platforms";

describe("PlatformCard", () => {
  const redditPlatform = PLATFORMS.find((p) => p.id === "reddit")!;

  it("does not show Available when checkState has an error object", () => {
    render(
      <PlatformCard
        platform={redditPlatform}
        username="solobuilder"
        checkState={{
          available: false,
          error: "Unauthorized",
        }}
      />
    );

    expect(screen.queryByText("Available")).not.toBeInTheDocument();
    expect(screen.getByText("Check failed")).toBeInTheDocument();
  });

  it("shows Taken when checkState.available is false and error is empty", () => {
    render(
      <PlatformCard
        platform={redditPlatform}
        username="solobuilder"
        checkState={{
          available: false,
        }}
      />
    );

    expect(screen.getByText("Taken")).toBeInTheDocument();
    expect(screen.queryByText("Available")).not.toBeInTheDocument();
  });

  it("shows Available only when checkState.available is strictly true", () => {
    render(
      <PlatformCard
        platform={redditPlatform}
        username="availableusername123"
        checkState={{
          available: true,
        }}
      />
    );

    expect(screen.getByText("Available")).toBeInTheDocument();
  });
});
