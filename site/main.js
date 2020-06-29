$("#nojs").css("display", "none");
$("#jsonly").css("display", "block");

if( $('#mobileindicator').css('display')=='none') {
  $("#nojs").css("display", "block");
  $("#jsonly").css("display", "none");
}

const allowedChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "]
const promptText = "{progpilot ~}$ ";
const functions = ["nc", "help", "about", "ctftime", "writeups", "clear", "contact"];

$("html").on("keyup", function (e) {
  
  e.preventDefault();

  if (e.which == 8) { // backspace
    
    $("#userinput").text(function(_, t) {
      return t.slice(0, -1);
    });

  } else if (e.which == 13) {  // enter
    
    const nText = $("#userinput").text().trim().split(" ")[0];
    $("#userinput").text("");

    processCommand(nText);
    scrollToBottom();
    
  } else {
    
    $("#userinput").text(function(_, t) {
      const char = String.fromCharCode(e.which).toLowerCase();
      if (jQuery.inArray(char, allowedChars) !== -1) {
        return t + char;
      }
    }); 

  }

});

function scrollToBottom() {
  $("#scrollanchor")[0].scrollIntoView(false);
}

function processCommand(command) {

  if (command == ""){  // blank, no command
    
    $("#content").html(function(_, t) {
      return t + "\n" + promptText;
    });

  } else if (command == "clear") {
    
    $("#content").html(promptText);

  } else {
    let commandOutput;
    
    if (command == "ls") {
      commandOutput = "ls: command not found\n\nDid you mean:\n  command 'ls' from deb ls"
    } else if (jQuery.inArray(command, functions) === -1) {  // invalid function entered
      commandOutput = command + ": command not found";
    } else {
      commandOutput = commandTexts[command]
    }

    $("#content").html(function(_, t) {
      return t + command + "\n" + commandOutput + "\n" + (command == "ctftime" || command == "writeups"?"":promptText);
    });

  }

}