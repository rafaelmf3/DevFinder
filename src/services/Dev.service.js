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
  async getDevsWithFilter(search, location) {
    const cleanLocation = location.split(' ').join('-').replace(',', '')
    const { data } = await api.get('/search/users', {
      params: {
        q: `${search} location:${cleanLocation}`,
      },
    });
    return data.items
  }
}