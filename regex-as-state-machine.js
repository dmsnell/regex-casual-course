const {
  l
} = require( './assets/prelude.js' )

const emails = [
  [ 'what+is+wrong@email.com', true ],
  [ '@example.com', false ],
  [ '1234567890@example.com', true ],
  [ '.email@example.com', false ],
  [ 'email@111.222.333.44444', false ],
  [ 'just"not"right@example.com', false ],
  [ 'email@example.co.jp', true ]
]

const isLetter = a => {
  const l = a.toLowerCase()
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

  return alphabet.includes( l )
}

const isNumber = a => {
  const d = parseInt( a, 10 )

  return ( d >= 0 && d <= 9 )
}

const initialState = {
  count: 0,
  position: 0,
  state: 0
}
const badValidatorStateMachine = ( email, prevState = initialState ) => {
  const { count, position, state } = prevState

  if ( ! email.length ) {
    return (
      2 === state &&
      count > 0 &&
      count < 6
    )
  }

  const bit = email[0]
  const next = email.slice( 1 )
  const nextState = {
    state,
    count,
    position: position + 1,
    group1: ''
  }

  // l( `state ${ state }: bit = ${ bit } … ${ next }` )

  switch ( state ) {
    case 0:
      if (
        ! isLetter( bit ) &&
        ! isNumber( bit ) &&
        bit !== '_' &&
        bit !== '-' &&
        bit !== '.' &&
        ( position === 0 || bit !== '@' )
      ) { return false }

      nextState.group1 += bit

      return ( '@' === bit )
        ? badValidatorStateMachine( next, Object.assign( {}, nextState, { state: 1 } ) )
        : badValidatorStateMachine( next, nextState )

    case 1:
      if (
        ! isLetter( bit ) &&
        ! isNumber( bit ) &&
        bit !== '-' &&
        bit !== '.'
      ) { return false }

      return ( '.' === bit )
        ? badValidatorStateMachine( next, Object.assign( {}, nextState, { state: 2 } ) )
        : badValidatorStateMachine( next, nextState )

    case 2:
      if (
        ! isLetter( bit ) &&
        bit !== '.'
      ) { return false }

      return ( count < 6 )
        ? badValidatorStateMachine( next, Object.assign( {}, nextState, { count: count + 1 } ) )
        : false;
  }
}

l( 'Regex' )
const badValidator = /^([a-z0-9_\.-]+)@[\da-z\.-]+\.[a-z\.]{2,6}$/
emails.forEach(
  ( [ email, isValid ] ) =>
    badValidator.test( email ) === isValid
      ? l( `${ email } tested properly` )
      : l( `${ email } tested improperly` )
)

l( '\nState Machine' )
emails.forEach(
  ( [ email, isValid ] ) =>
    badValidatorStateMachine( email ) === isValid
      ? l( `${ email } tested properly` )
      : l( `${ email } tested improperly` )
)

l( '\nComparison' )
emails.forEach(
  ( [ email, ] ) =>
    badValidator.test( email ) === badValidatorStateMachine( email )
      ? l( `   match for ${ email }` )
      : l( `no match ${ email }` )
)
