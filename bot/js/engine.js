var showBotTyping = false;

const userid = 'sam123';

$(document).ready(function() {
	$(".txt-common").focus();

	$(".txt-common").off("keypress").on("keypress", handleTextAreaEvents);
	$(".txt-common").off("keyup").on("keyup", handleTextAreaEvents);

	$("#sendMessage").click(function(){
		handleButtonEvents();
	});

	$("#toggleMenu").click(function(){
		toggleMenu(true);
	});

	$("#hideMenu").click(function(){
		toggleMenu(false);
	});

	$("#showMenu").click(function(){
		addMenuList();
	});	

	$("#clearConversation").click(function(){
		clearConversation();
	});

	$("#messages-list").delegate("#submit_btn", "click", function(){
		sendFeedback();
	});

	$("#flexCheckAll").click(function(){
		var checked = $('#flexCheckAll:checked').val();
		if (checked) {
			$("#flexCheckMaui").prop('checked', true);
			$("#flexCheckKauai").prop('checked', true);
			$("#flexCheckOahu").prop('checked', true);
			$("#flexCheckBigIsland").prop('checked', true);
		}
	});

	$("#submitAnswer").click(function(){
		submitAnswer();
	});
	
	$(".send").prop("disabled", true);
	$(".txt-common").prop("disabled", true); 
})

function handleButtonEvents() {
	var text = $(".txt-common").val();
	$(".txt-common").focus();

	if (text == "") { return; }
	$(".txt-common").val('');

	sendMessage(text);
}

function handleTextAreaEvents(e) {
	changeSendButtonColor();
	var text = $(".txt-common");
	13 == e.keyCode && text.val().trim() && !1 === e.ctrlKey && !1 === e.shiftKey && !1 === e.metaKey && (sendMessage(text.val().trim()), '', text.val(""), e.preventDefault());
	var n = text.val();
	if (38 === e.keyCode && !n) {
		if (!(n = getMyLastTextMessageContent())) return;
		text.val(n), setTimeout(function () {
			text.selectionStart = text.selectionEnd = n.length
		}.bind(this), 100)
	}
}

function changeSendButtonColor() {
	$(".txt-common").val().trim() ? $(".send").addClass("enabled") : $(".send").removeClass("enabled")
}

//const url = 'http://localhost';
// const url = 'https://chatbotapi.revupcommercellc.com';
const url = 'https://wsb.goextmx.com';

function doAddHistory(msg, owner)
{
	fetch(url + "/api/message", {
		method: 'POST', 
		mode: 'cors', 
		cache: 'no-cache',
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json',
			'Accept' : '*/*',
			'Accept-Encoding' : 'gzip, deflate, br',
			'Connection' : 'keep-alive'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({ userid: userid, message: msg, owner: owner }) 
		})
		.then(response => response.json())
		.then(response => {

		})
		.catch(error => { console.log('Error:', error);
	
		});
}

function sendMessage(inputText) {
	var text = addClientMessage(inputText);

	scrollBottom();
	doAddHistory(inputText, 'USER');

	fetch(url + "/api/think", {
		method: 'POST', 
		mode: 'cors', 
		cache: 'no-cache',
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json',
			'Accept' : '*/*',
			'Accept-Encoding' : 'gzip, deflate, br',
			'Connection' : 'keep-alive'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({ userid: userid, message: inputText }) 
	  })
	  .then(response => response.json())
	  .then(response => {
		addBotMessage(response.data);
		doAddHistory(response.data, 'BOT');
		$(".send").prop("disabled", false);
		$(".txt-common").prop("disabled", false); 
	  })
	  .catch(error => { console.log('Error:', error);
		console.log("error:::::::::");
		showConnectError();

		$(".send").prop("disabled", false);
		$(".txt-common").prop("disabled", false); 
	 });
	  
	// $.ajax({
	// 	url: url + "/api/think",
	// 	type: "POST",
	// 	data: { userid: userid, message: inputText },
	// 	dataType: "json",
	// 	headers:{
	// 		'Content-Type':'application/json',
	// 		'Accept': 'application/json',
	// 	},
	// 	success: function(e) {
	// 		addBotMessage(e.data);

	// 		doAddHistory(e.data, 'BOT');
	// 		$(".send").prop("disabled", false);
	// 		$(".txt-common").prop("disabled", false); 
	// 	},
	// 	error: function(jqXHR, textStatus, errorThrown) {
	// 		console.log("error:::::::::");
	// 		showConnectError();
	
	// 		$(".send").prop("disabled", false);
	// 		$(".txt-common").prop("disabled", false); 
	// 	}
	//   });

	  
	// $.ajax({
	// 	url: "https://chatbotapi.revupcommercellc.com/api/think",
	// 	data: { userid: userid, message: inputText },
	// 	dataType: 'json',
	//   	method: "POST",
	//   }).done(function(e) {
	// 	addBotMessage(e.data);

	// 	doAddHistory(e.data, 'BOT');
	// 	$(".send").prop("disabled", false);
	// 	$(".txt-common").prop("disabled", false); 

	//   }).fail(function() {
	// 	console.log("error:::::::::");
	// 	showConnectError();

	// 	$(".send").prop("disabled", false);
	// 	$(".txt-common").prop("disabled", false); 
	//   });
}

