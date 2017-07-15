/*******************************************************************************
 *
 *    NAME: XBLOG
 *    FILE: page.js
 * VERSION: 0.2.0
 *  AUTHOR: Stefano Viola (estebanSannin)
 *
 *******************************************************************************/

$(document).ready(function(){

	$.ajax({type: "GET", url: "resources/page.xml", dataType: "xml",
	
	success: function(xml) {
		$(xml).find('page').each(function() {
		var tag = $(this).find('tag').text();
		var title = $(this).find('title').text();
		var markup = $(this).find('markup').text();
		var content = $(this).find('content').text();

		console.log("TAG FROM PAGE: "+tag);
		console.log("Markup: " + markup);
		$('a#'+tag).click(function(){
			console.log("CLICKED: "+tag+" Markup: "+markup);
				$('#wrapper').hide();
				$('#wrapper').html("<h1>"+title+"</h1>");
				if(markup == "MARKDOWN") {
					console.log("Converting from MARKDOWN to HTML");
					var converter = new showdown.Converter(),
						text      = content,
						html      = converter.makeHtml(text);
				} else {
					html = content;
				}
				$('#wrapper').append(html);
				$('pre code').each(function(i, block) {
					hljs.highlightBlock(block);
				});
				$('#wrapper').fadeIn(1000);
			});
		});
	},
	error: function() { alert("PAGE Generetor: ERROR!"); }
	});
});

