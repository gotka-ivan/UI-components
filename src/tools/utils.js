export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

export function toUpperCaseFirst(text) {
  return text[0].toUpperCase() + text.slice(1)
}

export function getParamsFromUrl(url = window.location.search) {
  return url
    .replace('?', '')
    .split('&')
    .reduce(function(p, e) {
      let a = e.split('=')
      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1])
      return p
    }, {})
}
