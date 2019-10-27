import api from "./api";

export default DevService = {
  async getDev(devLogin) {
    const { data } = await api.get(`/users/${devLogin}`)
    return data
  },
  async getDevRepos(devLogin) {
    const { data } = await api.get(`/users/${devLogin}/repos`)
    return data
  },
  async getDevsWithFilter(search, location, page, perPage) {

    if (search !== '' && location !== '' ) {
      const { data } = await api.get('/search/users', {
        params: {
          q:`${search} location:"${location}"`,
          page,
          per_page: perPage,
        },
      });
      return data
    }

    if ( location !== '' ) {
      const { data } = await api.get('/search/users', {
        params: {
          //location: cleanLocation,
          q: `location:"${location}"`,
          page,
          per_page: perPage,
        },
      });
      return data
    }





  }
}
