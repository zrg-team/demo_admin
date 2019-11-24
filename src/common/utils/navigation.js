// import storeAccessible from './storeAccessible'

export function getDataFromNavigation (history) {
  try {
    const { location } = history
    return location.state
  } catch (err) {
    return null
  }
}
