$(document).ready(function () {
    createleftbar();
    createsidebar();
    createboard();

    /*About Section*/
    createsection("about","class","w3-border w3-padding-large w3-display-container w3-opacity-min parallax");
    myXhr('get',{path:'/about/'},'#about').done(function(json){

        var x= "";
        var sectioncont = createElement("section",null,"id","aboutbg");
        sectioncont.setAttribute("class","w3-display-middle w3-black");
        sectioncont.setAttribute("style","white-space:no wrap;")

        $("#about").append($(sectioncont));

        var textbg = createElement("span",null,"class","w3-center w3-wide w3-padding w3-animate-opacity");
        textbg.setAttribute("padding-left", "20px;")
        x += "<h4>"+ json.title + "</h4>";
        x += "<hr>"
        x += "<h6>" + json.description + "</h6>";
        x += "<h6>" + json.quote + "</h6>" ;
        x += "<h6>" + json.quoteAuthor + "</h6>";

        $(textbg).append(x);
        $(sectioncont).append($(textbg));
        $("#about").append(sectioncont);

    });

    /*Undergrad Section*/

    myXhr('get',{path:'/degrees/undergraduate/'},'#undergrad').done(function(json){
        $.each(json.undergraduate, function(i, item) {
            $('#tabs'+(i+1)).append('<p style="text-transform: uppercase;">'+item.degreeName+'</p>');
            
            $('#tabs-'+(i+1)).append('<h1>' + item.title + '</h1>');
            $('#tabs-'+(i+1)).append('<h4>' + item.description + '</h4>');
            
            $('#tabs-'+(i+1)).append("<h2><u>  Concentrations </u></h2><h4>" + item.concentrations +"</h4");

        });
        
    });   
    
        /*Grad Section*/
    
   myXhr('get',{path:'/degrees/graduate/'},'#graduate').done(function(json){
        $.each(json.graduate, function(i, item) {  
            if (this.degreeName != "graduate advanced certificates"){
            $('#gtabs'+(i+1)).append('<p style="text-transform: uppercase;" >'+item.degreeName +'</p>');
            $('#gtabs-'+(i+1)).append('<h1>' + item.title + '</h1>');
            $('#gtabs-'+(i+1)).append('<h4 >' + item.description + '</h4>');
            
            $('#gtabs-'+(i+1)).append("<h2><u>  Concentrations </u></h2><h4>" + item.concentrations +"</h4");
            } else {
                $('#gactext').append('<h2 style="text-transform: uppercase;">'+ item.degreeName + '</h2>');
                $('#gactext').append('<h3> Available Certifactes: </h3> <p class="w3-medium"> ' + item.availableCertificates + '</p>');
                
            }
        });
    });

    /*Undergrad minors*/
    
    myXhr('get',{path:'/minors/'},'#minors').done(function(json){
        var x= "";
        x += "<div class='w3-row w3-display-top w3-center' style='white-space:nowrap;padding-top:20px;width:auto;'>";
        x += "<span class='w3-col l12 w3-center w3-padding-large w3-black w3-xlarge'> Undergraduate Minors </span>";
        x += "</div>";
    
        $.each(json.UgMinors, function(i, item) {

				x+='<div class="minors w3-col l4 w3-black" onclick="displayMinors(this)" data-name="'+item.name+'">';
				x+='<h4>'+item.title+'</h4></div>';
                
        });
        $("#minors").html(x);
    });

});





    function getFac(dom){
        myXhr('get',{path:'/people/faculty/username='+$(dom).attr('data-username')},null).done(function(json){
            console.log(json);
        });
    }

    ///////////////////////////////////////////////////
    //creating the skeleton .
    //creates left bar with the IST @ RIT

    function createleftbar(){
        var start = gettagname("body")[0];
        var end = getid("start2");
        var leftbar = createElement("nav",null,"class","w3-sidebar w3-hide-medium1 w3-hide-small");
        leftbar.setAttribute("style","width: 15%");
        leftbar.setAttribute("id","leftbar");
        var leftbg = createElement("div",null,"class","leftbg");
        var textbg = createElement("div",null,"class","vertical");
    
        textbg.appendChild(createElement("h1","IST","id","test1"));
        textbg.appendChild(createElement("h1","@","id","test"));
        textbg.appendChild(createElement("h1","RIT","id","test"));
        leftbg.appendChild(textbg);
        leftbar.appendChild(leftbg);
        start.insertBefore(leftbar,end);
    }
    //creates hidden sidebar
    function createsidebar(){
        var start = gettagname("body")[0];
        var end = getid("start2");

        //nav class with id of mySidebar
        var navbar = createElement("nav",null,"class","w3-sidebar w3-black w3-animate-right w3-xxlarge");
        navbar.setAttribute("id","mySidebar"); //id of navbar

        var exit = createElement("a",null,"class","w3-button w3-black w3-xxxlarge w3-display-topright");
        exit.setAttribute("onclick","closeNav()");
        exit.style.padding = "0 12px";
        exit.appendChild(createElement("i",null,"class","fa fa-remove"));

        var options = createElement("div",null,"class","w3-bar-block w3-center");
        options.appendChild(createsideblocks("#","home"));
        options.appendChild(createsideblocks("#start2","UnderGrad Degrees"));
        
        options.appendChild(createsideblocks("#graduate","graduate"));
        options.appendChild(createsideblocks("#gac","gac"));
        
        options.appendChild(createsideblocks("#minors","UnderGrad Minors"));

        navbar.appendChild(exit);
        navbar.appendChild(options);
        start.insertBefore(navbar,end);
        
        
    }

    //creates page content for rest of information; id =startofpage
    function createboard(){
        var start = gettagname("body")[0];
        var end = getid("start2");
        var board = createElement("div",null,"class","w3-main w3-padding-large");
        board.setAttribute("style","margin-left:15%;height: 700px;");
        board.setAttribute("id","startofpage");

        var menu =createElement("span",null,"class","w3-button w3-top w3-white w3-xxlarge w3-text-grey w3-hover-text-black");
        menu.setAttribute("style","width:auto;right:0;");
        menu.setAttribute("onclick","openNav()");
        menu.appendChild(createElement("i",null,"class","fa fa-bars"));

        board.appendChild(menu);

        start.insertBefore(board,end);
    }

    function createsection(id,attribute, attributeval){
        var board = getid("startofpage");

		var section = createElement("section",null,"id",id);
        section.setAttribute(attribute,attributeval);

        board.appendChild(section);
	}

    function displayMinors(dom){
        myXhr('get',{path:'/minors/UgMinors/name='+$(dom).attr('data-name')}, null).done(function(json){
			var x = '';
			var y = '';
			x+='<p>'+json.description+'</p>';
			x+='<h3>Courses</h3>';
			$.each(json.courses, function(i, item) {
				x+='<h4>'+json.courses[i]+'</h4>';
				x+='<div><p id="'+json.courses[i]+'"></p></div>';
			});
			$('#dialog1').html(x);
			$.each(json.courses, function(i, item) {
				x+=getMCourse(json.courses[i]);
			});
			$( '#dialog1' ).dialog( "open" );
			
		});
    }
    
    function getMCourse(dom) {
		myXhr('get',{path:'/course/courseID='+dom}, null).done(function(test){
			$('#'+dom).append(test.description);
		});
	}

    

    ///////////////////////////////////////////////////
    //utilities...
    //Document.getElementByID()
    function getid( id ){ return document.getElementById( id ); }
    //Document.getElementsByTagName
    function gettagname( tagname ){ return document.getElementsByTagName( tagname ); }
    //Document.getElementsByClassName
    function getclass( classname ){ return document.getElementsByClassName( classname ); }
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
    function openNav() {
        document.getElementById("mySidebar").style.width = "85%"; document.getElementById("mySidebar").style.display = "block";
    }

    function closeNav() {               document.getElementById("mySidebar").style.display = "none";
    }

    function createsideblocks(ref,name ){
        var ele = createElement("a",name,"href",ref);
        ele.setAttribute("onclick","closeNav()");
        ele.setAttribute("class","w3-bar-item w3-button w3-text-grey w3-hover-black");
        return ele;
    }

    $( function() {
		  $( "#tabs" ).tabs();
            $("#tabs, #tabs * ").removeClass('ui-state-active ui-tabs ui-state-hover ui-widget ui-widget-content ui-widget-header ui-tabs-panel ui-corner-top ui-corner-bottom ui-state-default ui-tab ui-state-hover ui-tabs-active ui-state-active ui-state-focus ui-corner-all ui-helper-reset ui-helper-clearfix ui-tabs-hover');
            
        $( "#gtabs" ).tabs()
            $("#gtabs, #gtabs *").removeClass('ui-tabs-tab ui-state-active ui-tabs ui-state-hover ui-widget ui-widget-content ui-widget-header ui-tabs-panel ui-corner-top ui-corner-bottom ui-state-default');
        
        $( "#dialog1" ).dialog({
			autoOpen: false,
			show: {
			effect: "blind",
			duration: 1000,
		},
		hide: {
			effect: "explode",
			duration: 1000
		}
		});
            
    } );

  
    //data - {path:'/about/'}
    //(getOrPost, data, idForSpinner)
    function myXhr(t, d, id){
        return $.ajax({
            type:t,
            url:'proxy.php',
            dataType:'json',
            data:d,
            cache:false,
            async:true,
            beforeSend:function(){
                //PLEASE - get your own spinner that 'fits' your site.
                $(id).append('<img src="spinner2.gif" class="spin"/>');
            }
        }).always(function(){
            //kill spinner
            $(id).find('.spin').fadeOut(5000,function(){
                $(this).remove();
            });
        }).fail(function(){
            //handle failure
        });
    }
