$("#widget-contact-form").on("submit", function (event) {
     console.log( $("#widget-contact-form").serialize() );
	if (event.isDefaultPrevented()) {
	    console.log('trolololo');
		submitMSG(false, function () {
			$("#contact-form-result").html('<a href="#" class="close" data-dismiss="alert">&times;</a> Please, fill the empty required fields.');
		});


	} else {
	    console.log('dammn');
		// everything looks good!
		event.preventDefault();
		submitForm();
	}
});

function getBaseUrl() {
    var re = new RegExp(/^.*\//);
    return re.exec(window.location.href);
}

function submitForm() {
	// Initiate Variables With Form Content
	var name = $("#name").val();
	var email = $("#email").val();
	var subject = 'contact from inspirilab website';//$("#subject").val();
	var message = $("#message").val();
	console.log(message);

	$.ajax({
		type: "POST",
		url: getBaseUrl() + "include/contact-form.php",
		data: "widget-contact-form-name=" + name + "&widget-contact-form-email=" + email + "&widget-contact-form-subject=" + subject + "&widget-contact-form-message=" + message,
		success: function (text) {
		    console.log('success');
		    console.log(text);
			if (text == "success") {
				formSuccess();
			} else {
				submitMSG(false, text);
			}
			$('#response-ok-the-form').show();
			$('#response-ok-the-form').fadeOut(5000);
			$('#response-error-the-form').hide();
			$("#name").html("");
			$("#email").html("");
			$("#message").html("");
		},
		error: function(data){
		    console.log('error');
		    console.log(data);
		    $('#response-error-the-form').show();
		    $('#response-ok-the-form').hide();
		}
		
	});
}

function formSuccess() {
	$("#contactForm")[0].reset();
	submitMSG(true, function () {

		$("#contact-form-result").html('<a href="#" class="close" data-dismiss="alert">&times;</a> We have <strong>successfully</strong> received your Message and will get Back to you as soon as possible.')

	});
}

function submitMSG(valid, msg) {
	if (valid) {
		var msgClasses = "alert alert-success";
	} else {
		var msgClasses = "alert alert-danger";
	}
	$("#contact-form-result").removeClass().addClass(msgClasses).text(msg);
}
