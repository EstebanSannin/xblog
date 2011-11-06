$(document).ready(function(){
	$.ajax({ type: "GET", url: "resources/page.xml", dataType: "xml",

		success: function(xml) {

		$(xml).find('page').each(function() {
			var tag = $(this).find('tag').text();
			var content = $(this).find('content').text();

			if (tag == "#dronix"){
			$('a#dronix').click(function(){
				$('#content').hide();
				$('#content').html(content);
				$('#content').fadeIn(1500);

				});
			}

			if (tag == "#aboutme"){
			$('a#aboutme').click(function(){
				$('#content').hide();
				$('#content').html(content);
				$('#content').fadeIn(1500);
				});
			}
		});
		},
		error: function() { alert("error"); }
	
	});
});

