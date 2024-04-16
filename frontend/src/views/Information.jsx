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
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [clientUsernames, setClientUsernames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userIdFromStorage = localStorage.getItem('userId');
      const userTypeFromStorage = localStorage.getItem('userType');

      if (userIdFromStorage) {
        setUserId(userIdFromStorage);
      }

      if (userTypeFromStorage) {
        setUserType(userTypeFromStorage);
      }

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

 
        const clientUsernamesMap = {};
        for (const comment of commentsData) {
          const clientDetailsResponse = await fetch(`${api}/clientDetails/${comment.ClientID}`);
          const clientDetails = await clientDetailsResponse.json();
          clientUsernamesMap[comment.ClientID] = clientDetails.Username;
        }
        setClientUsernames(clientUsernamesMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleAddAppointment = async () => {
    if (!userId) {
      alert('User not logged in');
      return;
    }

    if (userType !== 'client') {
      alert('You must be a client to make a reservation');
      return;
    }

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

    const requestBody = {
      ClientID: userId,
      ServiceID: selectedService,
      Year: year,
      Month: month,
      Day: day,
      AppointmentTime: parseInt(selectedHour)
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
    if (!userId) {
      alert('User not logged in');
      return;
    }

    if (userType !== 'client') {
      alert('You must be a client to post a comment');
      return;
    }

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
          ClientID: userId,
          CoiffeurID: params.id,
          Rating: rating,
          ReviewText: comment
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert('Comment posted successfully');
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
          <div className="columns">
            <div className="column is-half">
              <div className="select">
                <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                  <option value="">Select a Service</option>
                  {services.map(service => (
                    <option key={service.ServiceID} value={service.ServiceID}>{service.ServiceName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="column">
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                placeholderText="Select a date"
              />
            </div>
            <div className="column">
              <form>
                <label htmlFor="hour">Time:</label>
                <input type="number" id="hour" name="hour" min="0" max="24" step="1" value={selectedHour} onChange={e => setSelectedHour(e.target.value)} />
              </form>
            </div>
          </div>
          <button className="button is-success is-dark" onClick={handleAddAppointment}>Reserve</button>
        </div>
  
        <div className="box mt-4 mb-8 p-2">
          <div className="comment">
            <h1 className="title mt-2 mb-2">Leave a Comment</h1>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control pr-6 pl-1">
                    <textarea className="textarea m-4" id="comment" name="comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Leave a Comment" />
                  </div>
                </div>
              </div>
            </div>
            <button className="button is-primary ml-4 mt-2 mb-4 " onClick={handlePostComment}>Post Comment</button>
            <label htmlFor="rating">Rating:</label>
            <input type="number" id="rating" name="rating" min="0" max="5" step="1" value={rating} onChange={e => setRating(e.target.value)} />
          </div>
        </div>
        <div className="comments">
          <h1 className="title mt-2 mb-2">Comments</h1>
          {comments.map((comment, index) => (
            <div key={index} className="box">
              <p>{clientUsernames[comment.ClientID]}</p>
              <p><strong>Rating:</strong> {comment.Rating}</p>
              <p><strong>Comment:</strong> {comment.ReviewText}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


function getDayName(dayIndex) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[dayIndex];
}

export default App1;