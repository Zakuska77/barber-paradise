import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function CreationCompteCoiffeur() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Username: "",
        Password: "",
        Email: "",
        Location: "",
        PhoneNumber: "",
        profilePic: "",
        ShopName: "",
        ImageShop: ""
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
            const response = await fetch(`${api}/CreateCoiffeurAccount`, {
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
        <>
            <form className="box mt-4 mb-4 has-background-black-ter" onSubmit={handleSubmit}>
                <h1 className="title mt-2 mb-2">Creation compte coiffeur</h1>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Username" name="Username" value={formData.Username} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Password" name="Password" value={formData.Password} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" placeholder="Email" name="Email" value={formData.Email} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Location</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Location" name="Location" value={formData.Location} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Phone Number</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Phone Number" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Profile Picture</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Profile Picture" name="profilePic" value={formData.profilePic} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Shop Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Shop Name" name="ShopName" value={formData.ShopName} onChange={handleChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image Shop</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Image Shop" name="ImageShop" value={formData.ImageShop} onChange={handleChange} />
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
        </>
    );
}

export default CreationCompteCoiffeur;