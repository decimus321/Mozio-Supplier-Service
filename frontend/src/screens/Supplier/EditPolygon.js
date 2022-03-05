import React, {useEffect, useState} from 'react';
import ModalWindow from "../../components/ModalWindow";
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import CoordinatesPointsPairInputs from "../../components/CoordinatesPointsPairInputs";
import {editOne} from '../../store/PolygonsReducer'

const EditPolygon = ({id, currency, PolygonModeSetter}) => {
    const Polygon = useSelector(state => state.Polygons).filter(polygon => polygon.id === id)[0]
    const [PolygonName, setPolygonName] = useState(Polygon.name)
    const [PolygonPrice, setPolygonPrice] = useState(Polygon.price)
    const UserData = useSelector(state => state.UserData)
    const dispatch = useDispatch()
    const [polygonPoints, setPolygonPoints] = useState([])
    const [newPolygonPoints, setNewPolygonPoints] = useState([])
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + UserData.token,
        },
    };
    useEffect(() => {
        async function GetPolygonPointsRequest() {
            try {
                const response = await axios.post('api/get-polygon-points', {polygon_id: id}, config)
                setPolygonPoints(response.data)

            } catch (e) {

            }
        }

        GetPolygonPointsRequest()
    }, [])

    function SavePolygon(e) {
        e.preventDefault();
        const form = e.target;
        const name = PolygonName;
        const price = PolygonPrice;
        console.log(name)
        let existing_points = []
        polygonPoints.map(point => {
            existing_points.push({
                id: point.id,
                lat: form['lat-point-' + point.id + "-existing"].value,
                long: form['long-point-' + point.id + "-existing"].value
            })
        })

        let new_points = []
        newPolygonPoints.map(point => {
            new_points.push({
                lat: form['lat-point-' + point.id].value,
                long: form['long-point-' + point.id].value
            })
        })

        async function SavePolygonRequest() {
            const data = {polygon_id: id, name, price, existing_points, new_points}
            console.log(data)
            try {
                const response = await axios.post('api/edit-polygon', data, config)
                dispatch(editOne(response.data))
                PolygonModeSetter(false)
            } catch (e) {

            }

        }

        SavePolygonRequest()
    }

    function AddPointHandler() {
        setNewPolygonPoints([...newPolygonPoints, {id: newPolygonPoints.length}])
    }


    return <ModalWindow PolygonModeSetter={PolygonModeSetter}>
        <form onSubmit={SavePolygon}>
            <input name={'title'} value={PolygonName} onChange={(e) => {
                setPolygonName(e.target.value);
            }}
                   required className={'form-input'} placeholder={'Polygon Title'}/>
            {polygonPoints && polygonPoints.map(point => <CoordinatesPointsPairInputs id={point.id} long={point.long}
                                                                                      lat={point.lat}/>)}
            {newPolygonPoints && newPolygonPoints.map(point => <CoordinatesPointsPairInputs id={point.id}/>)}
            <button type={'button'} className={"polygon-point-container mt-2"} onClick={AddPointHandler}>Add Polygon
                Point
            </button>
            <div className={"flex mt-6"}>
                <div className={'w-1/4'}>
                    <input name={'price'} required className={'form-input focus:w-[100%] focus:translate-x-[0%]'}
                           placeholder={'Price'} value={PolygonPrice}
                           onChange={(e) => setPolygonPrice(e.target.value)}/>
                </div>
                <div
                    className={'mt-[0.2%] text-custom-green-lighter translate-x-[-110%] font-semibold text-xl'}>{currency}</div>
                <button className={'polygon-container py-1 mt-0 w-1/3 ml-auto'}>Save Polygon</button>
            </div>
        </form>
    </ModalWindow>
};

export default EditPolygon;