import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#fff',
    marginLeft: 5,
  },
  rightBtn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  rightIcon: {
    color: '#fff',
    marginRight: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  author: {
    fontSize: 16,
  },
  authorBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  wrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagWrapperOuter: {
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 50
  },
  tagWrapper: {
    flexDirection: 'row',
  },
  tagLeft: {
    backgroundColor: '#4d4f4e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  tagRight: {
    backgroundColor: '#13c2ab',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  textWhite: {
    color: "#fff"
  },
  linkBtn: {
    fontSize: 18,
    color: 'blue',
    marginTop: 5,
    marginBottom: 10
  },
  marginBottom: {
    marginBottom: 10
  },
  marginLeft: {
    marginLeft: 10
  }
})
