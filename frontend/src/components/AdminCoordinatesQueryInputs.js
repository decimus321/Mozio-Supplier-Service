import React from 'react';

const AdminCoordinatesQueryInputs = (props) => {
    return (
        <div className="mt-8 flex justify-between">
            <div className={'w-[45%]'}>
                <label htmlFor={'lat'} className={'form-label'}>Latitude</label>
                <input required id={'lat'} name={'lat'} className="form-input"/>
            </div>
            <div className={'w-[45%]'}>
                <label htmlFor={'long'} className={'form-label'}>Longitude</label>
                <input required name={'long'} id={'long'} className="form-input"/>
            </div>
        </div>
    )
}

export default AdminCoordinatesQueryInputs;