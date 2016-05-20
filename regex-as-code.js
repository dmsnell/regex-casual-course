const { l } = require( './assets/prelude.js' )

const haystack = `
This is a simple example of a string in which
we want to search.

ERROR Jun 15 2015 Another silly bug
ERROR 2016-05-08 15:31 -0500 Silly code detected - process aborted
`

const buildRegex = pieces =>
  new RegExp(
    pieces.map( o => o.source ).join( '' ),
    Object.keys( pieces
      .map( o => o.flags.split( '' ) )
      .reduce( ( t, c ) => t.concat( c ), [] )
      .reduce( ( t, c ) => Object.assign( t, { [c]: true } ), {} )
    ).join( '' )
  )

const capture = r => new RegExp( `(${ r.source })` )

const needle = /^error\s+(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}\s+[+-]?\d{0,4})\s+(.*)$/mi

const errorLevel = level => new RegExp( `${ level }`, 'im' )
const dateString = /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}\s+[+-]?\d{0,4}/

const dateString = buildRegex( [
  /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}\s+[+-]?\d{0,4}/
] )

const stringExp = new RegExp(
  '^error\\s+' +
  '(' +
    '(\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}\\s+[+-]?\\d{0,4})' + // date string
    '|' +
    '(\\w{3} \\d{1,2} \\d{4})' + // date string - Jun 15 2015
  ')' +
  '\\s+' +
  '(.*)$' // error message
, 'mi' )

const whitespace = /\s+/

const logLine = buildRegex( [
  /^/,
  errorLevel( 'error' ),
  whitespace,
  capture( dateString ),
  whitespace,
  /(.*)/,
  /$/
] )

l( stringExp )
l( logLine )
l( logLine.exec( haystack ) )
