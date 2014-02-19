
function jqconsole(){

  $(function() {
        // Creating the console.
        var header = 'Press CTRL+R to run \n'
        window.jqconsole = $('#console').jqconsole(header, '> ');

        // Abort prompt on Ctrl+Z and Ctrl+C.
        jqconsole.RegisterShortcut('Z', function() {
          jqconsole.AbortPrompt();
          handler();
        });
         jqconsole.RegisterShortcut('C', function() {
          jqconsole.AbortPrompt();
          handler();
        });
        // Move to line start Ctrl+A.
        jqconsole.RegisterShortcut('A', function() {
          jqconsole.MoveToStart();
          handler();
        });
        // Move to line end Ctrl+E.
        jqconsole.RegisterShortcut('E', function() {
          jqconsole.MoveToEnd();
          handler();
        });
        jqconsole.RegisterMatching('{', '}', 'brace');
        jqconsole.RegisterMatching('(', ')', 'paran');
        jqconsole.RegisterMatching('[', ']', 'bracket');
        // Handle a command.
        var handler = function(command) {
          if (command) {
            try {
              jqconsole.Write('==> ' + window.eval(command) + '\n');
            } catch (e) {
              jqconsole.Write('ERROR: ' + e.message + '\n', 'jqconsole-error');
            }
          }
          jqconsole.Prompt(true, handler, function(command) {
            // Continue line if can't compile the command.
            try {
              Function(command);
            } catch (e) {
              if (/[\[\{\(]$/.test(command)) {
                return 1;
              } else {
                return 0;
              }
            }
            return false;
          });
        };

        // Initiate the first prompt.
        handler();
      });
}
//external variables for writing out the output
var cons = {
   log: function (msg) {
     jqconsole.Write(msg + "\n");
   }
};
var evaluator = new Evaluator(cons)


//resize the console window
  function resize() {
      $(".firepad").height($(window).height() - 10);
    } 