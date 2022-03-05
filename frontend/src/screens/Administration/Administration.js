import React, {useState} from 'react';
import AdminCoordinatesQueryInputs from "../../components/AdminCoordinatesQueryInputs";
import {useSelector} from 'react-redux'
import axios from 'axios'

const Administration = (props) => {
    const code = useSelector(state => state.Admin)
    const [queryInitialized, setQueryInitialized] = useState(false)
    const [query, setQuery] = useState([])

    function queryCoordinatesHandler(e) {

        e.preventDefault();
        const form = e.target
        const lat = form.lat.value
        const long = form.long.value

        async function queryCoordinatesRequest() {
            setQueryInitialized(true)

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            try {
                const response = await axios.get('api/query-coordinates', {params: {code, lat, long}}, config)
                setQuery(response.data)
            } catch (e) {

            }
        }

        queryCoordinatesRequest()
    }

    return (
        <div className={'pt-24 font-sans  uppercase font-bold '}>
            <h1 className={"page-header"}>Admin</h1>
            <form className={'w-1/3 mx-auto'} onSubmit={queryCoordinatesHandler}>
                <AdminCoordinatesQueryInputs/>
                <button className={'form-button mt-8'}>Query Coordinates</button>
            </form>
            <div className={'w-1/2 mx-auto mt-12'}>
                {queryInitialized && <div className={"text-lg text-white my-4"}>{query.length} results found</div>}
                {query.map(item => {
                    return (
                        <div className={'bg-custom-green-dark flex justify-between py-2 px-4'}>
                            <div className={'text-white font-semibold'}>{item.provider.name} - {item.name}</div>
                            <div className={'text-custom-yellow'}>{item.price} {item.provider.currency}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Administration;