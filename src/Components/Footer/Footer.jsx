import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; LyricsLog</p>
        <a href="https://github.com/CalebLovell/LyricsLog">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="github logo"/>
            <p>Link to GitHub Repo</p>
        </a>
        <div className="contact-info">
          <p>Made by Caleb Lovell</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