function showConnectError() {
	$("#snackbar").css("visibility", "visible");
	
	setTimeout(function () {
		$("#snackbar").css("visibility", "hidden");
	}, 5000);
}

function showInvalidSubmit() {
	$("#snackbar_invalid").css("visibility", "visible");
	
	setTimeout(function () {
		$("#snackbar_invalid").css("visibility", "hidden");
	}, 5000);
}

function addClientMessage(text) {
	var str = '<div class="conversation-item clearfix mine clientText" tabindex="-1" aria-label="" role="group">\
			<div class="media">\
		    <div class="media-pic" data-initial="M">\
          <span class="profile-pic" aria-hidden="true">\
          	<img draggable="false" alt="Chat bot avatar" data-id="39"></span>\
      	    </div>\
  	        <div class="media-body">\
              <header class="messages__media__header">\
								<h1 class="name" id="name-59624e4a-8daa-447d-a15f-63d252e3642b">Me</h1>\
							  <div class="insight-toggle" title="Message Insight" data-message-uuid="undefined"></div>\
							</header>\
			        <div class="message-wrap">\
                <p class="desc text-content ">'+ text +'</p>\
                <div class="time-stamp">\
                	<div class="ack-wrapper">\
                		<div class="message-failed">!</div>\
                		<i class="svg-icon check-icon sent"></i>\
                	</div>\
                	<div class="date" aria-hidden="true"> pm</div>\
                	<div class="spinner small hidden">\
            	    <div class="bounce1"></div>\
        	        <div class="bounce2"></div>\
    	            <div class="bounce3"></div>\
  	            </div>\
          	</div>\
        	</div>\
      	</div>\
    	</div>\
  	</div>';

	var o = document.createElement("div");
	o.innerHTML = str;

  var r = o.firstChild;
	$(r).appendTo($("#messages-list"));

	showBotType();
}

function addBotMessage(text) {
	removeBotTyping();

	$(".send").prop("disabled", false);
	$(".txt-common").prop("disabled", false); 
	$(".txt-common").focus();

	var str = '<div class="conversation-item clearfix not-mine botText" request-message-id="3c819e09-a192-490f-88d6-dbfdd2d45844" tabindex="-1" aria-label="Bot sent, Text.Absolutely delightful!" role="group">\
    <div class="media">\
	    <div class="media-pic" data-initial="">\
        <span class="profile-pic" aria-hidden="true">\
        	<img draggable="false" alt="Chat bot avatar" src="./img/avatar_head.png">\
      	</span>\
      </div>\
      <div class="media-body">\
        <header class="messages__media__header">\
			<h1 class="name" id="name-59624e4a-8daa-447d-a15f-63d252e3642b">MyChat</h1>\
			<div class="insight-toggle" title="Message Insight" data-message-uuid="3c819e09-a192-490f-88d6-dbfdd2d45844"></div>\
        </header>\
        <div class="message-wrap">\
           <p class="desc text-content ">'+ text +'</p>\
           <div class="time-stamp">\
              <div class="ack-wrapper">\
                 <div class="message-failed hidden">!</div>\
              </div>\
              <div class="date" aria-hidden="true">00:50 am</div>\
              <div class="spinner small hidden">\
                 <div class="bounce1"></div>\
                 <div class="bounce2"></div>\
                 <div class="bounce3"></div>\
              </div>\
           </div>\
        </div>\
      </div>\
  	</div>\
	</div>';

	var o = document.createElement("div");
	o.innerHTML = str;

  var r = o.firstChild;
	$(r).appendTo($("#messages-list"));

	scrollBottom();
}

