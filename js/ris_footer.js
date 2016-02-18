

if(typeof jq !== 'undefined'){
	jq.addEventListener("load", initialize_ris_footer, false);
}
else {
	var jq = document.createElement('script');
	jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js";
	document.querySelector('head').appendChild(jq);
	jq.onload = initialize_ris_footer;
}

function initialize_ris_footer(){
	ris_footer_jQuery = jQuery.noConflict(true);

	var d = new Date();
	var defaultInfo = { 
		"leftBtns" : [
		{ "text":"link1", "url":"#"},
		{ "text":"link2", "url":"#"},
		{ "text":"link3", "url":"#"},
		],
		"rightBtns" : [
		{ "text":"link4", "url":"#"},
		{ "text":"Logout", "url":"#"}
		],
		"copyright" : {
			"name":"UCF ORC",
			"dev":"RIS",
			"email":"risservicedesk&#64;ucf.edu"
		}
	};

	ris_footer_jQuery(function() {

		
		function mergeInformation(){	//Combines the defaultInfo with customInfo
			for (var attr in customInfo) {
				footerInfo[attr] = ris_footer_jQuery.extend(footerInfo[attr], customInfo[attr]);
			}
		}

		function addButtons(buttons){
			var list = "";
			for (b = 0; b < buttons.length; b++){
				list += '<a href="'+buttons[b].url+'">'+ buttons[b].text + '</a>\n';
			}
			return list;
		}

		var footerInfo = defaultInfo;
		if (typeof customInfo !== 'undefined'){
			mergeInformation();	
		}

		var buttons = '<div class="leftBtns">\n'+addButtons(footerInfo.leftBtns)+"</div>" + 
					  '<div class="rightBtns">\n'+addButtons(footerInfo.rightBtns)+"</div>";
		var userInfo;

		var a = document.createElement('link');
		a.setAttribute("href", "styles/styles.css");
		a.setAttribute("rel", "stylesheet");
		a.setAttribute("type", "text/css");
		document.querySelector('head').appendChild(a);

		ris_footer_jQuery("#ris_footer").html(' <div class="footer_wrapper"> ' +
			'<div class="footer_buttons">'+buttons+'</div>' +
			'<div style="clear:both;"></div> '+
			'<div class="loginInfo">USER LOGIN INFO HERE</div>'+
			'<hr>' +
			'<div class="footerCopy">' +
				'<div class="copy_comp">&copy; '+d.getFullYear()+' '+footerInfo.copyright.name+'</div>' +
				'<div class="copy_dev"><strong>Developed by '+footerInfo.copyright.dev+'</strong></div>' +
				'<div class="copy_email">'+
					'<a href="mailto:'+footerInfo.copyright.email+'">'+footerInfo.copyright.email+'</a>'+
				'</div>' +
			'</div>' +
			'</div>');
	})

}



