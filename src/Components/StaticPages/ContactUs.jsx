import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left half - Contact Information */}
          <div className="bg-gray-300 p-12">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="mb-4">For any inquiries, please reach out to us:</p>
            <div className="text-left mb-6">
              <p className="mb-2">
                <span className="font-semibold">Phone:</span> +1 234 567 890
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span> contact@yourcompany.com
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span> 123 Main Street, City, Country
              </p>
            </div>
          </div>

          {/* Right half - Contact Form */}
          <div className="bg-gray-200 p-12 flex-1">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block mb-2 font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
