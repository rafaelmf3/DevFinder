import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Avatar, Container, Login, Name, Followers, Profile } from "./styles"

import api from "../../services/api";

function Dev({ dev, navigation, user, city }) {
  const [profile, setProfile] = useState({});

  function handleDevProfile() {
    navigation.navigate('DevProfile', { dev, user, city });
  }
  console.log(dev);


  useEffect(() => {
    api.get(`/users/${dev.login}`).then(
      response => { setProfile(response.data); }
    )
  }, []);

  return (
    <TouchableOpacity onPress={handleDevProfile}>
      <Container>

        <Avatar source={{ uri: profile.avatar_url }} />
        <Profile>
          <Name>{profile.name}</Name>
          <Login>{profile.login}</Login>
          <Followers>Followers: {profile.followers}</Followers>

        </Profile>
      </Container>
    </TouchableOpacity>
  );
}

export default withNavigation(Dev);
