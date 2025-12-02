const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          About <span className="text-primary">Tourista</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Tourista is your ultimate travel companion. We simplify the way you 
          plan, book, and enjoy unforgettable travel experiences.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          At Tourista, our mission is to make travel effortless and memorable. 
          We aim to provide customized tour plans, seamless bookings, and 
          extraordinary experiences that bring your dream vacations to life.
        </p>
      </section>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Custom Tour Plans", desc: "Tailored itineraries to fit your preferences and interests for the perfect vacation experience." },
            { title: "Seamless Bookings", desc: "Book hotels, transportation, and activities all in one place with ease and confidence." },
            { title: "24/7 Support", desc: "Our dedicated team is always ready to assist you during your travel journey for a hassle-free experience." },
          ].map((service, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Our Team</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
          Tourista is powered by a passionate team of travel enthusiasts, tech 
          experts, and customer service professionals committed to delivering 
          exceptional travel experiences.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Alice Johnson", "Bob Smith", "Clara Lee", "David Brown"].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {/* Placeholder for profile image */}
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 10}`}
                  alt={member}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{member}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Team Member</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
