import LogoAnimated from "@/app/_components/logo-animated";
import { render, screen } from "@testing-library/react";

describe("LogoAnimated", () => {
  it("should render react logo for navbar", () => {
    render(<LogoAnimated type={"navbar"} />);

    const reactLogoContainer = screen.getByRole("logo");
    expect(reactLogoContainer).toBeInTheDocument();
    expect(reactLogoContainer).toHaveClass("react-logo-container-nav");
  });

  it("should render react logo for hero", () => {
    render(<LogoAnimated type={"hero"} />);

    const reactLogoContainer = screen.getByRole("logo");
    expect(reactLogoContainer).toBeInTheDocument();
    expect(reactLogoContainer).toHaveClass("react-logo-container");
  });
});
