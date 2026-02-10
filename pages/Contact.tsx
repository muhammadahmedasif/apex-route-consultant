import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { COUNTRIES } from '../constants';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      visaCategory: formData.get('visaCategory'),
      country: formData.get('country'),
      details: formData.get('details'),
    };

    try {
      const response = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 bg-neutral-100 min-h-screen flex flex-col">
      <div className="bg-navy-900 py-20 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gold-500/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 animate-fade-in-up">Consultation Request</h1>
          <p className="text-neutral-300 text-lg animate-fade-in-up delay-100">Submit your details to request a professional consultation.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 -mt-16 pb-20 relative z-20 shrink-0">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-fade-in-up delay-200">

          {/* Info Sidebar - Stack on tablet, Side on Desktop */}
          <div className="lg:w-2/5 bg-navy-900 p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-700/20 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-gold-500 uppercase tracking-[0.2em] text-sm font-bold mb-16">Contact Information</h3>

              <div className="space-y-12">

                {/* Headquarters */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-navy-800 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300 shrink-0 shadow-lg border border-white/5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <p className="font-serif text-2xl font-medium text-white mb-2">Headquarters</p>
                    <p className="text-neutral-400 text-base leading-relaxed">
                      Office No: LG12A, Big City Plaza<br />
                      Liberty Roundabout, Gulberg 3, Lahore
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-navy-800 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300 shrink-0 shadow-lg border border-white/5">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <p className="font-serif text-2xl font-medium text-white mb-2">Phone</p>
                    <p className="text-neutral-400 text-base mb-1">+92 339 8410100</p>
                    <p className="text-neutral-500 text-sm">Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-full bg-navy-800 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300 shrink-0 shadow-lg border border-white/5">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <p className="font-serif text-2xl font-medium text-white mb-2">Email</p>
                    <p className="text-neutral-400 text-base break-all">info@apexrouteconsultants.com</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-3/5 p-12 md:p-16 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in min-h-[400px]">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-green-600 text-4xl">✓</span>
                </div>
                <h3 className="text-3xl font-serif text-navy-900 mb-4">Request Received</h3>
                <p className="text-neutral-600 max-w-sm text-lg">
                  Thank you. A senior consultant will review your preliminary details and contact you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-8 py-3 border border-neutral-200 text-neutral-500 rounded-full hover:bg-navy-900 hover:text-white transition-colors"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-wider text-navy-900 font-bold mb-3 ml-4">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      className="w-full bg-neutral-50 border-2 border-neutral-200 px-6 py-4 rounded-full text-navy-900 font-medium focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 placeholder-neutral-400"
                      placeholder="e.g. Jonathan"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-wider text-navy-900 font-bold mb-3 ml-4">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      className="w-full bg-neutral-50 border-2 border-neutral-200 px-6 py-4 rounded-full text-navy-900 font-medium focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 placeholder-neutral-400"
                      placeholder="e.g. Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy-900 font-bold mb-3 ml-4">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full bg-neutral-50 border-2 border-neutral-200 px-6 py-4 rounded-full text-navy-900 font-medium focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 placeholder-neutral-400"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy-900 font-bold mb-3 ml-4">Visa Category</label>
                    <div className="relative">
                      <select name="visaCategory" className="w-full bg-neutral-50 border-2 border-neutral-200 px-6 py-4 rounded-full text-navy-900 font-medium focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer">
                        <option>Study Visa Guidance</option>
                        <option>Work Visa Assistance</option>
                        <option>Visit / Tourist Visa</option>
                        <option>Family Sponsorship</option>
                        <option>Business Investment</option>
                        <option>Other Inquiry</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">▼</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-navy-900 font-bold mb-3 ml-4">Country of Interest</label>
                    <div className="relative">
                      <select name="country" className="w-full bg-neutral-50 border-2 border-neutral-200 px-6 py-4 rounded-full text-navy-900 font-medium focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer">
                        <option value="">Select a Country</option>
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">▼</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-navy-900 font-bold mb-3 ml-4">Case Details</label>
                  <textarea
                    name="details"
                    rows={4}
                    className="w-full bg-neutral-50 border-2 border-neutral-200 px-6 py-4 rounded-3xl text-navy-900 font-medium focus:outline-none focus:border-gold-500 focus:bg-white transition-all duration-300 placeholder-neutral-400 resize-none"
                    placeholder="Please briefly describe your situation..."
                  ></textarea>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                    {error}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-10 py-5 bg-navy-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-navy-900 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 rounded-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Submit Request <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] lg:h-[500px] relative z-10 animate-fade-in-up delay-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.515977300161!2d74.33748487508437!3d31.50998557421876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919059623345ae5%3A0x7437adfded9371e8!2sApex%20Route!5e0!3m2!1sen!2s!4v1770745165022!5m2!1sen!2s"
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        ></iframe>
      </div>

    </div>
  );
};

export default Contact;