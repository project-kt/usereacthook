import Hero from "@/app/_components/hero";
import { siteConfig } from "@/config/site";
import { NAVBAR_LINKS } from "@/lib/constats";
import { render, screen } from "@testing-library/react";

describe("Hero", () => {
  it("renders the hero section and its components", () => {
    const { getComponents } = renderComponent();

    const { hero, h1, h2, docsLink, githubLink } = getComponents();

    expect(hero).toBeInTheDocument();
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute("href", NAVBAR_LINKS.Documentation);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", siteConfig.links.github);
  });
});

const renderComponent = () => {
  render(<Hero />);

  const hero = screen.getByRole("hero");
  const h1 = screen.getByRole("heading", { level: 1, name: /collection of react hooks/i });
  const h2 = screen.getByRole("heading", { level: 2, name: /find and copy expertly crafted custom hooks/i });
  const docsLink = screen.getByRole("link", { name: /documentation/i });
  const githubLink = screen.getByRole("link", { name: /github/i });

  return {
    getComponents: () => ({
      hero,
      h1,
      h2,
      docsLink,
      githubLink
    })
  };
};
