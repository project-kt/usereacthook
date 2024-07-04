import Navbar from "@/app/_components/navbar";
import { render, screen } from "@testing-library/react";

describe("Navbar", () => {
  it.skip("should render all the components", () => {
    const { getComponents } = renderComponent();

    const { section } = getComponents();

    expect(section).toBeInTheDocument();
  });
});

const renderComponent = () => {
  render(<Navbar />);

  const section = screen.getByRole("navbar");

  return {
    getComponents: () => ({
      section
    })
  };
};
