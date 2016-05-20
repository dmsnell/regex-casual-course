<?php

$badHTML = <<<EOA
<div>
<img src="bob.foo" title="No <strong>formatting</strong> here"><!-- this doesn't belong here --></img>
</div>
EOA;

$dom = new DOMDocument();
$dom->loadHTML( $badHTML, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
$xpath = new DOMXPath( $dom );

// Strip out all HTML tags from attributes
$nodes = $xpath->query('//@*');
echo PHP_EOL;
foreach ( $nodes as $node ) {
    if ( $node->nodeName === 'weird-data-thing' ) { continue; }

    $node->parentNode->setAttribute( $node->nodeName, strip_tags( $node->nodeValue ) );
}

// Strip out all HTML comments
foreach ( $xpath->query( '//comment()' ) as $comment ) {
    $comment->parentNode->removeChild( $comment );
}

echo PHP_EOL . 'Cleaned up!' . PHP_EOL . PHP_EOL;
$dom->normalizeDocument();
print_r( $dom->saveHTML() );
