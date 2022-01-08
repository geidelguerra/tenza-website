export const getProjects = () => {
  return new Promise((resolve) => {
    const projects = [
      {
        id: 1,
        year: 2016,
        name: 'Grotto House',
        location: 'Havana',
        area: 2100,
        description: 'Grotto House was designed as a residence for Airbnb rentals in Havana, Cuba. The four-bedroom house is equipped with an indoor-outdoor climatized pool and a jacuzzi in the living room area as per the client\'s request.',
        thumbnail: {
          url: '/projects/grotto_house/grotto_house_thumbnail.jpg'
        },
        scene: {
          path: '/projects/grotto_house/grotto_house.glb'
        }
      },
      {
        id: 2,
        year: 2017,
        name: 'Cliff House',
        location: 'Corsica, France',
        area: 2000,
        description: 'For us, the Cliff house was an opportunity for relaxation. With such a beautiful location in the coastal city of Corsica, extraordinarily little else was required from us. A window wall along the full length of the house frames the already astonishing landscape and the infinity edge pool is a nice touch that connects the high-in-the-cliff experience with the mountains in the horizon.',
        thumbnail: {
          url: '/projects/cliff_house/cliff_house_thumbnail.jpg'
        },
        scene: {
          path: '/projects/cliff_house/cliff_house.glb'
        }
      },
      {
        id: 3,
        year: 2015,
        name: 'Youth Center',
        location: 'Havana',
        area: 9700,
        description: 'A hub for young people located in one of the lowest-income neighborhoods in Havana. Playful and simple, the geometric forms are designed to stand out in the neo-classical sorrounding. The program includes a conference hall, coffee shop, gymnasium, art gallery, game room, playground, and storage space.',
        thumbnail: {
          url: '/projects/youth_center/youth_center_thumbnail.jpg'
        },
        scene: {
          path: '/projects/youth_center/youth_center.glb'
        }
      },
      {
        id: 4,
        year: 2019,
        name: 'Rooftop Bar Addition',
        location: 'Brooklyn, NY',
        area: 500,
        description: 'Originally designed for the Versus Bar, a rooftop bar in Havana, this box was re-engineered for the VIP section of The Water Tower Bar in Williamsburg, NY. The glass box is covered with cypress wood slates. At night, the vintage look of this light box and its iconic texture serves as a landmark for all visitors looking for an extraordinary experience.',
        thumbnail: {
          url: '/projects/rooftop_bar_addition/rooftop_bar_addition_thumbnail.jpg'
        },
        scene: {
          path: '/projects/rooftop_bar_addition/rooftop_bar_addition.glb'
        }
      },
      {
        id: 5,
        year: 2019,
        name: 'Brazil Restaurant',
        location: 'Havana',
        area: 10100,
        description: 'A restoration and adaptative reuse of a historic building in Teniente Rey (Brazil Street), La Habana Vieja. Nothing was left but the façade and cast-iron columns of this beautiful neocolonial house after decades of abandonment. The client wanted to revive the 1920 building’s vibe with a modern touch. The renewed building houses a restaurant in the lower level with a glass store front, rental apartments on the second floor, and a rooftop bar with a viewpoint over the historical district. A wooden staircase connects the lower and upper level in place of the original atrium and becomes a chandelier as it touches the floor. The historic façade, wooden skylight and cast-iron columns were restored to their former glory.',
        thumbnail: {
          url: '/projects/brazil_restaurant/brazil_restaurant_thumbnail.jpg'
        },
        scene: {
          path: '/projects/brazil_restaurant/brazil_restaurant.glb'
        }
      },
      {
        id: 6,
        year: 2015,
        name: 'Penthouse Duplex',
        location: 'Havana',
        area: 1000,
        description: 'Designed as an addition for an existing penthouse in the historic Malecon of Havana. This “duplex” was thought to be lived as a bachelor’s apartment. No interior walls were incorporated as per the client’s request, and the sequence of spaces are only insinuated by the furniture. An oval skylight over a sand garden are the central piece of the design and four outdoor terraces allow for a 360o interaction with the city. A quiet piece of heaven above the chaos of the city below.',
        thumbnail: {
          url: '/projects/penthouse_duplex/penthouse_duplex_thumbnail.jpg'
        },
        scene: {
          path: '/projects/penthouse_duplex/penthouse_duplex.glb'
        }
      },
      {
        id: 7,
        year: 2020,
        name: 'Lake House',
        location: 'Westchester, NY',
        area: 30000,
        description: 'A single-family house on a large-wooded plot that fronts on one of Cortlandt\'s Lakes. The new construction is to have four (4) master bedrooms, six (6) guest bedrooms, generous living spaces that include an expansive living room, large open kitchen, formal dining room, home offices, and library/music room. A variety of leisure and recreation spaces are also planned, among them a home theater, gym, indoor and outdoor swimming pools, and a solarium; provisions are also made for staff accommodations. The site will be landscaped to minimize the presence of the house from the upland side, while providing expansive views of the lake and surrounding woodlands. A covered parking with charging stations will be provided for six electric cars.',
        thumbnail: {
          url: '/projects/lake_house/lake_house_thumbnail.jpg'
        },
        scene: {
          path: '/projects/lake_house/lake_house.glb'
        }
      }
    ]

    resolve(projects)
  })
}

export const getProject = async (id) => {
  return (await getProjects()).find(item => item.id === parseInt(id))
}
