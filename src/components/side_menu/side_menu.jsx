'use client';

import style from './side_menu.module.css';
import SideNavbar from './side_navbar/side_navbar';
import Overlay from '@components/menu_overlay/overlay';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

export default function SideMenu() {
    const [isActive, setIsActive] = useState(false);

    function openSideMenu() {
        setIsActive(true);
    };

    function closeSideMenu() {
        setIsActive(false);
    }
    
    return (
        <div>
            <button type='button' className={`${style.menuIcon}`} onClick={openSideMenu}><FaBars/></button>
            <Overlay isActive={isActive} closeCallback={closeSideMenu}>
                <div className={`${style.sideMenu} ${isActive ? style.open : style.closed}`}>
                    <SideNavbar items={[{type: "link", name: "Home", link: "/"}, {type: "dropdown", name: "Dropdown", items: [{name: "Home", link: "/"}]}]} isSideMenuOpen={isActive} />
                </div>
            </Overlay>
        </div>
    )
}