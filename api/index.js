export const getProjects = () => {
  return new Promise((resolve) => {
    const projects = [
      {
        id: 1,
        year: 2021,
        name: 'Grotto House',
        scene: {
          path: '/models/scene_test.glb'
        }
      },
      {
        id: 2,
        year: 2021,
        name: 'Cliff House',
        scene: {
          path: '/models/LittlestTokyo.glb'
        }
      },
      {
        id: 3,
        year: 2021,
        name: 'Youth Center',
        scene: {
          path: '/models/LittlestTokyo.glb'
        }
      },
      {
        id: 4,
        year: 2021,
        name: 'Rooftop Bar Addition',
        scene: {
          path: '/models/LittlestTokyo.glb'
        }
      },
      {
        id: 5,
        year: 2021,
        name: 'Brazil Restaurant',
        scene: {
          path: '/projects/Brazil_Restaurant/Brazil_Restaurant.glb'
        }
      },
      {
        id: 6,
        year: 2021,
        name: 'Penthouse Duplex',
        scene: {
          path: '/models/LittlestTokyo.glb'
        }
      },
      {
        id: 7,
        year: 2021,
        name: 'Lake House',
        scene: {
          path: '/models/LittlestTokyo.glb'
        }
      }
    ].map(item => ({ ...item, url: `/projects/${item.id}` }))

    resolve(projects)
  })
}

export const getProject = async (id) => {
  return (await getProjects()).find(item => item.id === parseInt(id))
}
