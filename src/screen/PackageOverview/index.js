import React, { Component, useCallback } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Linking,
  Alert,
  Share
} from 'react-native'
import PropTypes from 'prop-types'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import _ from 'lodash'
import styles from './styles'

const getResultUrl = (value) => `https://npm-registry-proxy.glitch.me/${value}/latest`
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Text style={styles.linkBtn} onPress={handlePress}>
      {children}
    </Text>
  )
};

export default class PackageOverview extends Component {
  state = {
    packageData: {}
  }

  componentDidMount = async () => {
    const { packageName } = this.props.route.params
    const result = await axios.get(getResultUrl(packageName))

    this.setState({ packageData: result.data })
  }

  onShare = async () => {
    const { name, homepage } = this.state.packageData || {}
    try {
      await Share.share({
        message: name,
        url: homepage
      })
    } catch (error) {
      alert(error.message);
    }
  };

  renderPackageContent = () => {
    const { packageData } = this.state
    const { name, license, description, version, homepage, keywords, author, _nodeVersion, _npmVersion, dependencies = {} } = packageData || {}
    const dependenciesList = Object.entries(dependencies).map(([key, value]) => ({key,value}));

    if (_.isEmpty(packageData)) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#13c2ab" />
        </View>
      )
    }

    return (
      <View style={styles.innerContainer}>
        <Text style={styles.name}>{_.toUpper(name)}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.tagWrapperOuter}>
          <View style={styles.tagWrapper}>
            <View style={styles.tagLeft}>
              <Text style={styles.textWhite}>License</Text>
            </View>
            <View style={styles.tagRight}>
              <Text style={styles.textWhite}>{license}</Text>
            </View>
          </View>
          <View style={styles.tagWrapper}>
            <View style={styles.tagLeft}>
              <Text style={styles.textWhite}>Version</Text>
            </View>
            <View style={styles.tagRight}>
              <Text style={styles.textWhite}>{version}</Text>
            </View>
          </View>
        </View>
        {
          !_.isEmpty(author) && <View style={styles.wrapper}>
            <Text style={styles.authorBold}>Author: </Text>
            <Text style={styles.author}>{author.name}</Text>
          </View>
        }
        <View>
          <Text style={styles.authorBold}>Homepage:</Text>
          <OpenURLButton url={homepage}>
            {homepage}
          </OpenURLButton>
        </View>
        {
          !!_nodeVersion && <View style={styles.wrapper}>
            <Text style={styles.authorBold}>Node version: </Text>
            <Text style={styles.author}>{_nodeVersion}</Text>
          </View>
        }
        {
          !!_npmVersion && <View style={styles.wrapper}>
            <Text style={styles.authorBold}>Npm version: </Text>
            <Text style={styles.author}>{_npmVersion}</Text>
          </View>
        }
        {
          !_.isEmpty(keywords) && <View style={styles.wrapper}>
            <Text style={styles.authorBold}>Keywords: </Text>
            <Text style={styles.author}>{keywords.join(', ')}</Text>
          </View>
        }
        {
          !_.isEmpty(dependenciesList) && (
            <View>
              <Text style={[styles.authorBold, styles.marginBottom]}>{`Dependencies (${dependenciesList.length}): `}</Text>
              {
                dependenciesList.map(({ key, value }) => (
                  <View style={[styles.wrapper, styles.marginLeft]} key={key}>
                    <Text style={styles.authorBold}>{`+ ${key}: `}</Text>
                    <Text style={styles.author}>{value}</Text>
                  </View>
                ))
              }
            </View>
          )
        }
      </View>
    )
  }

  render() {
    const { goBack } = this.props.navigation

    return (
      <View style={styles.container}>
        <Header
          barStyle="light-content"
          centerComponent={{ text: 'Package Overview', style: { color: '#fff', fontWeight: 'bold' } }}
          containerStyle={{
            backgroundColor: '#13c2ab',
            justifyContent: 'space-around',
          }}
          leftComponent={(
            <TouchableOpacity style={styles.backWrapper} onPress={goBack}>
              <Icon name="md-arrow-back" size={24} style={styles.backIcon} />
            </TouchableOpacity>
          )}
          rightComponent={(
            <TouchableOpacity style={styles.rightBtn} onPress={this.onShare}>
              <Icon name="md-share" size={24} style={styles.rightIcon} />
            </TouchableOpacity>
          )}
        />
        {this.renderPackageContent()}
      </View>
    )
  }
}

PackageOverview.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}
