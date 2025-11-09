import React from 'react'

const MeetOurPetHeroes = () => {
  const heroes = [
    {
      name: "Ayesha Rahman",
      story: "Rescued a stray kitten and gave her a forever home. Now they’re inseparable.",
      img: "https://www.yourtango.com/sites/default/files/image_blog/2024-09/type-single-person-loner.png",
      pet: "Luna the Cat"
    },

    {
      name: "Imran Chowdhury",
      story: "Adopted Bruno after he was abandoned during floods. Bruno’s now his hiking buddy.",
      img: "https://images.unsplash.com/photo-1597204081767-4c14a6b7cbec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2luZ2xlJTIwcGVyc29ufGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
      pet: "Bruno the Dog"
    },
    {
      name: "Sadia Karim",
      story: "Runs a small local rescue shelter supported through PawMart’s adoption program.",
      img: "https://st.depositphotos.com/3248091/4734/i/950/depositphotos_47341871-stock-photo-bangladesh-people.jpg",
      pet: "Shelter Mama"
    },
    {
      name: "Zayan Hossain",
      story: "Volunteers weekly to help abandoned pets get vaccinated and rehomed.",
      img: "https://shutterstock.com/image-photo/young-man-wear-casual-clothes-260nw-2606626961.jpg",
      pet: "Community Helper"
    }
  ]

  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-orange-600 mb-3">Meet Our Pet Heroes</h2>
        <p className="text-gray-600  max-w-2xl mx-auto text-base sm:text-lg">
          These incredible people opened their hearts and homes to pets in need.  
          Every adoption writes a new story of love, rescue, and compassion.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {heroes.map((hero, index) => (
          <div key={index} className=" p-6 rounded-2xl shadow-md border bg-orange-50/50 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
            <img
              src={hero.img}
              alt={hero.name}
              className="w-32 h-32  rounded-full object-cover mb-4 border-4 border-orange-400"
            />
            <h3 className="text-xl font-semibold text-gray-800">{hero.name}</h3>
            <p className="text-sm text-orange-500 mb-1">{hero.pet}</p>
            <p className="text-gray-600  text-sm mt-2 ">{hero.story} </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MeetOurPetHeroes
