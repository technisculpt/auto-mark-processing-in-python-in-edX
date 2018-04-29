var dCode = "def setup():\n\tbackground(0)\n\ttext(\"hello world\",20,50)\n";

var state = {
  default: '',
  selectedChoice: ''
},
channel;

var editor1= CodeMirror.fromTextArea(document.getElementById('example1_code'), {
  autofocus: true,
  theme: "solarized dark",
  lineNumbers: true,
  textWrapping: false,
  indentUnit: 4,
  fontSize: "12pt",
  autoMatchParens: true,
  parserConfig: {'pythonVersion': 2, 'strictErrors': true},
});
editors = {}
editors['example1_code'] = editor1;
editor1.setSize(500, 100);
    

function revert() {
  editor1.getDoc().setValue(dCode);
}

function outf(text) {
  var mypre = document.getElementById(Sk.pre);
  mypre.innerHTML = mypre.innerHTML + text;
}

 function builtinRead(x){
  if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
  throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

function gradeIncoming(inc){
  var i;
  var j=0;
  var s = [];
  // split incoming code into lines & iterate through them
  var lines =  inc.split("\n");
  for (i = 0; i < lines.length; i++) {
    // check if the text function has been called, do checks.
    var test = lines[i].search("text");
    if (test != -1){
      var test1 = lines[i].split("\"");
      //for (j = test; j < lines[i].length-; j++) {
      //s[j-test] = lines[i][j+6];
      if ((test1[1] == "i'm a coder") || (test1[1] == "I'm a coder") || (test1[1] == "i'm a coder!") || (test1[1] == "I'm a coder!") || (test1[1] == "i'm a coder.") || (test1[1] == "I'm a coder.")){
        state.selectedChoice = "correct";
      }
    }
  }
}

    
function runit(myDiv) {
  document.getElementById("error").innerHTML = "";
  var incoming = editors[myDiv+'_code'].getValue();
  var prog = "from processing import*\n" + editors[myDiv+'_code'].getValue()+"\nrun()\n";
  state.default = incoming;  //to stores students answer on EDX
  var mypre = document.getElementById(myDiv+"_pre");
  mypre.innerHTML = '';
  Sk.canvas = myDiv+"_canvas";
  var can = document.getElementById(Sk.canvas);
  can.style.display = 'block';
  if (can) {
    can.width = can.width;
    if (Sk.tg) {
      Sk.tg.canvasInit = false;
      Sk.tg.turtleList = [];
    }
  }
  Sk.pre = myDiv+"_pre";
  Sk.configure({output:outf, read: builtinRead });
  var myPromise = Sk.misceval.asyncToPromise(function() {
    return Sk.importMainWithBody("<stdin>",false,prog,true); });
  myPromise.then(function() {}, function(err) {
        var er = err.toString();
        var e = er.slice(0, [er.length-1]);
        var oldNo = er[er.length-1];
        var newNo = + oldNo;
        var ee = e.concat(String(newNo-1));
        console.log("Error: " + ee);
        document.getElementById("error").innerHTML ="<br>" + ee + "<br>";
   });

  gradeIncoming(incoming);
}

var JSInputDemo = (function() {
  'use strict';
  // on dom loaded
  function getGrade() {
    // The following return value may or may not be used to grade server-side.
    // If getState and setState are used, then the Python grader also gets access
    // to the return value of getState and can choose it instead to grade.
    runit("example1");
    return JSON.stringify(state.selectedChoice);
  }

  function getState() {
    // Returns the current state (which can be used for grading).
    return JSON.stringify(state);
  }

    // This function will be called with 1 argument when JSChannel is not used,
    // 2 otherwise. In the latter case, the first argument is a transaction
    // object that will not be used here
    // (see http://mozilla.github.io/jschannel/docs/)

  function setState() {
    var stateString = arguments.length === 1 ? arguments[0] : arguments[1];
    state = JSON.parse(stateString);
    editor1.getDoc().setValue(state.default);
    runit("example1");
  }

  // Establish a channel only if this application is embedded in an iframe.
  // This will let the parent window communicate with this application using
  // RPC and bypass SOP restrictions.
  if (window.parent !== window) {
    channel = Channel.build({
    window: window.parent,
    origin: '*',
    scope: 'JSInput'
  });

    channel.bind('getGrade', getGrade);
    channel.bind('getState', getState);
    channel.bind('setState', setState);
  }

  return {
    getState: getState,
    setState: setState,
    getGrade: getGrade
  };
}());
