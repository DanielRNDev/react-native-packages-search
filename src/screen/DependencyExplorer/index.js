import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Linking
} from 'react-native'
import PropTypes from 'prop-types'
import { Header, Input } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import styles from './styles'

const urlScheme = 'packagessearch://'

const getSuggestionUrl = (value) => `https://npm-registry-proxy.glitch.me/search/suggestions?q=${value}`

export default class DependencyExplorer extends Component {
  state = {
    value: '',
    suggestions: [],
    result: []
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL = (event) => {
    const { navigation } = this.props

    if (event.url.includes(urlScheme)) {
      navigation.navigate('PackageOverview', { packageName: event.url.slice(event.url.lastIndexOf('/') + 1) })
      // Get package name after url-scheme and link to package overview
    }
  }

  handleGetSuggestion = async (value) => {
    const result = await axios.get(getSuggestionUrl(value))

    if (result.data) {
      this.setState({ suggestions: _.chunk(result.data, 5)[0], result: result.data }) // Suggest maximum 5 items for better UI
    }
  }

  onChangeText = (value) => {
    this.setState({ value }, () => {
      this.handleGetSuggestion(value)
    })
  }

  navigateToOverview = (packageName) => {
    const { navigation } = this.props

    navigation.navigate('PackageOverview', { packageName })
  }

  onPressSearch = () => this.setState({ suggestions: [] })

  renderSearchBox = () => {
    const { value } = this.state

    return (
      <View style={styles.searchHeader}>
        <Input
          leftIcon={{ type: 'material-icons', name: 'search', style: styles.searchIcon }}
          placeholder="Enter package name"
          containerStyle={styles.inputWrapper}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          value={value}
          onChangeText={this.onChangeText}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={this.onPressSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSuggestionItem = ({ item, index }) => {
    const { suggestions } = this.state
    const { name, description } = item

    return (
      <TouchableOpacity
        style={[styles.suggestionItem, index !== suggestions.length - 1 ? styles.itemBorder : {}]}
        onPress={() => this.navigateToOverview(name)}
      >
        <Text style={styles.suggestionName}>{name}</Text>
        <Text style={styles.suggestionDescription} numberOfLines={1}>{description}</Text>
      </TouchableOpacity>
    )
  }

  renderSuggestionList = () => {
    const { suggestions } = this.state

    if (_.isEmpty(suggestions)) {
      return null
    }

    return (
      <FlatList
        style={styles.suggestionBanner}
        data={suggestions}
        renderItem={this.renderSuggestionItem}
        keyExtractor={(item) => item.name}
      />
    )
  }

  renderResultItem = ({ item, index }) => {
    const { result } = this.state
    const { name, description, version } = item

    return (
      <TouchableOpacity
        style={[styles.suggestionItem, index !== result.length - 1 ? styles.itemBorder : {}]}
        onPress={() => this.navigateToOverview(name)}
      >
        <Text style={styles.suggestionName}>{name}</Text>
        <Text style={styles.suggestionDescription}>{description}</Text>
        <Text style={styles.version}>{`Latest version: ${version}`}</Text>
      </TouchableOpacity>
    )
  }

  renderSearchResult = () => {
    const { result, suggestions } = this.state

    if (!_.isEmpty(suggestions) || _.isEmpty(result)) {
      return null
    }

    return (
      <FlatList
        style={styles.resultWrapper}
        data={result}
        renderItem={this.renderResultItem}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          barStyle="light-content"
          centerComponent={{ text: 'Dependency Explorer', style: { color: '#fff', fontWeight: 'bold' } }}
          containerStyle={{
            backgroundColor: '#13c2ab',
            justifyContent: 'space-around',
          }}
        />
        <View style={styles.innerContainer}>
          {this.renderSearchBox()}
          {this.renderSearchResult()}
          {this.renderSuggestionList()}
        </View>
      </View>
    )
  }
}

DependencyExplorer.propTypes = {
  navigation: PropTypes.object
}
