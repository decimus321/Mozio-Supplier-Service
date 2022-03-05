import React, {useState} from 'react';
import ModalWindow from "../../components/ModalWindow";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {addOne} from '../../store/PolygonsReducer'
import CoordinatesPointsPairInputs from "../../components/CoordinatesPointsPairInputs";

const AddPolygon = ({currency, PolygonModeSetter}) => {
    const UserData = useSelector(state => state.UserData)
    const dispatch = useDispatch()
    const [polygonPoints, setPolygonPoints] = useState([])

    function addNewPolygonPointHandler(e) {
        e.preventDefault();
        let newPolygonPoints = [...polygonPoints]
        for (let i = 0; i < polygonPoints; i++) {
            newPolygonPoints[i].position = i;
        }
        newPolygonPoints.push({position: polygonPoints.length})
        setPolygonPoints(newPolygonPoints)
    }

    function AddPolygonHandler(e) {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const price = form.price.value;
        let points = []
        polygonPoints.map(point => {
            points.push({
                lat: form['lat-point-' + point.position].value,
                long: form['long-point-' + point.position].value
            })
        })

        async function AddPolygonRequest() {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + UserData.token,
                },
            };
            const body = {
                title, price, points
            }
            try {
                const response = await axios.post('api/add-polygon', body, config)
                PolygonModeSetter(false)
                dispatch(addOne(response.data))
            } catch (e) {

            }
        }

        AddPolygonRequest()
    }

    return (
        <ModalWindow PolygonModeSetter={PolygonModeSetter}>
            <form onSubmit={AddPolygonHandler}>
                <input name={'title'} required className={'form-input'} placeholder={'Polygon Title'}/>
                {polygonPoints && polygonPoints.map(point => <CoordinatesPointsPairInputs id={point.position}/>)}
                <button className={"polygon-point-container mt-2"} onClick={addNewPolygonPointHandler}>Add Polygon
                    Point
                </button>
                <div className={"flex mt-6"}>
                    <div className={'w-1/4'}>
                        <input name={'price'} required className={'form-input focus:w-[100%] focus:translate-x-[0%]'}
                               placeholder={'Price'}/>
                    </div>
                    <div
                        className={'mt-[0.2%] text-custom-green-lighter translate-x-[-110%] font-semibold text-xl'}>{currency}</div>
                    <button className={'polygon-container py-1 mt-0 w-1/3 ml-auto'}>Add Polygon</button>
                </div>
            </form>
        </ModalWindow>
    )
};

export default AddPolygon;