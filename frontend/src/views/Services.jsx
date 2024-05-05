import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [price, setPrice] = useState(0)
  const [name, setName] = useState(' ')
  const [description, setDescription] = useState(' ')
  const params = useParams();
  const id = params.id;
  const fetchServices = async () => {
    try {
      const response = await fetch(`${api}/coiffeurs/services/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [services]);

  async function addService() {
    try {
      const response = await fetch(`${api}/coiffeurs/services/${id}`, {
        method: "POST",
        body: JSON.stringify({
          CoiffeurID: id,
          ServiceName: name,
          Description: description,
          Price: price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  }

  console.log(services);
  console.log(price);

  return (
    <div className="fixed-grid">
      <div className="grid has-2-cols">
        <div className="cell">
          {Array.isArray(services) && services.map(service => (
            <div key={service.id}>
              <span className="tag is-light">{service.ServiceName}</span>
              <span className="tag is-light">{service.Price}</span>
            </div>
          ))}
        </div>
        <div className="cell">
          <div className="box mx-6">
            <div className="field">
              <label className="label">Service Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="service name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input className="input" type="text" placeholder="service name" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label className="label">Price in $</label>
              <div className="control">
                <input className="input" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="price" />
              </div>
            </div>
            <button className="button is-primary" onClick={addService}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
