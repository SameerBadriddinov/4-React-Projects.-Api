import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Copyright Text
          <Link className="grey-text text-lighten-4 right" to="/">
            REPO
          </Link>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
