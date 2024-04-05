import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function ModifyCoiffeurAvailability() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(""); // State to store the coiffeur ID
    const [availability, setAvailability] = useState([
        { DayOfWeek: 1, StartTime: "", EndTime: "" },
        { DayOfWeek: 2, StartTime: "", EndTime: "" },
        { DayOfWeek: 3, StartTime: "", EndTime: "" },
        { DayOfWeek: 4, StartTime: "", EndTime: "" },
        { DayOfWeek: 5, StartTime: "", EndTime: "" },
        { DayOfWeek: 6, StartTime: "", EndTime: "" },
        { DayOfWeek: 7, StartTime: "", EndTime: "" }
    ]);

    useEffect(() => {
        // Retrieve coiffeur ID from local storage when component mounts
        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
    }, []);

    const handleChange = (index) => (event) => {
        const { name, value } = event.target;
        setAvailability(prevState => {
            const updatedAvailability = [...prevState];
            updatedAvailability[index][name] = value;
            return updatedAvailability;
        });
    };

    const getDayName = (dayOfWeek) => {
        // Function to get the name of the weekday based on its number
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[dayOfWeek - 1];
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${api}/ModifyCoiffeurAvailability`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ CoiffeurID: userId, Availability: availability })
            });
            if (response.ok) {
                navigate("/Home");
            } else {
                const data = await response.json();
                alert(data.message); // Display error message from backend
            }
        } catch (error) {
            console.error("Error modifying coiffeur availability:", error);
            alert("Failed to modify coiffeur availability. Please try again later.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Modify Coiffeur Availability</h1>
            <div>
                <p>Coiffeur ID: {userId}</p>
            </div>
            <div>
                {availability.map((day, index) => (
                    <div key={index}>
                        <h2>{getDayName(day.DayOfWeek)}</h2>
                        <label>Start Time:</label>
                        <input type="text" value={day.StartTime} onChange={handleChange(index)} name="StartTime" />
                        <label>End Time:</label>
                        <input type="text" value={day.EndTime} onChange={handleChange(index)} name="EndTime" />
                    </div>
                ))}
            </div>
            <button type="submit" className="button is-primary is-rounded">
                Submit
            </button>
        </form>
    );
}

export default ModifyCoiffeurAvailability;