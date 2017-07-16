/******************************************************************************
 *
 *    NAME: XBLOG
 * VERSION: 0.2.0
 *  AUTHOR: Stefano Viola (estebanSannin)
 *
 ******************************************************************************/

var pathname = window.location.pathname; // Returns path only
var url      = window.location.href;     // Returns full URL

console.log("[xblog]: pathname = "+pathname);
console.log("[xblog]: url = "+url);



//Set
//localStorage.setItem("lastname", "Smith");
//
////Get
//var lastName = localStorage.getItem("lastname");
//console.log("lastname saved: " + lastName);

$( document ).ajaxStart(function() {
	console.log( "Triggered ajaxStart handler." );
	$('.loader').css("visibility","visible");
	//$('body').hide();
	$('body').css('visibility', 'hidden');
});
$(document).ready(function(e){
	// System

	$.ajax({ type: "GET", url: "resources/system.xml", dataType: "xml",
		success: function(xml) {
			$(xml).find('xblog').each(function() {
				var siteName = $(this).find('siteName').text();
				var theme = $(this).find('theme').text();
				var subTitle = $(this).find('subTitle').text();
				var homepage_content = $(this).find('homepage').text();
				var github_link = $(this).find('github').text();
				var linkedin_link = $(this).find('linkedin').text();
				var twitter_link = $(this).find('twitter').text();

				$("#theme").attr("href", "themes/" + theme + ".css");
				$("#social-github").attr("href", github_link);
				$("#social-linkedin").attr("href", linkedin_link);
				$("#social-twitter").attr("href", twitter_link);

				$(siteName).html('#header');
				$('#header').html(siteName);
				showdown.parseImgDimension=true;
				var converter = new showdown.Converter(),
					text      = homepage_content,
					html      = converter.makeHtml(text);
				$("#textblog").html(html)
				$('pre code').each(function(i, block) {
					hljs.highlightBlock(block);
				});
				$(subTitle).appendTo('#subtitle');
			});
		},
		error: function() { alert("XBlog: Error generating system attributes!"); }
	});


	//loading_menu();
	xblog.menuLoad();
	xblog.blogLoad();
	console.log("[xblog]: LAST LINE document.ready");
});

var xblog = {
	menuLoad: function() {
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
	},

	blogLoad: function() {
		$("<h3>Blog Post:</h3>").appendTo('#postBlog');
		$('#postBlogOld').hide();
		var i = 0;
		$.ajax({ type: "GET", url: "resources/post.xml", dataType: "xml",
			success: function(xml) {
				$(xml).find('post').each(function() {
					var linkID = 'link'+i;
					var postID = 'post'+i;
					var data = $(this).find('date').text();
					var title = $(this).find('title').text();
					var author = $(this).find('author').text();
					var content_post = $(this).find('content').text();
					var markup = $(this).find('markup').text();

					var twitter_button = "<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-via=\"estebansannin\">Tweet</a> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>"

					if(markup == "MARKDOWN") {
						var converter = new showdown.Converter(),
							text      = content_post,
							html      = converter.makeHtml(text);
					} else {
						html = content_post;
					}
					var link_markup = '<li>'+data+
						' <a href="#'+linkID+'" id="'+linkID+'">'+title+
						'</a></li>';
					var other='<br><div class="comment2" id="'+postID+
						'"><center><h2>'+title+'</h2>writed: '+data+' - Author: '+author+'</center><br>'+html+
					'</div>'+twitter_button+'<br><br>';
					if(i>25) {
						console.log("More of 25");
						$('#postBlogOld').append(link_markup);
					} else {
						// Writing item post in list
						$('#postBlog').append(link_markup);
					}
					if(i == 25) {
						$('#postBlog').append("<br><a href='#' id='old'>- Old Posts -</a><br>")
					}
					if(url.indexOf("#"+linkID) !== -1) {
						console.log("[xblog-post]: LOAD CONTENT: "+linkID);
						$('#textblog').hide()
						$('#textblog').html(other);
						$('#textblog').fadeIn(1500);
						$('pre code').each(function(i, block) {
							hljs.highlightBlock(block);
						});
					}
					$('a#'+linkID).click(function(){
						console.log("CLICKED: "+linkID);
						$('#textblog').hide()
						$('#textblog').html(other);
						$('#textblog').fadeIn(1500);
						$('pre code').each(function(i, block) {
							hljs.highlightBlock(block);
						});
						$('#textblog').fadeIn(1000);
					});
					i++;
				});

				$('#old').click(function(){
					$('#postBlogOld').slideToggle('fast');
				});
			},
			error: function() { alert("XBlog: Error generating post blog!"); }
		});
	}
}
var everythingLoaded = setInterval(function() {
	if (/loaded|complete/.test(document.readyState)) {
		clearInterval(everythingLoaded);
		// this is the function that gets called when everything is loaded
		console.log("ALL LOADED");
		$('body').css('visibility', 'visible').hide().fadeIn(1500);
		$('.loader').css("visibility","hidden");
	}
}, 10);
