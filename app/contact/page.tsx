
import { FaWhatsapp, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-8">
        We're here to help! Whether you have a question about our services, need assistance with a booking, or just want to give us some feedback, we'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
              <input type="text" id="name" name="name" className="w-full p-3 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
              <input type="email" id="email" name="email" className="w-full p-3 border rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
              <textarea id="message" name="message" rows={5} className="w-full p-3 border rounded-md"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600">
              Send Message
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Other ways to reach us</h2>
          <p className="text-lg mb-4">
            You can also connect with us on social media.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-3xl hover:text-green-500"><FaWhatsapp /></a>
            <a href="#" className="text-3xl hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="text-3xl hover:text-pink-500"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

