import React, {useState} from 'react';

const CoordinatesPointsPairInputs = (props) => {
    const id = props.long ? props.id + "-existing" : props.id
    const [long, setLong] = useState(props.long || "")
    const [lat, setLat] = useState(props.lat || "")
    return (<div className={'my-4'} key={id}>
        <div className={'flex  justify-between'}>
            <div className={'w-[45%]'}>
                <label htmlFor={'lat-point-' + id}
                       className={'form-label font-base'}>Latitude</label>
                <input required id={'lat-point-' + id}
                       name={'lat-point-' + id}
                       className={'form-input'}
                       type="text"
                       value={lat}
                       onChange={(e) => setLat(e.target.value)}
                />

            </div>
            <div className={'w-[45%]'}>
                <label htmlFor={'long-point-' + id}
                       className={'form-label font-base'}>Longitude</label>
                <input required id={'long-point-' + id}
                       name={'long-point-' + id}
                       className={'form-input'}
                       type="text"
                       value={long}
                       onChange={(e) => setLong(e.target.value)}
                />
            </div>
        </div>
    </div>)
};

export default CoordinatesPointsPairInputs;