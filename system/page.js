/*******************************************************************************
 *
 *    NAME: XBLOG
 *    FILE: page.js
 * VERSION: 0.2.0
 *  AUTHOR: Stefano Viola (estebanSannin)
 *
 *******************************************************************************/

var pathname = window.location.pathname; // Returns path only
var url      = window.location.href;     // Returns full URL

$(document).ready(function(){
	$.ajax({type: "GET", url: "resources/page.xml", dataType: "xml",
		success: function(xml) {
			$(xml).find('page').each(function() {
			var tag = $(this).find('tag').text();
			var title = $(this).find('title').text();
			var markup = $(this).find('markup').text();
			var content = $(this).find('content').text();

			// Load content of page linked
			if(url.indexOf("#"+tag) !== -1) {
				console.log("[page]: LOAD CONTENT: "+tag);
				$('#wrapper').hide();
				$('#wrapper').html("<h1>"+title+"</h1>");
				if(markup == "MARKDOWN") {
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
			}

			$('a#'+tag).click(function(){
					$('#wrapper').hide();
					$('#wrapper').html("<h1>"+title+"</h1>");
					if(markup == "MARKDOWN") {
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
		}).done(function() {
			//$("body").fadeIn(1500);
			//$('body').css('visibility', 'visible');
			//$(this).delay(2000);
			//$('.loader').css("visibility","hidden");
			console.log("[page]: ajax done");
		});
	console.log("[page]: LAST LINE document.ready");
});

