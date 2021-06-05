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
    $("article").on("click",".etelnev",menuOsszeallitas);
});

var receptekTomb=[];
var edessegszam=0;
var osszelkido=0;
var osszar=0;

function kiir(){
    $("article").empty();
    for (var i = 0; i < receptekTomb.length; i++) {
        $("article").append("<div id='"+i+"'>");
        $("#"+i).append("<div class='etelnev'>"+receptekTomb[i].neve);
        $("#"+i).append("<div>"+receptekTomb[i].ar+ " ft");
        $("#"+i).append("<div>"+"<img src='"+receptekTomb[i].eleresiut+"'>");
        $("#"+i).append("<div>"+"Darab:"+"<input type='number'>");
        $("#"+i).append("<div>"+"<input type='button' id='torol' value='TÖRÖL'>");
        $("#"+i).append("<div>"+"<input type='button' id='modosit' value='MÓDOSÍT'>");
    }
    $("section").eq(1).append("<div id='menu'>");
    $("#menu").append("<table id='tablemenu'>");
    $("#tablemenu").append("<tr><th>Név</th><th>Elkészítési idő</th><th>Kategória</th><th>Összes elkészítési idő</th><th>Édességek száma</th><th>Össz ár</th></tr>");
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

function menuOsszeallitas(){
    var id=Number($(this).parent().attr("id"));
    var hossz=$("table tr").length;
    $("section table").append("<tr>");
    for (var item in receptekTomb[id]) {
        if (item==="neve") {
            $("section table tr").eq(hossz).append("<td>" + receptekTomb[id][item] + " </td>");            
        }
        else if (item==="elkeszitesiido") {
            $("section table tr").eq(hossz).append("<td>" + receptekTomb[id][item] + " </td>");
            var ido=receptekTomb[id][item].split(" ");
            osszelkido+=Number(ido[0]);
        }
        else if (item==="kategoria") {
            $("section table tr").eq(hossz).append("<td>" + receptekTomb[id][item] + " </td>");
            if (receptekTomb[id][item]==="édesség") {
                edessegszam++;
            }
        }
        else if (item==="ar") {
            osszar+=receptekTomb[id][item];
        }
    }
    $("section table tr").eq(hossz).append("<td>" + osszelkido + " </td>");
    $("section table tr").eq(hossz).append("<td>" + edessegszam + " </td>");
    $("section table tr").eq(hossz).append("<td>" + osszar + " </td>");
    
    
}