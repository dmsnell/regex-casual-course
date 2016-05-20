/\[(\[?)([^\[\]\/\s\u00a0\u200b]+)(?![\w-])([^\]\/]*(?:\/(?!\])[^\]\/]*)*?)(?:(\/)\]|\](?:([^\[]*(?:\[(?!\/\2\])[^\[]*)*)(\[\/\2\]))?)(\]?)/

export const shortcodePattern = new RegExp(
	'\\[' +                                  // starts with an opening bracket
	'(\\[?)' +                               // \1 - may have an additional bracket?
	'([^\\[\\]\\/\\s\\u00a0\\u200b]+)' +     // \2 - shortcode tag, not those characters
	'(?![\\w-])' +                           // \3 - attributes - not followed by charater or hyphen
	'([^\\]\\/]*' +                          // \4 - not a \, but 0 or more /
		'(?:\\/' +                             // nc - some number of groups starting with / (ungreedy)
			'(?!\\])[^\\]\\/]*' +                // nc - not followed by ], then \ then /
		')*?' +                                //
	')' +                                    //
	'(?:' +                                  // nc
		'(\\/)\\]|\\]' +                       // \5 - inner text - /] or just ]
		'(?:' +                                // nc
			'([^\\[]*' +                         // \6 - any number of things but not a closing [
				'(?:\\[' +                         // nc - starts with closing [
					'(?!\\/\\2\\])[^\\[]*' +         // \7 - not followed by /tag], not [, zero or more times
				')*' +                             //
			')' +                                //
			'(\\[\\/\\2\\])' +                   // \8 - [/tag] optional
		')?' +                                 //
	')' +                                    //
	'(\\]?)'                                 // \9 - closing ], optional
);
