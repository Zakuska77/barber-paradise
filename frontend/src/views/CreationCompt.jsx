import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";


function CreationCompteClient() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Username: "",
        Password: "",
        Email: "",
        PhoneNumber: ""
    });


    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${api}/CreateClientAccount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                navigate("/Home");
            } else {
                const data = await response.json();
                alert(data.message); // Display error message from backend
            }
        } catch (error) {
            console.error("Error creating account:", error);
            alert("Failed to create account. Please try again later.");
        }
    }

    function RetourLog() {
        navigate("/Login");
    }

    return (
        <div className="m-6 p-4">
            <form className="box mt-4 mb-4  has-background-grey-lighter" onSubmit={handleSubmit}>
                <h1 className="title mt-2 mb-2">Creation compte</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Username" name="Username" value={formData.Username} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input has-background-white-ter" type="Password" placeholder="Password" name="Password" value={formData.Password} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input has-background-white-ter" type="Email" placeholder="Email" name="Email" value={formData.Email} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input className="input " type="text" placeholder="Phone Number" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button type="button" onClick={RetourLog} className="button is-link is-light">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreationCompteClient;