export default {
  bind: function(el, binding, vnode) {
    if (binding.modifiers.mobile) {
      if (window.innerWidth <= 767) {
        document.body.style.overflowY = 'hidden'
      }
    } else {
      document.body.style.overflowY = 'hidden'
    }
  },
  unbind: function(el, binding, vnode) {
    document.body.style.overflowY = ''
  }
}
