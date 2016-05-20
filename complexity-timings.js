const { l, now } = require( './assets/prelude.js' )

const timed = ( body, message ) => {
  const tic = now()
  body()
  const toc = now()

  if ( ! message ) { return }

  l( `Took ${ toc - tic } seconds: ${ message }` )
}

const aPattern = /(a*)*b/
const aString = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaa'

timed( () => aPattern.test( 'dummy' ) )
timed( () => aPattern.test( aString + 'b' ), 'match' )
timed( () => aPattern.test( aString ), 'no match' )
l( `${ aString.length } branching points…` )
