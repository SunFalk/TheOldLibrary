import style from './search_game_link.module.css'
import Link from 'next/link';

export default function SearchGameLink( {game} ) {
    const img_path = "/games/covers/";
    return (       
        <li className={`${style.listItem}`}>
            <Link href={`/games/${game.name.replace(/ /g, '-')}`} className={`${style.link}`}>
                <div className={`${style.imgContainer}`}>
                    <div className={`${style.clipContainer}`}>
                        <img src={img_path + game.coverImg} alt="" className={`${style.img}`}/> 
                    </div>
                </div>
                <div className={`${style.infoContainer}`}>
                    <div className={`${style.titleContainer}`}>
                        <h3 className={`${style.title}`}>{game.name}</h3>
                    </div>
                    <div className={`${style.genresContainer}`}>
                        
                    </div>
                </div>
            </Link>
        </li>
    )
}