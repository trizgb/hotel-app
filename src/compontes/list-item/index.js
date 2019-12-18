import * as React from 'react';
require('./index.scss');

const ListItem = (props) => {

    return <li className={'list-item'}>
        <div className={'list-item__wrapper'}>
            <div className={'list-item__image-container'}>
                {props.offerName
                    ? <div className={'label'}>{props.offerName}</div>
                    : ''
                }
                <img className={'image'} src={'assets/images/hotel-room-1.png'} alt={'Hotel room'} />
            </div>
            <div className={'list-item__info'}>
                <div className={'list-item__info-title'}>
                    <h3>
                        <span>{props.roomName}</span>
                    </h3>
                </div>
                <div className={'list-item__info-board'}>
                    <span>{props.boardName}</span>
                </div>
                <div className={'list-item__info-occupancy'}>
                    <span>{props.occupancy.numAdults} adultos</span>
                    <span>{props.occupancy.numChilds} niños</span>
                    <span>{props.occupancy.numBabies} bebés</span>
                </div>
                <div className={'list-item__info-price'}>
                    <span>{Math.ceil(props.netPrice)}€</span>
                </div>
            </div>
        </div>
    </li>
}

export default ListItem;