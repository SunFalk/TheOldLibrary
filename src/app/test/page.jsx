import style from './page.module.css';

export default function Test() {

    return (
        <div className={`${style.container}`}>
            <div className={`${style.imgContainer}`}>
                <div className={`${style.clipContainer}`}>
                <img src="/games/covers/ML_cover.jpg" alt="" className={`${style.img}`} />
                </div>
            </div>
        </div>
    )
}