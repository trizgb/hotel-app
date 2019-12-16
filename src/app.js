import * as React from 'react';
import './app.scss';
import requestAPI from './modules/services/service';


const App = () => {

    const [hotel, setHotel] = React.useState(0);
    const [checkinDate, setCheckinDate] = React.useState('');
    const [nights, setNigths] = React.useState(0);
    const [availableRates, setAvailableRates] = React.useState([]);
    const [feedbackMessage, setFeedbackMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)


    function getHotelFromApi() {
        setLoading(true)

        requestAPI(hotel, checkinDate, nights)
            .then(response => {
                console.log(response.availableRates[hotel])
                setAvailableRates(response.availableRates[hotel])
            })
            .catch(console.error)
            .finally(setLoading(false))
    }

    function changeDateFormat(date) {
        let splitDate = date.split('-');

        if (splitDate.count === 0) {
            return null;
        }

        let year = splitDate[0];
        let month = splitDate[1];
        let day = splitDate[2];

        return day + '/' + month + '/' + year;
    }

    function getCurrentDate() {
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        return day + '/' + month + '/' + year;
    }

    function onSubmit(e) {

        if (!!hotel && !!checkinDate && !!nights) {

            if (checkinDate >= getCurrentDate) {
                getHotelFromApi();
            } else {
                setFeedbackMessage('Introduzca una fecha valida. Ésta tiene que ser igual o superior al día actual. ☺️');
            }

            if (nights > 0 && nights < 30) {
                getHotelFromApi();
            } else {
                setFeedbackMessage('Introduzca entre 1 y 30 noches. ☺️');
            }

        } else {
            setFeedbackMessage('Complete todos los campos, por favor. ☺️');
        }

        e.preventDefault();
    }


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
                    <form>
                        <div>
                            <label></label>
                            <select onChange={(e) => setHotel(e.currentTarget.value)}>
                                <option defaultValue>Choose an option</option>
                                <option value={44069509}>Hotel Baqueira Val de Neu</option>
                                <option value={100376478}>Hotel Grand Luxor</option>
                                <option value={10030559}>Hotel Moderno</option>
                            </select>
                        </div>
                        <div>
                            <label></label>
                            <input type="date" placeholder={'Check-in'} onChange={(e) => setCheckinDate(changeDateFormat(e.currentTarget.value))} />
                        </div>
                        <div>
                            <label></label>
                            <input type="number" placeholder={'Número de noches'} onChange={(e) => setNigths(e.currentTarget.value)} />
                        </div>
                        <input type={'submit'} onClick={onSubmit} value={'Buscar'} />
                    </form>
                </section>
                <section className={'results'}>
                    <h2>Resultados de su búsqueda</h2>
                    {
                        availableRates
                            ? <div>
                                <ul>
                                    {availableRates.map((rates, i) =>
                                        <li key={i}>
                                            <ul>
                                                <li>
                                                    <h3>Nombre de la habitación</h3>
                                                    {rates.roomName}
                                                </li>
                                                {rates.offerName ?
                                                    <li>
                                                        <h4>Nombre de la oferta</h4>
                                                        {rates.offerName}
                                                    </li>
                                                    : ''}

                                                <li>
                                                    <h4>Régimen</h4>
                                                    {rates.boardName}
                                                </li>
                                                <li>
                                                    <h4>Ocupación</h4>
                                                    {rates.occupancy.numAdults}
                                                    {rates.occupancy.numChilds}
                                                    {rates.occupancy.numBabies}
                                                </li>
                                                <li>
                                                    <h4>Precio neto</h4>

                                                    {}
                                                </li>
                                            </ul>
                                        </li>)}
                                </ul>
                            </div>
                            : 'Lo sentimos, no hay tarifas disponibles'
                    }

                </section>
            </main >
        </div >

    )
}

export default App;
