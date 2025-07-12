import { Icon } from "@iconify/react";
import React from "react";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer">
          <p>
            <Icon
              className="me-2"
              icon="humbleicons:location"
              color="#1e8a9b"
            />
            <span>
              <strong>innoscripta AG</strong>
            </span>{" "}
            - ArnulfstraBe 60, 80335 Munchen
          </p>
          <p>
            <Icon className="me-2" icon="tabler:world" color="#1e8a9b" />
            innoscripta.com
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
