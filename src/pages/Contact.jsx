import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <div className="max-w-md mx-auto">
        <p className="text-lg text-gray-700 mb-4">
          Have questions or need support? Reach out to us!
        </p>
        <div className="mb-4">
          <strong>Email:</strong> support@pawmart.com
        </div>
        <div className="mb-4">
          <strong>Phone:</strong> +1 (123) 456-7890
        </div>
        <div className="mb-4">
          <strong>Address:</strong> 123 Pet Street, Paw City, PC 12345
        </div>
        <p className="text-gray-600">
          We aim to respond to all inquiries within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default Contact;
