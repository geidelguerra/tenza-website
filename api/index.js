export const getProjects = () => {
  return new Promise((resolve) => {
    const projects = [
      { id: 1, year: 2021, name: 'Grotto House' },
      { id: 2, year: 2021, name: 'Cliff House' },
      { id: 3, year: 2021, name: 'Youth Center' },
      { id: 4, year: 2021, name: 'Rooftop Bar Addition' },
      { id: 5, year: 2021, name: 'Brazil Restaurant' },
      { id: 6, year: 2021, name: 'Penthouse Duplex' },
      { id: 7, year: 2021, name: 'Lake House' }
    ].map(item => ({ ...item, url: `/projects/${item.id}` }))

    resolve(projects)
  })
}

export const getProject = async (id) => {
  return (await getProjects()).find(item => item.id === parseInt(id))
}
