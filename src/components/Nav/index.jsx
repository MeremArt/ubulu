/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";
import { CloseIcon, HamburgerMenu } from "../../assets";
import { useWindowSize } from "../../hooks";
import Logo from "../../assets/TitleLogo.png";
import { ReactComponent as Twitter } from "../../assets/Twitter-Icon.svg";
import { ReactComponent as Linkedin } from "../../assets/LinkedIn-Icon.svg";
import { ReactComponent as Instagram } from "../../assets/Instagram-Icon.svg";
import { NavLink } from "react-router-dom"; // Import NavLink

const LandingNav = () => {
  const [showWhiteNav, setShowWhiteNav] = useState(false);
  const [mobileIsLaunched, setMobileIsLaunched] = useState(false);

  const { width: windowWidth } = useWindowSize();

  const isMobile = useMemo(() => windowWidth < 1124, [windowWidth]);
  const NAV_ITEMS = useMemo(
    () =>
      !isMobile
        ? [
            { text: "Home", path: "/" },
            { text: "About", path: "/about" },
            { text: "Service", path: "/program" },
            { text: "Programs", path: "/talent" },
            { text: "Contact Us", path: "/contact" },
            { button: "Join Our Ecosystem", path: "/talent" },
          ]
        : [
            { text: "Home", path: "/" },
            { text: "About us", path: "/about" },
            { text: "Programs", path: "/programs" },
            { text: "Contact Us", path: "/contact" },
          ],
    [isMobile]
  );

  const handleLinkClick = () => {
    setMobileIsLaunched(false);
  };

  useEffect(() => {
    const toggleWhiteNav = () =>
      setShowWhiteNav(() => document.documentElement.scrollTop > 200);

    window.addEventListener("scroll", toggleWhiteNav);
    return () => window.removeEventListener("scroll", toggleWhiteNav);
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${isMobile ? styles.mobile : ""} ${
        showWhiteNav ? styles.white : ""
      }`}
    >
      {isMobile ? (
        <div className={styles.mobile_container}>
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className={styles.mobile_logo}
          >
            <img src={Logo} alt="logo" />
          </NavLink>
          <HamburgerMenu
            className={styles.hamburger_menu}
            onClick={() => setMobileIsLaunched((state) => !state)}
          />
        </div>
      ) : (
        <div className={styles.nav_links__container}>
          <ul
            className={`${styles.nav_links}  ${isMobile ? styles.mobile : ""}`}
          >
            {NAV_ITEMS.map((item, idx) => (
              <li className={`${styles.nav_link__item}`} key={idx}>
                {item.button ? ( // Check if it's a button
                  <button className={styles.joinButton}>
                    <NavLink to={item.path} onClick={handleLinkClick}>
                      {item.button}
                    </NavLink>
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    activeClassName={styles.active}
                    onClick={handleLinkClick}
                  >
                    {idx === 0 ? <img src={Logo} alt="logo" /> : item.text}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.social_links__container}>
            <a
              href="https://twitter.com/UbuluAfrica"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter className={styles.socials} />
            </a>
            <a
              href="https://www.linkedin.com/company/ubulu-africa"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className={styles.socials} />
            </a>
            <a
              href="https://www.instagram.com/Ubulu_africa/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram className={styles.socials} />
            </a>
          </div>
        </div>
      )}

      {isMobile && mobileIsLaunched && (
        <div className={styles.mobile_nav_links__container}>
          <CloseIcon
            className={styles.close_icon}
            onClick={() => setMobileIsLaunched((state) => !state)}
          />
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className={styles.mobile_nav_links__logo}
          >
            <img src={Logo} alt="logo" />
          </NavLink>

          <ul className={`${styles.mobile_nav_links}`}>
            {NAV_ITEMS.map((item, idx) => (
              <li className={`${styles.mobile_nav_link__item}`} key={idx}>
                <NavLink
                  to={item.path}
                  activeClassName={styles.active}
                  onClick={handleLinkClick}
                >
                  {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { LandingNav };
