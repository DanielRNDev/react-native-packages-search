import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon: {
    paddingRight: 5
  },
  searchHeader: {
    flexDirection: 'row',
    marginTop: 10
  },
  searchBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#13c2ab',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchText: {
    color: '#fff'
  },
  inputWrapper: {
    width: '80%'
  },
  inputContainerStyle: {
    justifyContent: 'space-between',
    borderColor: '#13c2ab',
    borderWidth: 1
  },
  inputStyle: {
    marginLeft: 5
  },
  suggestionBanner: {
    position: 'absolute',
    top: 62,
    width: width - 20,
    backgroundColor: '#13c2ab',
    marginHorizontal: 10
  },
  suggestionItem: {
    padding: 10,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  suggestionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2
  },
  suggestionDescription: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#fff'
  },
  resultWrapper: {
    backgroundColor: '#13c2ab',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20
  },
  version: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2
  }
})
