$(function(){       
//    $.getJSON("receptek.json",function(data){
//        receptekTomb=(data);
//        kiir();
//    });
    $.ajax({url: "receptek.json", success: function(result){ receptekTomb=(result); kiir(); rendezMenu();}});
    $("#ok").click(ujReceptFelvetel);
    $("article").on("click","div",megjelenit);
    $("article").on("click","#torol",torles);
    $("nav").on("click","#nevcsokk",rendezNevCsokkeno);
    $("nav").on("click","#nevnov",rendezNevNovekvo);
    $("nav").on("click","#arcsokk",rendezArCsokkeno);
    $("nav").on("click","#arnov",rendezArNovekvo);
});

var receptekTomb=[];

function kiir(){
    $("article").empty();
    for (var i = 0; i < receptekTomb.length; i++) {
        $("article").append("<div id='"+i+"'>");
        $("#"+i).append("<div>"+receptekTomb[i].neve);
        $("#"+i).append("<div>"+receptekTomb[i].ar+ " ft");
        $("#"+i).append("<div>"+"<img src='"+receptekTomb[i].eleresiut+"'>");
        $("#"+i).append("<div>"+"Darab:"+"<input type='number'>");
        $("#"+i).append("<div>"+"<input type='button' id='torol' value='TÖRÖL'>");
        $("#"+i).append("<div>"+"<input type='button' id='modosit' value='MÓDOSÍT'>");
    }
    
}

function ujReceptFelvetel(){
    var ujRecept={};
    ujRecept.neve=$("#nev").val();
    ujRecept.elkeszitesiido=$("#elkido").val();
    ujRecept.eleresiut=$("#kep").val();
    ujRecept.leiras=$("#leir").val();
    ujRecept.kategoria=$("#kat").val();
    ujRecept.ar=$("#ara").val();
    receptekTomb.push(ujRecept);
    kiir();
}

function megjelenit(){
    $("header").empty();
    $("header").append("<h1>"+"Receptkönyv");
    var id=Number($(this).attr("id"));
    $("header").append("<ul>");
    $.each(receptekTomb[id], function(k,v){       
        if (k==="ar") {
            $("header ul").append("<li>"+k+": "+v+" ft");
        }
        else{
            $("header ul").append("<li>"+k+": "+v);
        }
    });
}

function torles(){
    var id=Number($(this).attr("id"));
    $(this).parents("div").remove();
    receptekTomb.splice(id,1);
}

function modositas(){
    var id=Number($(this).attr("id"));
    
}

function rendezMenu(){
    $("nav").append("<div class='dropdown'>");
    $(".dropdown").append("<button class='dropdownbtn'>"+"Rendezési szempontok");
    $(".dropdown").append("<div class='subdrop'>");
    $(".subdrop").append("<button id='nevcsokk'>"+"Név szerint csökkenő");
    $(".subdrop").append("<button id='nevnov'>"+"Név szerint növekvő");
    $(".subdrop").append("<button id='arcsokk'>"+"Ár szerint csökkenő");
    $(".subdrop").append("<button id='arnov'>"+"Ár szerint növekvő");
}

function rendezNev(mezo){
        receptekTomb.sort(
            function(a,b){
                return Number(a[mezo]>b[mezo])-0.5;
            }
            );
}

function rendezAr(mezo){
        receptekTomb.sort(
            function(a,b){
                return a[mezo]-b[mezo];
            }
            );
}

function rendezNevNovekvo(){
    for (var i = 0; i < receptekTomb.length; i++) {
        $.each(receptekTomb[i], function(k,v){
            if (k==="neve") {
                rendezNev(k);
            }
        });
    }
    kiir();
}

function rendezNevCsokkeno(){
    rendezNevNovekvo();
    receptekTomb.reverse();
    kiir();
}

function rendezArNovekvo(){
    for (var i = 0; i < receptekTomb.length; i++) {
        $.each(receptekTomb[i], function(k,v){
            if (k==="ar") {             
                rendezAr(k);
            }
        });
    }
    kiir();
}

function rendezArCsokkeno(){
    rendezArNovekvo();
    receptekTomb.reverse();
    kiir();
}