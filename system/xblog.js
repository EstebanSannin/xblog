/******************************************************************************
 *
 *    NAME: XBLOG
 * VERSION: 0.2.0
 *  AUTHOR: Stefano Viola (estebanSannin)
 *
 ******************************************************************************/

$(document).ready(function(){

	// System
	
	$.ajax({ type: "GET", url: "resources/system.xml", dataType: "xml",

	success: function(xml) {
		$(xml).find('xblog').each(function() {
			var siteName = $(this).find('siteName').text();
			var theme = $(this).find('theme').text();
			var subTitle = $(this).find('subTitle').text();
			var homepage_content = $(this).find('homepage').text();
			$("#theme").attr("href", "themes/" + theme + ".css");
			$(siteName).appendTo('#header');
			showdown.parseImgDimension=true;
			var converter = new showdown.Converter(),
				text      = homepage_content,
				html      = converter.makeHtml(text);
			console.log("Home page content: "+homepage_content);
			$("#textblog").html(html)
			$(subTitle).appendTo('#subtitle');
		});
	},
	error: function() { alert("XBlog: Error generating system attributes!"); }
	});

	// Home page content

			// Post Blog

	$("<h3>Blog Post:</h3>").appendTo('#postBlog');
	var i = 0;
	$.ajax({ type: "GET", url: "resources/post.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('post').each(function() {
		console.log("EXECUTE post");
		var linkID = 'link'+i;
		var postID = 'post'+i;
		var data = $(this).find('date').text();
		var title = $(this).find('title').text();
		var author = $(this).find('author').text();
		var content_post = $(this).find('content').text();
		var markup = $(this).find('markup').text();
		if(markup == "MARKDOWN") {
			console.log("[xblog.js]: Converting from MARKDOWN to HTML");
			var converter = new showdown.Converter(),
				text      = content_post,
				html      = converter.makeHtml(text);
		} else {
			console.log("[xblog.js]: Markup: HTML");
			html = content_post;
		}
		var link_markup = '<li>'+data+
			' <a href="#'+linkID+'" id="'+linkID+'">'+title+
			'</a></li>';
		var altro='<br><div class="comment2" id="'+postID+
			'"><center><h2>'+title+'</h2>writed: '+data+' - Author: '+author+'</center><br>'+html+
			'</div>';
		$('#postBlog').append(link_markup);
		$('#'+postID).hide();
	
		$('a#'+linkID).click(function(){
			console.log("CLICKED: "+linkID);
			$('#textblog').html(altro);
			$('pre code').each(function(i, block) {
				console.log("highlight");
				hljs.highlightBlock(block);
			});
			$('#'+postID).slideDown('fast');
	})
	$('a#close'+i).click(function(){
	  $('#'+postID).slideUp('fast');
		$('#disq'+linkID).empty();
	});
	i++;
	});
	},
	error: function() { alert("XBlog: Error generating post blog!"); }
	});

// Menu management

	$.ajax({ type: "GET", url: "resources/menu.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('menu').each(function() {
		var menuID = $(this).find('id').text();
		var titolo = $(this).find('title').text();
		var url = $(this).find('url').text();
		var link_markup = '<td class="headitem"><a href="'+url+'" class="menu" id="'+menuID+'">'+titolo+'</a></td>';

		$(link_markup).appendTo('#menuBar');
	});    
	},
	error: function() { alert("XBlox: Error generating menu"); }
	});

});

