'use client';
import * as React from 'react';
import NextLink from 'next/link';
import { Link } from 'react-scroll';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import { Icons } from '@config';
import { getHeaderOffset } from '@utils';

import './styles.scss';

type NavItem = 'home' | 'blogs';

const NAV_ITEMS = ['home', 'portfolio'];

export const Header = () => {
  const [activeItem, setActiveItem] = React.useState<NavItem>('home');
  const [offset, setOffset] = React.useState<number>(0);

  React.useEffect(() => {
    setOffset(getHeaderOffset());
  }, []);

  const handleLeftClick = () => {
    setActiveItem(
      (prev) =>
        NAV_ITEMS[
          Math.max(NAV_ITEMS.findIndex((item) => item === prev) - 1, 0)
        ] as NavItem
    );
  };

  const handleRightClick = () => {
    setActiveItem(
      (prev) =>
        NAV_ITEMS[
          Math.min(
            NAV_ITEMS.findIndex((item) => item === prev) + 1,
            NAV_ITEMS.length - 1
          )
        ] as NavItem
    );
  };

  console.log(activeItem);

  return (
    <header id="header" className="header">
      <div className="header__container">
        <NextLink
          href="/"
          className="header__logo"
          dangerouslySetInnerHTML={{
            __html: `<div>${Icons['logo-fill']}${Icons['logo-bold']}</div>`,
          }}
        />
        <nav className="header__nav">
          <Link
            to={
              NAV_ITEMS[
                Math.max(
                  NAV_ITEMS.findIndex((item) => item === activeItem) - 1,
                  0
                )
              ] as NavItem
            }
            spy
            smooth
            duration={250}
            offset={offset}
            disabled={NAV_ITEMS[0] === activeItem}
            onClick={handleLeftClick}
            className={`header__nav-arrow header__nav-arrow--left${NAV_ITEMS[0] === activeItem ? ' header__nav-arrow--disabled' : ''}`}
          >
            <IoIosArrowBack />
          </Link>
          <div className="header__nav-container">
            <ul className={`header__list header__list--${activeItem}`}>
              <li className="header__item">
                <NextLink href="/" className="header__link">
                  <span>01.</span>
                  <span>home</span>
                </NextLink>
              </li>
              <li className="header__item">
                <NextLink
                  href="https://dhunanyan.com"
                  target="_blank"
                  className="header__link"
                >
                  <span>02.</span>
                  <span>portfolio</span>
                </NextLink>
              </li>
            </ul>
          </div>
          <Link
            to={
              NAV_ITEMS[
                Math.min(
                  NAV_ITEMS.findIndex((item) => item === activeItem) + 1,
                  NAV_ITEMS.length - 1
                )
              ] as NavItem
            }
            spy
            smooth
            duration={250}
            offset={offset}
            disabled={NAV_ITEMS[NAV_ITEMS.length - 1] === activeItem}
            onClick={handleRightClick}
            className={`header__nav-arrow header__nav-arrow--right${NAV_ITEMS[NAV_ITEMS.length - 1] === activeItem ? ' header__nav-arrow--disabled' : ''}`}
          >
            <IoIosArrowForward />
          </Link>
        </nav>

        <NextLink
          href="/pdfs/dhunanyan-cv-english.pdf"
          target="_blank"
          className={`header__cv${NAV_ITEMS[0] === activeItem ? ' header__cv--active' : ''}`}
        >
          CV
        </NextLink>
      </div>
    </header>
  );
};
