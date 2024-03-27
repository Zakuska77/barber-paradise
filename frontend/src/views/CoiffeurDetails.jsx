import {useParams} from "react-router-dom";
import { useState, useEffect} from "react"

function Page03() {
    const [data, setData] = useState([])

    
    const params = useParams()

    return (
        <div>
            <h1>Page03</h1>
            <div>La valeur du paramètre param01 est: {params.id}</div>
        </div>
    )
}

export default Page03;
