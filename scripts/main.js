window.onload = function () {

    // To deal with google forms we need to echo to other fields otherwise it won't go through
    var nameInput = document.getElementById('name-input');
    var nameInputEcho = document.getElementById('name-input-echo');
    nameInput.oninput = function(input){
        nameInputEcho.value = nameInput.value;
    };
    nameInput.onpropertychange = nameInput.oninput; // for IE8
    // e.onchange = e.oninput; // FF needs this in <select><option>...

    var emailInput = document.getElementById('email-input');
    var emailInputEcho = document.getElementById('email-input-echo');
    emailInput.oninput = function(input){
        emailInputEcho.value = emailInput.value;
    };
    emailInput.onpropertychange = emailInput.oninput; // for IE8

    var messageInput = document.getElementById('message-input');
    var messageInputEcho = document.getElementById('message-input-echo');
    messageInput.oninput = function(input){
        messageInputEcho.value = messageInput.value;
    };
    messageInput.onpropertychange = messageInput.oninput; // for IE8
};

// Function to switch out the contact from for a "Submitted" message
hideForm = function () {
    // hide the form
    var contactForm = document.getElementById('contact-form');
    contactForm.className = "hidden";

    // Show the Submitted message
    var contactForm = document.getElementById('contact-form-submission');
    contactForm.className = "";
}