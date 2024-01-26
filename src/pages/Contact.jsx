import { useState } from 'react';

import CoinBg from '../components/common/CoinBg';
import MainLayout from '../components/MainLayout';
import AddressCard from '../components/utils/cards/AddressCard';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    body: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrfToken = 'XV4G2ORautEHCIgggCeydCcw4ClY6eUkQDgxA8xavLRIk9wnlMojlrQS4Z0BxaOU'; // Replace with your actual CSRF token

      const response = await fetch('https://vaultcoin-production.up.railway.app/contact-us', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful submission
        const responseData = await response.json();
        console.log('Contact submission successful:', responseData);

        // Set success message for the user
        setSuccessMessage('Your email has been sent successfully!');

        // Clear input fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          body: '',
        });
      } else {
        // Handle errors if the submission is not successful
        console.error('Contact submission failed:', await response.text());
      }
    } catch (error) {
      console.error('An error occurred during contact submission:', error);
    }
  };

  return (
    <div className="bg-white">
      <MainLayout>
        <CoinBg title="Contact Us" description="Contact Us" />
        <div
          className="flex flex-col xl:flex-row w-[100%] flex-wrap bg-white "
          style={{ boxShadow: '0 3px 15px white' }}
        >
          <div
            className=" h-[100vh] w-[50%] hidden xl:block"
            style={{
              backgroundImage: 'url("/team-stockbrokers-are.jpg") ',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          <div className=" bg-gray-100 py-5 w-[50%] text-black flex flex-col  justify-center gap-[1.5rem] items-center px-5 max-xl:mx-auto max-xl:my-0 max-xl:w-[80%] max-md:w-[90%] max-sm:w-[100%] max-sm:py-10">
            <p className="text-[2.2rem] font-semibold">Contact Us</p>
            <p className="text-[1rem] text-center">
              If you have any questions or queries that are not answered on our
              website, please feel free to contact us. We will try to respond to
              you as soon as possible. Thank you so much.
            </p>

            <form
              onSubmit={handleSubmit}
              className="w-[90%] flex flex-col gap-[2rem]"
            >
              <div className="w-[100%] flex justify-center gap-[8%] max-sm:flex-col max-sm:gap-8">
                <div className="w-[46%] flex flex-col gap-4 max-sm:w-[100%]">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-2 border-solid border-blue-700 bg-white outline-none rounded-lg py-3 px-2 focus:border-[1px] focus:border-green-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="w-[46%] flex flex-col gap-4 max-sm:w-[100%]">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-2 border-solid border-blue-700 bg-white outline-none rounded-lg py-3 px-2 focus:border-[1px] focus:border-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="w-[100%] flex flex-col gap-4">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="border-2 border-solid border-blue-700 bg-white outline-none rounded-lg py-3 px-2 focus:border-[1px] focus:border-blue-500"
                  placeholder="Enter the subject of your message"
                />
              </div>

              <div className="w-[100%] flex flex-col gap-4">
                <label htmlFor="body">Message Body</label>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  className="border-2 border-solid border-blue-700 bg-white outline-none rounded-lg py-3 px-2 h-[10rem] w-full focus:border-blue-500"
                  placeholder="Type your message here"
                />
              </div>
              {successMessage && <p className="text-green-500">{successMessage}</p>}
            
              <button
                type="submit"
                className="text-white w-[25%] font-bold py-3 bg-blue-700 rounded-lg max-sm:w-[40%]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-center gap-10 py-6 min-h-[60vh] bg-white items-center flex-wrap max-sm:mt-8">
          <AddressCard
            title={'Phone Number'}
            description={'+1 (331) 704-0512'}
          />
          <AddressCard
            title={'Email Address'}
            description={'admin@VaultCoin.com'}
          />
          <AddressCard
            title={'Office Address'}
            description={'3015 Suit pagla road, Singapore'}
          />
        </div>
      </MainLayout>
    </div>
  );
};

export default Contact;
