import style from './search_result.module.css';
import SearchGameLink from '@components/search/search_game_link';

export default function searchResult( {results, search} ) {
    if (results.length === 0) {
        return(
            <div className={`${style.warningContainer}`}>
                <span className={`${style.warning}`}>No games found matching: <span className={`${style.search}`}>{search}</span></span>
            </div>
        )
    };
    
    return(
        <div className={`${style.container}`}>
            <ul className={`${style.list}`}>
                {results.map((game, i) => {
                    return(
                        <SearchGameLink key={`${game.name}${i}`} game={game}/>
                    )
                })}
            </ul>
        </div>
    )
}