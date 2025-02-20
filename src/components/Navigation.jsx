import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  WalletMultiButton,
  WalletModalButton,
} from "@solana/wallet-adapter-react-ui";

import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineBook,
  AiOutlineFileUnknown,
  AiOutlineThunderbolt,
  AiOutlineDollarCircle,
} from "react-icons/ai";

function Navigation() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container fluid className="containerNavBar">
        <Navbar.Brand href="/" className="d-flex">
          <p style={{ marginTop: "15px" }}>
            <strong className="main-name"> D</strong>egen{" "}
            <strong className="main-name">B</strong>ounty{" "}
            <strong className="main-name">H</strong>unter
          </p>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/hunt"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineThunderbolt style={{ marginBottom: "2px" }} /> Hunt
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/roadmap"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFileUnknown style={{ marginBottom: "2px" }} /> Roadmap
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/Whitepaper"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineBook style={{ marginBottom: "2px" }} /> White paper
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/genZero"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineThunderbolt style={{ marginBottom: "2px" }} /> Gen
                <strong className="main-name">0</strong>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/claim"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineDollarCircle style={{ marginBottom: "2px" }} /> Claim
              </Nav.Link>
            </Nav.Item>

            {/*                <Nav.Item>
                  <Nav.Link>
                    <WalletMultiButton />
                  </Nav.Link>
                </Nav.Item>*/}
            <Nav.Item>
              <Nav.Link>
                {/* <button
                  className="btn-primary"
                  onClick={() => {
                    // Phantom Wallet
                    phantom_connect();
                  }}
                > */}
                <WalletMultiButton/>
                {/* </button> */}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function phantom_connect() {
  // Check for Solana & Phantom
  var provider = () => {
    if ("solana" in window) {
      var provider = window.solana;
      if (provider.isPhantom) {
        return provider;
      } else {
        return false;
      }
    }
    window.open("https://phantom.app", "_blank");
  };

  var phantom = provider();

  if (phantom !== false) {
    console.log("Phantom Wallet Found, Connecting..");

    try {
      // Connect to Solana
      var connect_wallet = phantom.connect();

      // After Connecting
      phantom.on("connect", () => {
        // Check Connection
        console.log("Phantom Connected: " + phantom.isConnected);

        // Get Wallet Address
        var wallet_address = phantom.publicKey.toString();
        console.log("Solana Wallet Address: " + wallet_address);
      });
    } catch (err) {
      console.log("Connection Cancelled!");
    }
  }
}
export default Navigation;
