import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Avatar, Container, Login, Name, Followers, Profile } from "./styles"

import DevService from '../../services/Dev.service';

function Dev({ dev, navigation, user, city }) {
  const [profile, setProfile] = useState({});

  function handleDevProfile() {
    navigation.navigate('DevProfile', { dev: {...dev, ...profile}, user, city });
  }

  useEffect(() => {
    DevService.getDev(dev.login)
      .then( profile => { setProfile(profile); })
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
