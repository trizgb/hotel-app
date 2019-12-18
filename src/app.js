import * as React from 'react';
import './app.scss';
import requestAPI from './modules/services/service';
import ListItem from './compontes/list-item';


const App = () => {

    const [hotel, setHotel] = React.useState(0);
    const [checkinDate, setCheckinDate] = React.useState('');
    const [nights, setNigths] = React.useState(0);
    const [availableRates, setAvailableRates] = React.useState([]);
    const [feedbackMessage, setFeedbackMessage] = React.useState('');


    function getHotelFromApi() {

        requestAPI(hotel, checkinDate, nights)
            .then(response => {
                setAvailableRates(response.availableRates[hotel])
            })
            .catch(console.error)
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

        const currentDate = getCurrentDate();

        if (!!hotel && !!checkinDate && !!nights) {

            if (checkinDate >= currentDate) {
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

    React.useEffect(() => {
        setFeedbackMessage('')
    }, [hotel, checkinDate, nights])

    return (
        <div className={'app'}>
            <header className={'app-header'}>
                <div className={'app-header__wrapper'}>
                    <img className={'app-header-logo'} src={'assets/images/hotel.png'} alt="logo" />
                    <h1 className={'app-header-title'}>Offer Looking</h1>
                </div>
            </header>
            <main className={'app-main'}>
                <section className={'app-main__section-search'}>
                    <h2>Encuentra la opción más barata</h2>
                    {feedbackMessage
                        ? <span className={'feedback-message'}>{feedbackMessage}</span>
                        : ''
                    }
                    <form className={'form'}>
                        <div className={'form-group select'}>
                            <label></label>
                            <select onChange={(e) => setHotel(e.currentTarget.value)}>
                                <option defaultValue>Elige un hotel</option>
                                <option value={44069509}>Hotel Baqueira Val de Neu</option>
                                <option value={100376478}>Hotel Grand Luxor</option>
                                <option value={10030559}>Hotel Moderno</option>
                            </select>
                        </div>
                        <div className={'form-group search-input'}>
                            <label></label>
                            <input type="date" placeholder={'Check-in'} onChange={(e) => setCheckinDate(changeDateFormat(e.currentTarget.value))} />
                        </div>
                        <div className={'form-group search-input'}>
                            <label></label>
                            <input type="number" placeholder={'Número de noches'} onChange={(e) => setNigths(e.currentTarget.value)} />
                        </div>
                        <input type={'submit'} onClick={onSubmit} value={'Buscar'} className={'button'} />
                    </form>
                </section>
                <section className={'app-main__section-results'}>
                    <h2>Resultados de su búsqueda</h2>
                    {
                        availableRates
                            ? <div>
                                <ul className={'app-main__section-results__list'}>
                                    {availableRates.map((rates, i) => <ListItem key={i} {...rates} />
                                    )}
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
