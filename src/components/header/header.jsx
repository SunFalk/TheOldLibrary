import style from './header.module.css';
import SideMenu from '@components/side_menu/side_menu';
import LoginWindow from '@components/login_window/login_window';
import SearchInput from '@components/search/search_input';
import Link from 'next/link';


export default function Header() {
    return (
        <header>
            <nav className={style.navbar}>
                <div className={style.headerLogo}>
                    <Link href="/">
                        <span className={style.logo}></span>
                        <span className={style.siteName}>The Old Library</span>
                    </Link>
                </div>
                <div className={style.headerSearch}>
                    <SearchInput/>
                </div>
                <div className={`${style.headerContent}`}>
                    <LoginWindow />
                    <SideMenu />
                </div>
            </nav>
        </header>
    )
}