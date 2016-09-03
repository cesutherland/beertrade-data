'use strict';

module.exports = {
  iso: iso,
  ft: ft,
	isoft: isoft,
  parseTrade: parseTrade
};

// Matchers:
function iso () { return /((?:^|[\ \.:,*\[\(])+iso[\]\):,;*\-\.\ ]+)/mi; }
function ft  () { return /((?:^|[\ \.:,*\[\(])+ft[\]\):,;*\-\.\ ]+)/mi; }

// Splitter:
function isoft () {
	return /((?:(?:^|[\ \.:,*\[\(])+iso[\]\):,;*\-\.\ ]+)|(?:(?:^|[\ \.:,*\[\(])+ft[\]\):,;*\-\.\ ]+))/mi;
}

// Split iso/ft for a trade:
function parseTrade (item) {
  item.iso = '';
  item.ft = '';

  var pieces = item.title.split(isoft());

  for (var i = 0; i < pieces.length; i++) {
    // record iso match if we haven't found one:
    if (!item.iso && iso().test(pieces[i]) && pieces[i+1]) {
      item.iso = pieces[i+1];
    } else
    // record ft match if we haven't found one:
    if (!item.ft && ft().test(pieces[i]) && pieces[i+1]) {
			item.ft = pieces[i+1];
    }
  }

  return item;
}
