import api from "./api";
import { AsyncStorage } from "react-native";


export default DevService = {
    async getDevRepos(devLogin) {
        const { data } = await api.get(`/users/${devLogin}/repos`)
        return data
    },
}