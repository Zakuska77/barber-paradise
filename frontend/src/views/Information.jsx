import { useState, useEffect } from "react";
import { api } from "../api/api";
import InfoCoiffeur from "../components/EndetailCoiffeur";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Rating } from 'react-simple-star-rating'



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
        const coiffeurDetailsResponse = await fetch(`${api}/coiffeurs/${params.id}`, {
          method: "GET",

        });
        const coiffeurDetailsData = await coiffeurDetailsResponse.json();
        setData(coiffeurDetailsData);

        const availabilityData = [];
        for (let i = 1; i <= 7; i++) {

          const availabilityResponse = await fetch(`${api}/coiffeurs/availability/${params.id}/${i}`, {
            method: "GET",

          });
          const availabilityDataForDay = await availabilityResponse.json();
          availabilityData.push(availabilityDataForDay);
        }
        setAvailability(availabilityData);

        const commentsResponse = await fetch(`${api}/coiffeurs/reviews/${params.id}`, {
          method: "GET",

        });


        ;
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        const servicesResponse = await fetch(`${api}/coiffeurs/services/${params.id}`, {
          method: "GET",

        });

        const servicesData = await servicesResponse.json();
        setServices(servicesData);
        console.log(servicesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [comment, rating]);

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
      ClientID: userId, // Use the stored UserId
      CoiffeurID: params.id,
      ServiceID: selectedService,
      Year: year,
      Month: month,
      Day: day,
      AppointmentTime: parseInt(selectedHour)
    };

    try {
      const userId = localStorage.getItem('userId');

      const response = await fetch(`${api}/clients/appointments

`, {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ClientID: +userId, // Use the stored UserId
          CoiffeurID: +params.id,
          ServiceID: +selectedService,
          Year: year,
          Month: month,
          Day: day,
          AppointmentTime: parseInt(selectedHour),
          IsAvailable: 0
        }),
      })
      // console.log(JSON.stringify(requestBody))

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert('Appointment added successfully');
      } else {
        alert('Failed to add appointment');
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('Failed to add appointment');
    }
  };
  const handleRating = (rate) => {
    setRating(rate)
  }

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
      const response = await fetch(`${api}/coiffeurs/reviews/${params.id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
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
        location.reload
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
            Username={data.Username}
            Location={data.Location}
            ImageShop={data.ImageShop}
            Email={data.Email}
            PhoneNumber={data.PhoneNumber}
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
          <button className="button is-success is-dark" onClick={handleAddAppointment}>Reserver</button>
        </div>

        <div className="box mt-4 mb-8 p-2">
          <div className="comment">
            <h1 className="title mt-2 mb-2">Comments</h1>
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
          <div className="rating ml-5 my-2">
            <Rating
              emptyIcon={
                <svg
                  width="24"
                  height="24"
                  color="#ff6685"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd">
                  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                </svg>}
              fillIcon={<svg xmlns="http://www.w3.org/2000/svg" color="#ff6685" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" /></svg>}
              SVGstrokeColor="#ff6685"
              onClick={handleRating}
            />
          </div>
          <button className="button is-primary ml-4 mt-2 mb-4 " onClick={handlePostComment}>Post Comment</button>
          <hr />
          <div className="comments ">
            <ul>
              {comments.map((comment, index) => (
                <div>
                  <p>{comment.Username}</p>
                  <div className="tags has-addons">
                    <span className="tag is-primary">{comment.Rating}</span>
                    <span className="tag">{comment.ReviewText}</span>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}


function getDayName(dayIndex) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return dayNames[dayIndex];
}

export default App1;