const l = m => console.log( m )
const now = () => {
  const [ s, ns ] = process.hrtime()

  return s + 1e-9 * ns
}

module.exports = {
  l,
  now
}