function showBotType(e) {
	$(".send").prop("disabled", true);
	$(".txt-common").prop("disabled", true); 

	if (!showBotTyping) {	
		var lastMessage = getLastMessage();
		var n = !isLastMessageInSequence();
		
		var o = document.createElement("div");
		o.innerHTML = '<div class="conversation-item not-mine" id="bot-typing">\
        <div class="media bot-typing">\
            <div class="media-pic" data-initial="">\
            	<a class="profile-pic" tabindex="-1" href="javascript:void(0);" aria-hidden="true">\
            		<img draggable="false" alt="Chat bot avatar" src="./img/avatar_head.png">\
          		</a>\
        		</div>\
            <div class="media-body">\
                <div class="message-wrap">\
                    <div class="desc flexColumn">\
                        <div class="la-ball-pulse la-sm">\
                            <div></div>\
                            <div></div>\
                            <div></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';
	   
    var r = o.firstChild;
    showBotTyping = true;
		$(r).appendTo($("#messages-list")), showBotTyping && clearTimeout(showBotTyping), showBotTyping = setTimeout(function () {
			removeBotTyping();
		}, 5000)
	} else {
		removeBotTyping();
	}

	scrollBottom();
}

function scrollBottom() {
	$("#message-list-region").scrollTop($("#message-list-region")[0].scrollHeight);
}

function removeBotTyping() {

	var e = document.getElementById("bot-typing");
	if (e) try {
		e.remove();

		showBotTyping = false;
	} catch (t) {
		e.parentNode.removeChild(e);
	}
}

function getLastMessage() {
	var e = $("#messages-list .conversation-item:not(#bot-typing)");
	return e[e.length - 1];
}

function isLastMessageInSequence() {
	var e = getLastMessage(),
		t = !1;
	e && e.message && e.message.sequence && (e.message.sequence.split("/")[0] != e.message.sequence.split("/")[1] && (t = !0));
	return !t;
}

function toggleMenu(state) {
	if (state == true) {
		$("#bot-menu-container").removeClass('hidden');
		$(".compose-message-fields").hide();
	} else {
		$("#bot-menu-container").addClass('hidden');
		$(".compose-message-fields").show();
	}
}

function clearConversation() {
	$("#messages-list").html('');
}

function addMenuList() {
	var menu = '<div class="conversation-item clearfix not-mine" id="message-first" request-message-id="fa80d49a-c7cd-40b5-8958-3014580c4305" tabindex="-1" aria-label="Bot sent, Card., Overall, how would you rate your interaction with me today?, actions available. Use tab to navigate through the items., " role="group" >\
                <div class="media">\
									<div class="media-pic" data-initial="">\
										<span class="profile-pic" aria-hidden="true">\
											<img draggable="false" alt="Chat bot avatar" src="./img/avatar_head.png">\
										</span>\
									</div>\
									<div class="media-body">\
										<header class="messages__media__header">\
											<h1 class="name" id="name-59624e4a-8daa-447d-a15f-63d252e3642b">Iris</h1>\
											<div class="insight-toggle" title="Message Insight" data-message-uuid="fa80d49a-c7cd-40b5-8958-3014580c4305"></div>\
										</header>\
										<div class="message-wrap attachment-message">\
											<div class="desc attachment-container flexColumn">\
												<div id="msg-42bf9ffa-e5c3-45c9-ba85-c004132a9f2b">\
													<div class="default_card attachments">\
														<div class="default_card_description">Overall, how would you rate your interaction with me today?</div>\
															<div class="default_card_input">\
																<div style="opacity: 0; transform: none;" class="error-tip"></div>\
																	<div class="composer">\
																		<div class="composer__container__preview__container">\
																			<div class="composer__container__preview__container__question locale-trans" data-ele-name="Rating" id="question-c4d03092-a619-4ec1-8eed-5710d4b87f6d_rating">\
																				Rating\
																			</div>\
																			<div class="custom-select">\
																				<input type="text" placeholder="Select an option" id="feedback_type" val="">\
																				<ul>\
																				<li value="0"></li>\
																				<li value="1">Excellent</li>\
																				<li value="2">Good</li>\
																				<li value="3">Average</li>\
																				<li value="4">Fair</li>\
																				<li value="5">Poor</li>\
																				</ul>\
																			</div>\
																		</div>\
																	</div>\
																</div>\
																<div class="composer">\
																	<div class="composer__container__preview__container">\
																		<div class="composer__container__preview__container__question locale-trans" data-ele-name="Can you briefly provide a reason for this rating?" id="question-c4d03092-a619-4ec1-8eed-5710d4b87f6d_reason">\
																			Can you briefly provide a reason for this rating?\
																		</div>\
																		<div class="composer__container__preview__container__options" id="options-c4d03092-a619-4ec1-8eed-5710d4b87f6d_reason">\
																			<textarea class="textbox avm_accessible_txt_box_helper" aria-label="Can you briefly provide a reason for this rating?" placeholder="" value="" id="feedback_contents"></textarea>\
																		</div>\
																	</div>\
																</div>\
																<button type="button" class="btnex default_card_submit" role="button" aria-label="Submit" id="submit_btn">Submit</button>\
															</div>\
														</div>\
													</div>\
												</div>\
												<div class="time-stamp">\
													<div class="ack-wrapper">\
														<div class="message-failed hidden">!</div>\
													</div>\
													<div class="date" aria-hidden="true"></div>\
													<div class="spinner small hidden">\
														<div class="bounce1"></div>\
														<div class="bounce2"></div>\
														<div class="bounce3"></div>\
													</div>\
												</div>\
											</div>\
										</div>\
									</div>\
								</div>';

	var element = document.createElement("div");
	element.innerHTML = (menu);

	$("#message-first").remove();

  var r = element.firstChild;
	$(r).appendTo($("#messages-list"));

	var customSelect = document.querySelector('.custom-select');
	var input = customSelect.querySelector('input');
	var list = customSelect.querySelector('ul');
	var options = customSelect.querySelectorAll('li');

	input.addEventListener('click', function() {
	  list.style.display = (list.style.display == 'block') ? 'none' : 'block';
	});

	input.addEventListener('keypress', function(e) {
		e.preventDefault();
	  list.style.display = (list.style.display == 'block') ? 'none' : 'block';
	});	

	options.forEach(function(option) {
	  option.addEventListener('click', function() {
	    input.value = option.innerHTML;
		$(input).attr('val', option.value);
	    list.style.display = 'none';
	  });
	});

	scrollBottom();
}

