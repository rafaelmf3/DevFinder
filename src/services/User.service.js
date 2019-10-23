import api from "./api";
import buffer from 'buffer';


export default UserService = {
    async login(username, password) {
        let b = new buffer.Buffer(username + ':' + password);
        let encondedAuth = b.toString('base64');
        const { data } = await api.get('/user', {
            headers: {
                'Authorization': 'Basic ' + encondedAuth
            }
        })

        return data
    }
}