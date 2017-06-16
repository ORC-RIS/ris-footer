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
		{ "text":"link5", "url":"#"},
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
				if (attr.indexOf("Btns") != -1) {
					footerInfo[attr] = customInfo[attr];
				}
				else
					footerInfo[attr] = ris_footer_jQuery.extend(footerInfo[attr], customInfo[attr]);
			}
		}
		function addButtons(buttons){
			var list = "";
			for (b = 0; b < buttons.length; b++){
				list += '<a href="'+buttons[b].url+'"><strong>'+ buttons[b].text + '</strong></a>\n';
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
		if (footerInfo.loginInfo != null){
			userInfo =  "<div class='loginInfo'>"+
				"User: <span id='username'>"+footerInfo.loginInfo.fName+", "+footerInfo.loginInfo.lName+"</span> "+
				"Role: <span id='role'>"+footerInfo.loginInfo.role+"</span> " +
				"Logged in from: <span id='IP'>"+footerInfo.loginInfo.IPaddress+"</span>"+
				"</div>";
		}else{
			userInfo ="";
		}


		var a = document.createElement('link');	
		a.setAttribute("href", "styles/styles.css");		// Creates link to CSS file, href attribute
		a.setAttribute("rel", "stylesheet");				// may need to be changed accordingly!
		a.setAttribute("type", "text/css");
		document.querySelector('head').appendChild(a);

		ris_footer_jQuery("#ris_footer").html(' <div class="footer_wrapper"> ' +
			'<div class="footer_buttons">'+buttons+'</div>' +
			'<div style="clear:both;"></div> '+userInfo+'<hr>' +
			'<div class="footerCopy">' +
				'<img src="images/ldg_ucflogo.png" style="margin-bottom: 5px;"/>' +
				'<div class="copy_comp">&copy; '+d.getFullYear()+' '+footerInfo.copyright.name+'</div>' +
				'<div class="copy_dev"><strong>Developed by '+footerInfo.copyright.dev+'</strong></div>' +
				'<div class="copy_email">'+
					'<a href="mailto:'+footerInfo.copyright.email+'">'+footerInfo.copyright.email+'</a>'+
				'</div>' +
			'</div>' +
			'</div>'
		);

	})

}

