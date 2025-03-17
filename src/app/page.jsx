// Home page

import style from './page.module.css';

export const metadata = {
    title: 'Home'
};

export default function Home() {
    return (
        <div>
            <div className='panel'>
                <h1 style={{textAlign: "center", color: 'var(--border-color)', padding: '30px 0px'}}>
                    Wellcome to The Old Library
                </h1>
                <div style={{width: '40%', margin: '0 5%'}}>
                    <p>Here you can find usefull informations about any old game.</p>
                </div>
            </div>
        </div>
    )
};