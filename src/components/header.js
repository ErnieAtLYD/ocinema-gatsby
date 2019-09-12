import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"
import ("./style.scss")

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        wordpressSiteMetadata {
          name
        }
        wordpressMenusMenusItems(name: {eq: "Main Navigation"}) {
          items {
            title
            object
            url
          }
        }
      }
    `}
    render={data => (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-item"
          >
            {data.wordpressSiteMetadata.name}
          </Link>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            {data.wordpressMenusMenusItems.items.map((item, index) => (
              <a
                className="navbar-item"
                href={item.url}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>

      </nav>
    )}
  />
)

export default Header
