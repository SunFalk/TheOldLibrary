'use client';

import style from './extendable_menu.module.css';
import { useState, useEffect } from 'react';
import { FaCaretDown as ExtendArrow } from 'react-icons/fa';

export default function ExtendableMenu({name, children, isSideMenuOpen}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isSideMenuOpen && isOpen) {
            setIsOpen(false);
        }
    }, [isSideMenuOpen])

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`${style.menu} ${isOpen ? style.open : ''}`}>
            <span className={`${style.expandButton}`} onClick={toggleMenu}>{name}<ExtendArrow /></span>
            <div className={`${style.menuContent}`}>
                {children}
            </div>
        </div>
    )
}