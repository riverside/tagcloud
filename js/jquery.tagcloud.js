/*
 * jQuery TagCloud plugin 1.0
 *
 * Copyright (c) 2009 Dimitar Ivanov
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){
	
	$.fn.addtag = function(options){

		var defaults = {
			aclass: 'delbutton',
			divider: '-',
			prefix: '',
			sclass: 'tagz'
		};
		
		var options = $.extend(defaults, options);
		
		return this.each(function(){

			var text = $(this).val();
			var temp = new Array();
			temp = text.split(',');
			for (var i = 0; i < temp.length; i++) {
				var t = temp[i]
					.toLowerCase()
					.replace(/^\s+|\s+$/g, "")
					.replace(/[_|\s]+/g, "-")
					.replace(/[^a-z\u0400-\u04FF0-9-]+/g, "")
					.replace(/[-]+/g, "-")
					.replace(/^-+|-+$/g, "")
					.replace(/[-]+/g, options.divider)
				;
				if (t.length == 0) continue;
				
				var last_id = ($('a.' + options.aclass).length == 0) ? 'span' + options.prefix + '_0' : $('a.' + options.aclass + ':last').attr('id');
				var lid = new Array();
				lid = last_id.split('_');

				$(document.createElement('span'))
					.attr('class', options.sclass)
					.attr('id', 'span' + options.prefix + '_' + (parseInt(lid[1]) + 1))
					.append(document.createTextNode(temp[i]))
					.prependTo('#'+options.holder_id)
				;
				$(document.createElement('a'))
					.attr('class', options.aclass)
					.attr('id', 'tag' + options.prefix + '_' + (parseInt(lid[1]) + 1))
					.click(function(){
						$(this).removetag({id : 'span' + options.prefix + '_' + (parseInt(lid[1]) + 1), holder_id : options.holder_id});
					})
					.append(document.createTextNode('X'))
					.prependTo('span#span' + options.prefix + '_' + (parseInt(lid[1]) + 1))
				;
				$(document.createElement('input'))
					.attr('type', 'hidden')
					.attr('name', 'tags_' + options.prefix + '[]')
					.val(temp[i])
					.prependTo('span#span' + options.prefix + '_' + (parseInt(lid[1]) + 1))
				;
				$(document.createElement('input'))
					.attr('type', 'hidden')
					.attr('name', 'slugs_' + options.prefix + '[]')
					.val(t)
					.prependTo('span#span' + options.prefix + '_' + (parseInt(lid[1]) + 1))
				;
		
				$('span#span' + options.prefix + '_' + (parseInt(lid[1]) + 1)).appendTo('#'+options.holder_id);
			}
		});
		
	};
	
	$.fn.removetag = function(options){
		
		var defaults = {};
		
		var options = $.extend(defaults, options);
		
		return this.each(function(){
			if ($('#' + options.id).length > 0){
				$('#' + options.id).remove();
			}				
		});
				
	};
	
	$.isenter = function(options){
		
		var defaults = {};
		
		var options = $.extend(defaults, options);

		var charCode = (options.event.which) ? options.event.which : options.event.keyCode;
    	if (charCode == 13){
        	return true;
    	}		
	};
	
})(jQuery);