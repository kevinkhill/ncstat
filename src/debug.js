function out(str) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(str)
  }
}

module.exports = {
  out
}
