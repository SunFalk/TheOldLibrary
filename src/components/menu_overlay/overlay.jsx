import style from './overlay.module.css';

export default function Overlay({isActive, closeCallback, fadeDuration, children}) {
    const fade = typeof fadeDuration === 'undefined' ? 0.7 : fadeDuration;
    return (
        <>
            <div className={`${style.overlayWrapper} ${isActive ? style.open : style.closed}`} style={{'--fade-duration': `${fade}s`}}>
                <div className={`${style.overlay}`} onClick={closeCallback}></div>
                {children}
            </div>
        </>
    )
}