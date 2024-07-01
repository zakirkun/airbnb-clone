import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/hooks/useWarmUpBrowser'
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

enum Strategy {
  Google = 'oauth_google',
  Facebook = 'oauth_facebook',
  Apple = 'oauth_apple'
}


const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple'})
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google'})
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook'})

  const onSelectAuth = async (strategy: Strategy) => {
  
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if(createdSessionId){
        setActive!({session: createdSessionId});
        router.back();
      }
    } catch (err) {
      console.log('OAuth Error: ', err);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput autoCapitalize="none" placeholder="Email" style={[defaultStyles.inputField, { marginBottom: 30}]}/>
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>
          Continue
        </Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View style={{
          flex: 1,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}/>
        <Text style={styles.seperator}>OR</Text>
        <View style={{
          flex: 1,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}/>
      </View>
      <View style={{gap: 20}}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>
            Continue With Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} onPress={() => onSelectAuth(Strategy.Apple)} />
          <Text style={styles.btnOutlineText}>
            Continue With Apple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} onPress={() => onSelectAuth(Strategy.Google)}  />
          <Text style={styles.btnOutlineText}>
            Continue With Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)} >
          <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>
            Continue With Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});

export default Page