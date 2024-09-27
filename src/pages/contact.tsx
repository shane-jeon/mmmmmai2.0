import Header from "@/components/Header";
import { useState } from "react";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Correct the URL by removing curly braces
    fetch("https://formspree.io/f/xovagjak", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
          form.reset();
        } else {
          alert("There was a problem submitting your form.");
        }
      })
      .catch(() => {
        alert("There was a problem submitting your form.");
      });
  };

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-xl px-4 py-12">
        <h1 className="mb-8 text-center text-4xl font-bold">Contact Us</h1>
        {submitted ? (
          <p className="text-center text-lg text-green-600">
            Thank you for contacting us! We will get back to you soon.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg bg-white p-8 shadow-md">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-semibold">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                rows={4}></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
