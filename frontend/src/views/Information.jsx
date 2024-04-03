import { useState, useEffect } from "react";
import { api } from "../api/api";
import InfoCoiffeur from "../components/EndetailCoiffeur";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App1() {
  const [data, setData] = useState({});
  const [availability, setAvailability] = useState([]);
  const [comments, setComments] = useState([]);
  const [services, setServices] = useState([]);
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coiffeurDetailsResponse = await fetch(`${api}/CoiffeurDetails/${params.id}`);
        const coiffeurDetailsData = await coiffeurDetailsResponse.json();
        setData(coiffeurDetailsData);

        const availabilityData = [];
        for (let i = 1; i <= 7; i++) {
          const availabilityResponse = await fetch(`${api}/coiffeurAvailability/${params.id}/${i}`);
          const availabilityDataForDay = await availabilityResponse.json();
          availabilityData.push(availabilityDataForDay);
        }
        setAvailability(availabilityData);

        const commentsResponse = await fetch(`${api}/ReviewCoiffeur/${params.id}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        const servicesResponse = await fetch(`${api}/servicesCoiffeur/${params.id}`);
        const servicesData = await servicesResponse.json();
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleAddAppointment = async () => {
    if (!selectedService) {
      alert('Please select a service');
      return;
    }

    if (!selectedDate || !selectedHour) {
      alert('Please select date and time');
      return;
    }

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    // Replace hardcoded ClientID with dynamic value
    const requestBody = {
      ClientID: 1, // Replace with actual client ID
      ServiceID: selectedService,
      Year: year,
      Month: month,
      Day: day,
      AppointmentTime: parseInt(selectedHour) // Convert selectedHour to integer
    };

    try {
      const response = await fetch(`${api}/AddAppointment/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert('Appointment added successfully');
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert('Failed to add appointment');
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('Failed to add appointment');
    }
  };

  const handlePostComment = async () => {
    if (!rating || !comment) {
      alert('Please provide rating and comment');
      return;
    }

    try {
      const response = await fetch(`${api}/CreateReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ClientID: 1, // Assuming ClientID is always 1 for this scenario
          CoiffeurID: params.id,
          Rating: rating,
          ReviewText: comment
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert('Comment posted successfully');
        // Clear the input fields after successful posting
        setRating(0);
        setComment('');
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    }
  };

  return (
    <>
      <div className="m-4">
        <div className="grid is-col-min-10" key={data.id}>
          <InfoCoiffeur
            ShopName={data.ShopName}
            nomCoiffeur={data.Username}
            Availability={data.Availability}
            Location={data.Location}
            ImageShop={data.ImageShop}
            Email={data.Email}
            PhoneNumber={data.PhoneNumber}
            Service={data.Service}
            profilePic={data.profilePic}
          />
          <div className="availability">
            {availability.map((dayAvailability, dayIndex) => (
              <div key={dayIndex} className="day-availability">
                <h2>{getDayName(dayIndex)}</h2>
                <ul>
                  {dayAvailability.map((slot, index) => (
                    <li key={`${dayIndex}-${index}`}>{`${slot.StartTime}-${slot.EndTime}`}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="box mt-4 mb-8 p-2">
          <h1 className="title mt-2 mb-2">Reservation</h1>
          <div className="select is-rounded">
            <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
              <option value="">Select a Service</option>
              {services.map(service => (
                <option key={service.ServiceID} value={service.ServiceID}>{service.ServiceName}</option>
              ))}
            </select>
            <div className="datepicker">
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText="Select a date"
              />
            </div>
            <form>
              <label htmlFor="hour">Time:</label>
              <input type="number" id="hour" name="hour" min="0" max="24" step="1" value={selectedHour} onChange={e => setSelectedHour(e.target.value)} />
            </form>
            <button className="button is-success is-dark" onClick={handleAddAppointment}>Reserver</button>
          </div>
        </div>
        
        <div className="box mt-4 mb-8 p-2">
          <h1 className="title mt-2 mb-2">Leave a Comment</h1>
          <div className="rating">
            <label htmlFor="rating">Rating:</label>
            <input type="number" id="rating" name="rating" min="0" max="5" step="1" value={rating} onChange={e => setRating(e.target.value)} />
          </div>
          <div className="comment">
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" name="comment" value={comment} onChange={e => setComment(e.target.value)} />
          </div>
          <button className="button is-primary" onClick={handlePostComment}>Post Comment</button>
        </div>
        <div className="comments">
          <h1 className="title mt-2 mb-2">Comments</h1>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <p><strong>Rating:</strong> {comment.Rating}</p>
                <p><strong>Comment:</strong> {comment.ReviewText}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// Function to get day name based on index
function getDayName(dayIndex) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[dayIndex];
}

export default App1;