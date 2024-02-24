<?php if (!defined('PmWiki')) exit();
/**
  Filterable lists and tables for PmWiki
  Written by (c) Petko Yotov 2020-2024   www.pmwiki.org/Petko
  License: MIT
  
  This extension creates search boxes for large lists and tables.
*/

$RecipeInfo['Filterable']['Version'] = '2024-02-24';

SDVA($Filterable, [
  'selector' => 'ul.filterable, ol.filterable, table.filterable',
  'minsize' => 5,
]);

function initFilterable() {
  global $Filterable;

  $conf = array_merge($Filterable, extGetConfig());
  
  $dataconf = [
    'selector'   => $conf['selector'],
    'minsize' => $conf['minsize'],
    'ftable'  => XL('Filter table'),
    'flist'   => XL('Filter list'),
  ];
  $attrs = [];
  $attrs['filterable.js']['data-conf'] = $dataconf;
  
  extAddResource('jets/jets.min.js filterable.js', $attrs);
}

initFilterable();



