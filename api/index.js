export const getProjects = () => {
  return new Promise((resolve) => {
    const projects = [
      {
        id: 1,
        year: 2021,
        name: 'Grotto House',
        thumbnail: {
          url: '/projects/grotto_house/grotto_house_thumbnail.jpg'
        },
        scene: {
          path: '/projects/grotto_house/grotto_house.glb'
        }
      },
      {
        id: 2,
        year: 2021,
        name: 'Cliff House',
        thumbnail: {
          url: '/projects/cliff_house/cliff_house_thumbnail.jpg'
        },
        scene: {
          path: '/projects/cliff_house/cliff_house.glb'
        }
      },
      {
        id: 3,
        year: 2021,
        name: 'Youth Center',
        thumbnail: {
          url: '/projects/youth_center/youth_center_thumbnail.jpg'
        },
        scene: {
          path: '/projects/youth_center/youth_center.glb'
        }
      },
      {
        id: 4,
        year: 2021,
        name: 'Rooftop Bar Addition',
        thumbnail: {
          url: '/projects/rooftop_bar_addition/rooftop_bar_addition_thumbnail.jpg'
        },
        scene: {
          path: '/projects/rooftop_bar_addition/rooftop_bar_addition.glb'
        }
      },
      {
        id: 5,
        year: 2021,
        name: 'Brazil Restaurant',
        thumbnail: {
          url: '/projects/brazil_restaurant/brazil_restaurant_thumbnail.jpg'
        },
        scene: {
          path: '/projects/brazil_restaurant/brazil_restaurant.glb'
        }
      },
      {
        id: 6,
        year: 2021,
        name: 'Penthouse Duplex',
        thumbnail: {
          url: '/projects/penthouse_duplex/penthouse_duplex_thumbnail.jpg'
        },
        scene: {
          path: '/projects/penthouse_duplex/penthouse_duplex.glb'
        }
      },
      {
        id: 7,
        year: 2021,
        name: 'Lake House',
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
