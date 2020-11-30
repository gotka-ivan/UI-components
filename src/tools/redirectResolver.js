export default function(query) {
  console.log('query', query)
  if (query.cabinet) {
    return { name: 'appeals' }
  } else if (query.calculator) {
    return { name: 'calculator' }
  } else if (query.dialog) {
    return { name: 'dialog' }
  } else if (query.address) {
    return { name: 'dialog', query: { address: query.address } }
  } else if (query.replaceProductList) {
    return { name: 'cart', query: { replaceProductList: 'storage' } }
  } else if (query.encourage) {
    return { name: 'encourage', query: { encourageId: query.encourage } }
  } else if (query.shoppingId) {
    return { name: 'profile', query: { tab: 'shopping', shoppingId: query.shoppingId } }
  } else if (query.afishaShowId && query.favorite) {
    return { name: 'poster', params: { id: query.afishaShowId }, query: { favorite: true } }
  } else if (query.eventId && query.favorite) {
    return { name: 'volunteer', query: { eventId: query.eventId, favorite: true } }
  } else if (query.eventId) {
    return { name: 'volunteer', query: { eventId: query.eventId } }
  } else if (query.medicine) {
    return { name: 'medicine' }
  } else {
    return { name: 'main' }
  }
}
