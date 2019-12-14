import * as React from 'react';
import './app.scss';
import requestAPI from './modules/services/service';


const App = () => {

    const [hotel, setHotel] = React.useState(10030559);
    const [checkinDate, setCheckinDate] = React.useState('01/01/2020');
    const [nights, setNigths] = React.useState(2);


    function getHotelFromApi() {
        requestAPI(hotel, checkinDate, nights)
            .then(response => {
                console.log(response)
            })
    }

    function selectHotel(e) {
        if (e.currentTarget.value === 44069509) {
            setHotel(44069509)
        }
        e.preventDefault();
    }


    // recoger los datos de los inputs, y al dar a buscar que haga la petición,
    // hacer un currentDate new Date

    return (
        <div className="app">
            <header className="app-header">
                <div className="app-header__wrapper" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img style={{ width: '110px', height: '43px' }} src={'assets/images/xlogo-mirai-es.png'} alt="logo" />
                    <div>
                        <h1>Encuentra la opción más barata</h1>
                    </div>
                </div>

            </header>
            <main>
                <section className={'form'}>
                    <h2>Select your hotel</h2>
                    <div>
                        <div>
                            <label htmlFor={'baqueira-hotel'}>
                                <span>Hotel Baqueira Val de Neu</span>
                                <input id={'baqueira-hotel'} type="radio" value={44069509} name={'hotel'} onChange={selectHotel} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <span>Hotel Grand Luxor</span>
                                <input type="radio" value={100376478} name={'hotel'} onChange={selectHotel} />
                            </label>
                        </div>
                        <div>
                            <label>
                                <span>Hotel Moderno</span>
                                <input type="radio" value={10030559} name={'hotel'} onChange={selectHotel} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <input type="date" placeholder={'Check-in'} />
                    </div>
                    <div>
                        <input type="number" placeholder={'Número de noches'} />
                    </div>
                    <input type="submit" onClick={getHotelFromApi} />
                </section>
            </main >
        </div >

    )
}

export default App;
