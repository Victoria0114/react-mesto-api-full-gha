import React from "react"

function Footer() {
    return (
        //add marking up footer
            <footer className="footer">
              <p className="footer__descr">© {new Date().getFullYear()} Mesto Russia</p>
            </footer>
    )
}

export default Footer