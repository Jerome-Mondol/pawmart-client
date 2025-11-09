import React from 'react'

const WhyAdopt = () => {
  return (
    <>
      <section className="bg-orange-100/60 py-12 md:py-20">
        <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center gap-10 px-6 md:px-12 lg:px-20  lg:text-left">
          
          <div className="flex justify-center w-full lg:w-1/2">
            <img
              src="https://media.istockphoto.com/id/1503385646/photo/portrait-funny-and-happy-shiba-inu-puppy-dog-peeking-out-from-behind-a-blue-banner-isolated.jpg?s=612x612&w=0&k=20&c=xZq8PhunL9ZmY243et3GOf04wJPBmHzeiQ3jw7nWCrY="
              alt="Happy person adopting a dog"
              className="w-64 sm:w-80 md:w-96 lg:w-[400px] rounded-2xl shadow-2xl object-cover"
            />
          </div>

          <div className="max-w-xl lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-4">
              Why Adopt from PawMart?
            </h1>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4">
              Every pet deserves a loving home. At <span className="font-semibold  text-orange-500 ">PawMart</span>,
              we connect compassionate people like you with pets who are waiting for a second chance. 
              Adopting doesn’t just change their life — it changes yours.
            </p>
            <ul className="text-gray-700 space-y-3 mt-4 text-sm sm:text-base">
              <li>🐾 Verified and trusted pet owners and shelters</li>
              <li>❤️ Transparent adoption process, no hidden fees</li>
              <li>🌍 Every adoption supports rescue organizations</li>
              <li>💬 Easy chat and connect with pet owners directly</li>
            </ul>
            <button className="btn btn-primary mt-8 bg-orange-500 border-none hover:bg-orange-600 tracking-widest px-6 py-3 text-sm sm:text-base">
              Browse Available Pets
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default WhyAdopt
