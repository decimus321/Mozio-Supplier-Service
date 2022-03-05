import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import ModalBackground from '../../components/ModalBackground'
import AddPolygon from "./AddPolygon";
import EditPolygon from './EditPolygon'
import {addAll, deleteOne} from '../../store/PolygonsReducer'

const Supplier = () => {
    const [name, setName] = useState("Profile")
    const [currency, setCurrency] = useState("")
    const [insertPolygonMode, setInsertPolygonMode] = useState(false)
    const [editPolygonMode, setEditPolygonMode] = useState(null)
    const UserData = useSelector(state => state.UserData)
    const Polygons = useSelector(state => state.Polygons)
    const dispatch = useDispatch()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + UserData.token,
        },
    };

    useEffect(() => {
        async function GetProfileRequest() {
            try {
                const response = await axios.get('/profile-supplier', config)
                setName(response.data.name);
                setCurrency(response.data.currency);
            } catch (e) {

            }
        }

        GetProfileRequest()
    }, [])
    useEffect(() => {
        async function GetAllPolygons() {
            try {
                const response = await axios.get('api/get-all-polygons', config)
                dispatch(addAll(response.data))

            } catch (e) {

            }
        }

        GetAllPolygons()
    }, [])

    function DeletePolygonHandler(id) {
        async function DeletePolygonRequest() {
            try {
                await axios.post('api/delete-polygon', {polygon_id: id}, config)
                dispatch(deleteOne(id))
            } catch (e) {

            }
        }

        DeletePolygonRequest()
    }

    return <div className={"pt-24 font-sans  uppercase font-bold "}>
        <h1 className={"page-header"}>{name}</h1>
        <div className={"w-1/4 mx-auto mt-10"}>
            {Polygons.map(polygon => {
                return <div key={polygon.id}
                            className={"polygon-container flex px-4 justify-between text-white cursor-pointer"}>
                    <div onClick={() => setEditPolygonMode(polygon.id)}>{polygon.name}</div>
                    <i className="fa-solid fa-trash my-auto opacity-80 hover:opacity-90
                    cursor-pointer transition-opacity transition-transform duration-100  hover:scale-105"
                       onClick={() => DeletePolygonHandler(polygon.id)}
                    />
                </div>
            })}
            <button className={"polygon-container"}
                    onClick={() => setInsertPolygonMode(true)}>
                <i className="fa-solid fa-plus"/> Add
                Polygon
            </button>
        </div>
        {insertPolygonMode && <ModalBackground PolygonModeSetter={setInsertPolygonMode}/>}
        {insertPolygonMode && <AddPolygon currency={currency} PolygonModeSetter={setInsertPolygonMode}/>}
        {editPolygonMode && <ModalBackground PolygonModeSetter={setEditPolygonMode}/>}
        {editPolygonMode &&
            <EditPolygon id={editPolygonMode} currency={currency} PolygonModeSetter={setEditPolygonMode}/>}
    </div>
};

export default Supplier;