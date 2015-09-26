/*
 * ref: http://habrahabr.ru/post/230887/
 * using it:
 var hered0c = heredoc(function () {/.*
	Меня нет
	Совсем нет
	Полностью - до конца!
	Меня никогда не было и не будет.
	И не спрашивайте на форумах где я,
	Там меня всегда бьют и обижают потом!
	Они не понимают меня и не знают где я... © HEREDOC
 *./});

  outln(hered0c);
 */
 

!function (root) {

  function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
  }

  var stripPattern = /^\s*(?=[^\s]+)/mg
  heredoc.strip = function(fn) {
    var text = heredoc(fn)
    
    var indentLen = text.match(stripPattern)
                                 .reduce(function (min, line) {
      return Math.min(min, line.length)
    }, Infinity)

    var indent = new RegExp('^\\s{' + indentLen + '}', 'mg')
    return indentLen > 0
      ? text.replace(indent, '')
      : text
  }

  if (typeof exports === 'object') {
    module.exports = heredoc
  }
  else if (typeof define === 'function' && define.amd) {
    define(function() {
      return heredoc
    })
  }
  else {
    root.heredoc = heredoc
  }
}(this)
