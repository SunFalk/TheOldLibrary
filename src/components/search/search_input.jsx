'use client';

import style from './search_input.module.css';

export default function SearchInput() {
    function search(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const input = e.target.value;
            if (input.length === 0) {return};
            const queryString = new URLSearchParams({search: input}).toString();
            window.location.href = `/search?${queryString}`;
        }
    }

    return (
        <>
            <input 
            type="search" 
            id="searchInput" 
            className={`${style.input}`} 
            autoComplete='off' 
            placeholder='Search your favorite games' 
            spellCheck="false"
            onKeyDown={search}
            />
        </>
    )
}