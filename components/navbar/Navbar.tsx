import Container from "../global/Container";
import CartButton from "./CartButton";
import ModeToggle from "./ModeToggle";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import { Suspense } from "react";

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>

        <div className="flex gap-4 items-center">
          <CartButton />
          <ModeToggle />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
