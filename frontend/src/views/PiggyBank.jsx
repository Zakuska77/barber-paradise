import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api/api';

const PiggyBank = () => {
    const [amount, setAmount] = useState()
    const [data, setData] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${api}/clients/${params.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => setData(data[0]));
    })
    function IPutCoinsIntoMyPiggyBank() {       
        fetch(`${api}/clients/piggybank/${params.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                balance: +amount + data.balance
            })
        })
        navigate(`/AccountUtilisateur/${params.id}`)
    }
    console.log(amount)
    return (
        <div className="mx-6 mt-2">
            <h1>PiggyBank:</h1>
            <div class="field has-addons">
                <p class="control is-expanded">
                    <input class="input" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount of money" />
                </p>
                <p class="control">
                    <button class="button" onClick={IPutCoinsIntoMyPiggyBank}>
                        Transfer
                    </button>
                </p>
            </div>

        </div>
    )
}

export default PiggyBank
