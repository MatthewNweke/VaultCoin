import { useState } from 'react';

const Contact = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://vaultcoin-production.up.railway.app/contact/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2NzEzODQyLCJpYXQiOjE3MDY2MDU4NDIsImp0aSI6IjhjN2QyNTU5ODZiNDQwNGU4NTQxYTYwYjk1ODIwNWQ4IiwidXNlcl9pZCI6ODksImZpcnN0X25hbWUiOiJNYXR0aGV3IiwiZW1haWwiOiJud2VrZW1hdHRoZXcyNDc4M0BnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJqb2huX2RvZSIsImlkIjo4OX0.B2nQnPPd4J2lNjE5m9qbanuSKWtKtd1vWQqfJrkT6v4', 
            'X-CSRFToken': 'tCUFhUh0aiPJhnOl7pWaOrNGNmEkxrCZL8dntu34bUwzfdoZNgdt32ze15JDv92p',
        },
        body: JSON.stringify({
          subject: subject,
          body: message,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        setErrorMessage('');
        setSubject('');
        setMessage('');
      } else {
        const errorResult = await response.json();
        setSuccessMessage('');
        setErrorMessage(errorResult.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <div>
      <div className="min-h-[500px] shadow-xl py-10 w-[90%] mx-auto my-0 p-5">
        <p className="p-5 border-[#00000020] border mb-5 text-xl">Contact Support</p>
        {successMessage && <p className="text-blue-500 text-xl font-semibold mb-5">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-xl font-semibold mb-5">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold">
              Subject
            </label>
            <input
              type="text"
              className="w-[100%] rounded p-3"
              placeholder="Enter Subject *"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="font-semibold">
              Message
            </label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="w-[100%]"
              placeholder="Message *"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <input type="submit" className="w-[100%] rounded p-3 bg-blue-700 text-white cursor-pointer" value={'Send a Message'} />
        </form>
      </div>
    </div>
  );
};

export default Contact;
