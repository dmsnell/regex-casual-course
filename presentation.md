# Regular Expressions
## Dennis Snell

> Note: The JavaScript examples require Node 6+ to run

  - Parsing 101
    - LL, LR, LALR, PEG, oh my!
    - Parsing is the intermediate step in translation
    - Mathematical certainty and uncertainty

  - What are Regular Expressions?
    - There's theory behind them
      - Nonfinite state machines
      - Finite state machines
      - Code example
    - What are REGEXPs?
      - Math gone ad-hoc
      - Backreference
        - /(\d+)-(\w+)123-\1-\2/
        - 456-abc-123-456-abc
        - 456-abc-123-234-cde
      - Look-ahead/look-behind
        - /d(?>e)/
      - Capture groups
        - /cat(\w+)/ -> { fullmatch: 'catatonic', matches: [ 'atonic' ] }
        - /cat(<restOfWord>\w+>)/ -> { restOfWord: 'atonic' }
      - Alternation
        - /cat|dog|ape|hare/
      - _Recursive descent with backtracking…is not guaranteed to terminate unless the grammar is LL(k). Even when they terminate…may require exponential time._
      - Code example

  - When is it appropriate to use them?
    - Regular expressions are not parsers - they are pattern matchers
    - In other words, they are structurally unaware
    - Use them when structure doesn't matter
    - Avoid them when it does
    - /\s(\w+)="([^"]+)"/
    - <html><head><<script src=asdfasdf></script></head></html>
        - <div><div><div><div><div></div></div></div></div>
        - $dom = new DOMDocument();

  - How should they be written?
    - REGEXs are a domain-specific language
    - REGEXs are just code in another language
    - The rules don't change just because we're
      writing in another language.
    - The complexity of a regular expression is a product
      of the combination of the pattern _and_ the search string.

  - Regexp Syntax (PCRE)
    - Alternation
      - /\d|x|-|\|/
      - /youtube.com|youtu.be/
    - Greed and laziness
      - /"(.+)"/U -> `<div class="te"st">` -> te
    - Grouping and capturing (and not capturing)
      - /(wordpress)/i -> wordpresser -> wordpress
      - /(+?0?1)?(\d{3})-(\d{3}-\d{4})/ -> "badPhoneNumberValidator"
        - 111-222-3456 -> [ '', '111', '222-3456' ]
        - /(?:(\d{3}-)+)-(\d{3}-\d{4})/ -> [ '222-3456' ] -> '222-3456'
    - Backreferences
      - /(\d{3})-\1-\d{4}/
    - the mess
      - (?>)
      - (?:)
      - (?=)
      - (<name>)

  - PHP vs. JavaScript (vs. PCRE vs. Java vs. Ruby vs. grep vs. awk vs. sed vs. vim vs. …)

  - Tips
    - "it is more important to consider what it should not match, than what it should"
      - /(katapult|katamaran|katatonic)/
      - /(kata(?:pult|maran|tonic))/
      - /([^a]+b)|(\w+a)/ -> 'This is a funny regular expression'
      - /./ -> BE WARNED!
      - /* /-> BE WARNED! -> 0 or more
        - /a*/ -> "bbbbbbbbbb" -> true
        - /a+/ -> "bbbbbbbbbb" -> false + means 1 or more
          - /a+/ -> /aa*/

    - "Be very careful if you…[allow] users to supply their own regular expressions. People have surprising skill at coming up with exponentially complex regular expressions"
      - $node->attributes ... "<div class="{ attribute }">"
    - Fail-fast!
    - "Not really a “vulnerability”, as such. Mainly it shows that regular expressions are very, very powerful, and shockingly easy to get wrong. Sometimes in interesting, potentially amusing, ways."

  - Links
    - https://regex101.com/
    - http://www.regular-expressions.info/
    - http://stackoverflow.com/questions/3577641/how-do-you-parse-and-process-html-xml-in-php
    - https://nikic.github.io/2012/06/15/The-true-power-of-regular-expressions.html
