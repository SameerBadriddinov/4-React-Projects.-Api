function Header() {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          React Shop
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="#">REPO</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