function sendFeedback() {
	var feedback_type = $("#feedback_type").attr("val");

	if (feedback_type === "") {
		$("#feedback_type").focus();
		return;
	}

	var feedback_content = $("#feedback_contents").val();

	if (feedback_content == '') {
		$("#feedback_contents").focus();
		return;
	}

	fetch(url + "/api/gauge", {
		method: 'POST', 
		mode: 'cors', 
		cache: 'no-cache',
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json',
			'Accept' : '*/*',
			'Accept-Encoding' : 'gzip, deflate, br',
			'Connection' : 'keep-alive'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({ userid: userid, feedback: parseInt(feedback_type), note : feedback_content }) 
		})
		.then(response => response.json())
		.then(response => {
			addBotMessage("Thank you for your feedback.");
		})
		.catch(error => { console.log('Error:', error);
			showConnectError();
		});
}

function submitAnswer() {

	var val1 = $('#flexCheckMaui:checked').val();
	var val2 = $('#flexCheckKauai:checked').val();
	var val3 = $('#flexCheckOahu:checked').val();
	var val4 = $('#flexCheckBigIsland:checked').val();
	
	var feedback_content = $("#feedback_contents").val();

	if (!val1 && !val2 && !val3 && !val4) {
		showInvalidSubmit();
		return;
	}

	showBotType();
	
	setTimeout(function () {
		fetch(url + "/api/think/welcome", {
			method: 'POST', 
			mode: 'cors', 
			cache: 'no-cache',
			credentials: 'same-origin', 
			headers: {
				'Content-Type': 'application/json',
				'Accept' : '*/*',
				'Accept-Encoding' : 'gzip, deflate, br',
				'Connection' : 'keep-alive'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify({ userid: userid, val1, val2, val3, val4 }) 
		  })
		  .then(response => response.json())
		  .then(response => {
			addBotMessage(response.data);
			doAddHistory(response.data, 'BOT');
			$(".send").prop("disabled", false);
			$(".txt-common").prop("disabled", false); 
			$('#answerPanel').find(':input').prop('disabled', true);
			$('#submitAnswer').prop('disabled', true);
		  })
		  .catch(error => { console.log('Error:', error);
			console.log("error:::::::::");
			showConnectError();
	
			$(".send").prop("disabled", false);
			$(".txt-common").prop("disabled", false); 
		 });
	}, 1000);
	
}
