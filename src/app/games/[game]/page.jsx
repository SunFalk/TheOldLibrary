import db from '@utils/db';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import style from './page.module.css';

export default async function Game({ params }) {
    const cover_dir = "/games/covers/";
    const {game} = await params;
    const gameName = normalFormat(game);
    console.log(gameName);
    const [result] = await db.query(`SELECT * FROM games WHERE name = ?;`, [gameName]);
    let cover_path = ""

    if (result.length === 0) {
        notFound();
    } else {
        cover_path = cover_dir + result[0].coverImg;
    };

    function normalFormat(text) {
        const newText = text.replace(/[_-]/g, ' ')
        return newText;
    }

    return (
        <div className={style.panelWrapper}>
            <div className={`${style.imagePanel}`}>
                <Suspense fallback={<Loading />}>
                    <img src={cover_path} />
                </Suspense>
            </div>
            <div className={`${style.infoPanel}`}>
                <span className={`${style.section}`}>Title: <span>{result[0].name}</span></span>
                <span className={`${style.section}`}>Description: <span>{result[0].description}</span></span>
                <span className={`${style.section}`}>About: <span>{result[0].info}</span></span>
            </div>
        </div>
    )
};

function Loading() {
    return (
        <span>Loading...</span>
    )
}