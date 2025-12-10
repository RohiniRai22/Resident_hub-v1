import axios from 'axios';
import React, { useState } from 'react';
import Banner from "../widgests/Banner";
import Look from "../widgests/Look";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact/submitcontact', formData); // Include backend server port
      alert(response.data.message);
      // Clear form after submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error(error);
      alert('Failed to send message');
    }
  };

  return (
    <div>
      <Banner title="Contact Us" toggle={false} />
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-5">
              <form onSubmit={handleSubmit} className="p-5 bg-white">
                <div className="row form-group">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="text-black" htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="text-black" htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="subject">Subject</label>
                    <input type="text" id="subject" className="form-control" value={formData.subject} onChange={handleChange} />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="text-black" htmlFor="message">Message</label>
                    <textarea id="message" className="form-control" cols="30" rows="7" value={formData.message} onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      className="btn btn-primary py-2 px-4 text-white"
                      value="Send Message"
                      style={{
                        background: 'linear-gradient(to top, white, #264d73)',
                        color: 'black',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        transition: 'box-shadow 0.3s ease-in-out',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
