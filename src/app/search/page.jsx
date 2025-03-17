import {Suspense} from 'react';
import style from './page.module.css';
import SearchResult from '@components/search/search_result';


export default async function({searchParams}) {
    const params = await searchParams;
    const search = params.search;
    let games = [];

    await getGames();

    async function getGames() {
        if (search === undefined || search === '') {return};
        try {
            const res = await fetch('http://localhost:3000/api/search-game', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({search}),
            });
            const result = typeof res === 'undefined' ? [] : await res.json();
            
            games = result.length > 0 ? result : [];
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <>
            <SearchResult results={games} search={search}/>
        </>
    )
}