import React from 'react'

const Carousel = () => {
    return (
        <>
            <div className="carousel w-full h-[70vh]">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://images.ctfassets.net/2djrn56blv6r/3hZ6q6uAUcjEA9khhsWKPl/e859d5d4043e5bad366145490ee720e5/respon_pet_owner.jpeg?fm=webp&q=75&w=1920"
                        className="w-full object-cover" />
                        <div className='w-full h-full absolute bg-black/50'></div>
                        <div className='absolute' >
                            <h1 className='sm:text-4xl text-2xl sm:pl-20 pl-17 pt-20' >Find Your Furry Friend Today!</h1>
                            <p className='sm:text-lg text-md sm:pl-20 pl-17 sm:w-[50%] w-[90%] mt-2 text-md ' >Discover adorable pets waiting for a loving home. Whether you’re looking to adopt or shop responsibly, PawMart helps you connect with trusted owners and bring joy to your life—one paw at a time.</p>
                        </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://thevets.com/wp-content/uploads/2023/05/mental-health-pets.jpg"
                        className="w-full object-cover" />
                        <div className='w-full h-full absolute bg-black/50'></div>
                        <div className='absolute' >
                            <h1 className='sm:text-4xl text-2xl sm:pl-20 pl-17 pt-20' >Because Every Paw Matters.</h1>
                            <p className='sm:text-lg text-md sm:pl-20 pl-17 sm:w-[50%] w-[90%] mt-2 text-md '  >From tiny paws to big hearts — find pets that need care, comfort, and someone just like you.</p>
                        </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://i.ibb.co.com/35xC8tQg/vitaly-gariev-xl4-Fq-RXbq38-unsplash.jpg"
                        className="w-full object-cover" />
                        <div className='w-full h-full absolute bg-black/50'></div>
                        <div className='absolute' >
                            <h1 className='sm:text-4xl text-2xl sm:pl-20 pl-17 pt-20' >Your Next Best Friend is Waiting.</h1>
                            <p className='sm:text-lg text-md sm:pl-20 pl-17 sm:w-[50%] w-[90%] mt-2 text-md '  >Meet pets who are ready to fill your home with love, chaos, and a lot of wagging tails.</p>
                        </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://images.ctfassets.net/2djrn56blv6r/3hZ6q6uAUcjEA9khhsWKPl/e859d5d4043e5bad366145490ee720e5/respon_pet_owner.jpeg?fm=webp&q=75&w=1920"
                        className="w-full object-cover" />
                        <div className='w-full h-full absolute bg-black/50'></div>
                        <div className='absolute' >
                            <h1 className='sm:text-4xl text-2xl sm:pl-20 pl-17 pt-20' >Find Joy in Every Wag and Purr.</h1>
                            <p className='sm:text-lg text-md sm:pl-20 pl-17 sm:w-[50%] w-[90%] mt-2 text-md '  >From playful kittens to loyal pups, PawMart connects you to pets that make life softer and brighter.</p>
                        </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel
