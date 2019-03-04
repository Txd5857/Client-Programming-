//Document.getElementByID()
function $( id ){
  return document.getElementById( id );
}
//Document.getElementsByTagName
function $$( tagname ){
  return document.getElementsByTagName( tagname );
}
//Document.getElementsByClassName
function $$$( classname ){
  return document.getElementsByClassName( classname );
}

//remove Element function
function removeElement( node ){
  node.parentNode.removeChild( node );
}


//creating an Element
function createElement( tagname, text, attribute, attributeval ){
  var ele = document.createElement (tagname);
  if( text != null ){
      ele.appendChild( document.createTextNode( text ) );
  }
  if( attribute != null){
      ele.setAttribute( attribute, attributeval );
  }
  return ele;
}

//placeholder for chosen guesswho
var chosenGuessWho = [];
//imgarray
var imggs = [];
//randomize new guess who.
function guesswho() {
  var len = gamecharacters.length;
  var x = Math.floor((Math.random() * len));
  chosenGuessWho.push( gamecharacters[x]);
}

//imgbacktoplace
function backtoback() {
  for (var i= 0; i<imggs.length; i++)
  {
    document.getElementById(imggs[i]).style.transition =  'opacity 1s ease-in-out';
    document.getElementById(imggs[i]).style.opacity = '1';  }
}

//reloads the page
function reload(){
  location.reload();
}

function start() {

  chosenGuessWho.pop();
  guesswho();
  console.log(chosenGuessWho[0]);

  createSelect('init');

  $('startbutton').disabled = 'true';
  //createSelect();
}

function createInput(type,name, id){
  var form= document.createElement( "input" );
  form.setAttribute( "type", type );
  form.setAttribute( "name", name );
  form.setAttribute( "id", id );
  return form;
}

function lit(){

    if (($( "selects").childNodes.length) >  10){
    var formDiv = createElement( "div", null, "id", "form" );
    formDiv.appendChild( createElement("h2","Guess Who in the Input below", null,null));
    var input = createElement("input", null, "id", "input") ;
    formDiv.appendChild(input);
    var inputbutton = createElement ("button","confirm","onclick","confirm()");
    inputbutton.setAttribute("style","height: 20px; margin: 5px auto;display:block;");
    formDiv.appendChild(inputbutton);

    formDiv.appendChild( createElement("h2","Fill out the form below", null,null));
    formDiv.appendChild(createElement("hr",null, null,null));

    var form = createElement( "form", null, null , null );
    form.setAttribute( "method" , "post" );
    form.setAttribute( "onsubmit", "return validate();" );

    form.appendChild( createElement( "label", "First Name and Last Name: ", null, null ) );
    var nameField =  createInput( 'text', 'firstlast', 'fl_name')
    if( retrieveInfo( "flname") != null) {
        nameField.value = retrieveInfo( "flname" );
    }
    form.appendChild(nameField);

    form.appendChild( createElement( "label", "Correct E-mail Below: ", null, null) );
    var emailField =  createInput( 'text', "e-mail", 'e_mail')
    if( retrieveInfo( "email") != null){
        emailField.value = retrieveInfo( "email" );
    }
    form.appendChild( emailField );
    form.appendChild( createInput("submit","submit","submit"));
    formDiv.appendChild(form);


    $$( "body" )[0].appendChild( formDiv );
 }

}

function confirm(){
  console.log('shit');
  var litt  = document.getElementById('input').value;
  console.log(litt);

  if (litt.length > 0)
	{
		var answer = litt.toUpperCase();
    var gueeess = chosenGuessWho[0].name;
    var correct = gueeess.toUpperCase();

    if (answer ==correct){
			alert('You have won! Please fill out the form below!');



		} else {
			alert('You have lost! Please fill out the form below or Try Again by clicking on Start New Game button.');
		}
    console.log(gueeess);
  }
}

//Building the page
function init(){

    var contentSection = createElement("div", null, "id", "content");

    //Creates and appends two sections to the wrapper div.
    //Selects and the  characteroard
    contentSection.appendChild( createElement( "div", null, "id", "selects" ) );
    contentSection.appendChild( createElement( "div", null, "id", "characterboard") );
    //Append the created sections to the page.
    $$( 'body' )[0].appendChild( createElement("h1", "Guess Who?", null, null ) );
    $$( 'body' )[0].appendChild( contentSection );

    //Create the button that starts new game
    var start = createElement("div", null, "id", "yellowbg");
    start.appendChild( createElement("button","Start The Game","id","startbutton") );
    start.setAttribute("onclick",'start()');
    var start1 = createElement("div", null, "id", "yellowbg");
    start1.appendChild( createElement("button","Start New Game","id","resetbutton") );
    start1.setAttribute("onclick",'reload()');
    var ready = createElement("div", null, "id", "yellowbg");
    var readybutt = createElement("button","Ready to GuessWho","id","readytoguess");
    readybutt.setAttribute("onclick","lit();");

    ready.appendChild(readybutt);
    //start1.setAttribute("onclick",'reload()');
    $( 'selects').appendChild( start1 );
    $( 'selects').appendChild( start );
    $( 'selects').appendChild( ready );

    //build the images to the charcaterboard
    var divimg, imgele;

    for ( var i=0; i<gamecharacters.length; i++) {
      var imagbg = createElement("div",null,"class","yellowbag");
      imagbg.style.height = '100px';
      imagbg.style.width = '100px';
      imagbg.style.float = "left";
      imagbg.style.padding = '5px';
      imagbg.setAttribute('values',gamecharacters[i].name);
      imagbg.setAttribute('id',gamecharacters[i].name);


      var img = createElement("img", null, "id", "Imgbox") ;
      img.setAttribute('src', gamecharacters[i].imgpath);
      img.style.height = '100px';
      img.style.width = '100px';

      imagbg.appendChild(img);

      $( 'characterboard').appendChild(imagbg);

    }


}


function createSelect( dom ) {
    backtoback();
    //First time through, dom is a string.
    if( typeof (dom) == 'string' ){
        var hold = data[ dom ];
        console.log(hold);
    } else {
      var hold = data[ dom.value ];
      console.log(hold);
    }

    if( hold != undefined ) {
        //Creates a div for holding the select menu.

        var selectDiv = createElement("div", null, "class", "selectDiv" );
        selectDiv.setAttribute("id","totheleft")

        //Creates the actual select omenu
        var selectOption = createElement( "select", null, "name", hold );
        selectOption.setAttribute( 'id', 'selectsize')
        selectOption.setAttribute( 'onchange',"next(this) ");

        for (var i = 0; i < hold.length; i++) {
            selectOption.appendChild( createElement("option", hold[i], "value", hold[i]) );
        }
        //Append the select option menu to the select div.
        selectDiv.appendChild( selectOption );
        $( 'selects' ).appendChild( selectDiv );

  } else {
      console.log('end');
      for (var i= 0; i<imggs.length; i++)
      {
        document.getElementById(imggs[i]).style.transition =  'opacity 1s ease-in-out';
        document.getElementById(imggs[i]).style.opacity = '0';
      }


  }
}

function  next (dom) {
  if ( $( "selects").childNodes.length > 0 ) {
      var div = dom.parentNode;
      console.log(div);
          while ( div != div.parentNode.lastChild ) {
              removeElement( div.parentNode.lastChild );
      }

      response( dom );
      createSelect(dom);
    }

}
function response( dom ) {
    var val = dom.value;
    var hold = chosenGuessWho[0];
    var tsk = properties[val];
    //console.log(val);

    var reply = createElement("div", null, "class", "selectDiv" );
    reply.setAttribute('id','totheright');
    var replymessage = createElement("button",null,"disabled","true");
    replymessage.setAttribute('id','selectsize');
    //console.log(tsk);
    if (tsk.includes(hold.name)) {
        var txtnode = document.createTextNode('Yes');
        for(var i = 0; i<gamecharacters.length; i++) {
          if ((!(tsk.includes(gamecharacters[i].name)))&&(!(imggs.includes(gamecharacters[i].name)))){
            imggs.push(gamecharacters[i].name);

          }
        }
      }
     else {
      var txtnode = document.createTextNode('No');

      var rip = [];
      for (var i=0; i < tsk.length; i++){
        if (!(imggs.includes(tsk[i]))){
        imggs.push(tsk[i]);
      }
      }


    }


    replymessage.appendChild(txtnode);
    reply.appendChild(replymessage);
    $( 'selects' ).appendChild(reply);

  }

  function validate(){
    if ($("fl_name").value == ""){
      $("fl_name").style.backgroundColor = "red";
    } else {
      saveInfo("flname",$("fl_name").value);
    }

    if ($("e_mail").value == ""){
      $("e_mail").style.backgroundColor = "red";
    } else {
      saveInfo("email", $("e_mail").value);
    }
  }

  function saveInfo( key, val ){
    if( localStorage ){
        //If this browser has local storage, use localstorage.
        localStorage.setItem( key, val );
    }else{
        //If this browser does not have local storage *COUGH* ie *cough* use cookies omnomnom
        if( GetCookie( key ) == null ){
            SetCookie( key, val );
        }else{
            alert( GetCookie( key ) );
        }
        alert( GetCookie( key ) );
    }
}


function retrieveInfo( key ) {

    if( localStorage ){
        return localStorage.getItem( key );
    } else {
        return GetCookie( key );
    }

}
