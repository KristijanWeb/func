$('img[data-enlargeable]').addClass('img-enlargeable').click(function(){
    var src = $(this).attr('src');
    var modal;
    function removeModal(){ modal.remove(); $('body').off('keyup.modal-close'); }
    modal = $('<div>').css({
        background: 'RGBA(0,0,0,.5) url('+src+') no-repeat center',
        backgroundSize: 'contain',
        width:'100%', height:'100%',
        position:'fixed',
        zIndex:'10000',
        top:'0', left:'0',
        cursor: 'zoom-out'
    }).click(function(){
        removeModal();
    }).appendTo('body');
    //handling ESC
    $('body').on('keyup.modal-close', function(e){
    if(e.key==='Escape'){ removeModal(); } 
    });
});

var date = new Date();
var mj = date.getMonth() + 1;
var dan = date.getDate();
var god = date.getFullYear();
var fullData = god+"."+mj+"."+dan;
console.log(fullData);
var fullD = Date.parse(fullData);

//Odabir vremena
var vr_od = "";
var vr_do = "";

document.getElementById("tperiod").style.pointerEvents = "none";
// Od
$("#fromperiod").datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 1,
    onClose: function(selectedDate) {
        $("#toperiod").datepicker("option", "minDate", selectedDate);

        var vrijeme_od = selectedDate;
        vr_od += vrijeme_od;

        var ttdd = new Date();
        var getFullY = ttdd.getFullYear();

        if(vrijeme_od > '1/1/'+getFullY){
            $("#tperiod").removeAttr('style');
            document.getElementById("fperiod").style.pointerEvents = "none";
        }
    }
});
// Do
$("#toperiod").datepicker({
    defaultDate: "+1w",
    changeMonth: true,
    numberOfMonths: 1,
    onClose: function(selectedDate) {
        $("#fromperiod").datepicker("option", "maxDate", selectedDate);

        var vrijeme_do = selectedDate;
        vr_do += vrijeme_do;

        var date_diff_indays = function(date1, date2) {
            dt1 = new Date(date1);
            dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        }
        
        var finish_date = date_diff_indays(vr_od, vr_do);

        console.log(finish_date);

        if(finish_date > 10){
            var val = $("#txt").text();
            var va = parseFloat(val);
            var vall = va - (va * .05);
            var ve = vall.toFixed(2);

            $("#konacna_cijena").html("Konačna cijena sa popustom <span id='kon_cij'>" + ve + "</span> kn");
            $("#cijena").val(ve);
        }
        
        if(finish_date > 14){
            var val = $("#txt").text();
            var va = parseFloat(val);
            var vall = va - (va * .10);
            var ve = vall.toFixed(2);

            $("#konacna_cijena").html("Konačna cijena sa popustom <span id='kon_cij'>" + ve + "</span> kn");
            $("#cijena").val(ve);
        }

        var ttdd = new Date();
        var getFullY = ttdd.getFullYear();

        if(vrijeme_do > '1/1/'+getFullY){
            document.getElementById("tperiod").style.pointerEvents = "none";
            document.getElementById("cont").style.pointerEvents = "none";
        }
    },
    onSelect: function(dateText) {
        var tv = this.value;

        var date_diff_indays = function(date1, date2) {
            dt1 = new Date(date1);
            dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        }

        var finish_da = date_diff_indays(vr_od, tv);

        if(finish_da > 10){
            var val = $("#txt").text();
            var va = parseFloat(val);
            var vall = va - (va * .05);

            $("#konacna_cijena").html("Konačna cijena sa popustom <span id='kon_cij'>" + vall + "</span> kn");
            $("#cijena").val(vall);
        }
        
        if(finish_da > 14){
            var val = $("#txt").text();
            var va = parseFloat(val);
            var vall = va - (va * .10);

            $("#konacna_cijena").html("Konačna cijena sa popustom <span id='kon_cij'>" + vall + "</span> kn");
            $("#cijena").val(vall);
        }

        if(tv > '1/1/2020'){
            document.getElementById("tperiod").style.pointerEvents = "none";
            document.getElementById("cont").style.pointerEvents = "none";
        }
    }
});

if(fullD >= Date.parse(god+".1.1") && fullD < Date.parse(god+".4.1")){
    $("#container").remove();
}
if(fullD > Date.parse(god+".11.1") && fullD <= Date.parse(god+".12.30")){
    $("#container").remove();
}

$(".form-check-input-oprema").on('change', function(){
    var prik = $(this).val();

    if(prik == "Prikolica"){
        var val = $("#cijena").val();
        var va = parseFloat(val);

        function addCijMat(add){
            document.getElementById("txt").innerHTML = va + add;
            document.getElementById("cijena").innerHTML = va + add;

            $("#cijena").val(va + add);
            document.getElementById("op").style.pointerEvents = "none";
            document.getElementById("op").style.backgroundColor = "#eee";
            document.getElementById("op").style.color = "rgb(178 178 178)";
        }

        if(fullD > Date.parse(god+".9.21") && fullD < Date.parse(god+".11.1") || fullD > Date.parse(god+".4.1") && fullD < Date.parse(god+".6.10")){
            addCijMat(15);
        }
        if(fullD > Date.parse(god+".6.11") && fullD < Date.parse(god+".7.5") || fullD > Date.parse(god+".9.1") && fullD < Date.parse(god+".9.20")){
            addCijMat(15);
        }
        if(fullD > Date.parse(god+".6.7") && fullD < Date.parse(god+".8.31")){
            addCijMat(15);
        }
    }
    if(prik == "Čamac"){
        var val = $("#cijena").val();
        var va = parseFloat(val);

        function addCijMat(add){
            document.getElementById("txt").innerHTML = va + add;
            document.getElementById("cijena").innerHTML = va + add;

            $("#cijena").val(va + add);
            document.getElementById("op1").style.pointerEvents = "none";
            document.getElementById("op1").style.backgroundColor = "#eee";
            document.getElementById("op1").style.color = "rgb(178 178 178)";
        }

        if(fullD > Date.parse(god+".9.21") && fullD < Date.parse(god+".11.1") || fullD > Date.parse(god+".4.1") && fullD < Date.parse(god+".6.10")){
            addCijMat(25);
        }
        if(fullD > Date.parse(god+".6.11") && fullD < Date.parse(god+".7.5") || fullD > Date.parse(god+".9.1") && fullD < Date.parse(god+".9.20")){
            addCijMat(35);
        }
        if(fullD > Date.parse(god+".6.7") && fullD < Date.parse(god+".8.31")){
            addCijMat(40);
        }
    }
    if(prik == "Priključak za struju"){
        var val = $("#cijena").val();
        var va = parseFloat(val);

        function addCijMat(add){
            document.getElementById("txt").innerHTML = va + add;
            document.getElementById("cijena").innerHTML = va + add;

            $("#cijena").val(va + add);
            document.getElementById("op2").style.pointerEvents = "none";
            document.getElementById("op2").style.backgroundColor = "#eee";
            document.getElementById("op2").style.color = "rgb(178 178 178)";
        }

        if(fullD > Date.parse(god+".9.21") && fullD < Date.parse(god+".11.1") || fullD > Date.parse(god+".4.1") && fullD < Date.parse(god+".6.10")){
            addCijMat(30);
        }
        if(fullD > Date.parse(god+".6.11") && fullD < Date.parse(god+".7.5") || fullD > Date.parse(god+".9.1") && fullD < Date.parse(god+".9.20")){
            addCijMat(30);
        }
        if(fullD > Date.parse(god+".6.7") && fullD < Date.parse(god+".8.31")){
            addCijMat(30);
        }
    }
    if(prik == "Perilica za rublje"){
        var val = $("#cijena").val();
        var va = parseFloat(val);

        function addCijMat(add){
            document.getElementById("txt").innerHTML = va + add;
            document.getElementById("cijena").innerHTML = va + add;

            $("#cijena").val(va + add);
            document.getElementById("op3").style.pointerEvents = "none";
            document.getElementById("op3").style.backgroundColor = "#eee";
            document.getElementById("op3").style.color = "rgb(178 178 178)";
        }

        if(fullD > Date.parse(god+".9.21") && fullD < Date.parse(god+".11.1") || fullD > Date.parse(god+".4.1") && fullD < Date.parse(god+".6.10")){
            addCijMat(25);
        }
        if(fullD > Date.parse(god+".6.11") && fullD < Date.parse(god+".7.5") || fullD > Date.parse(god+".9.1") && fullD < Date.parse(god+".9.20")){
            addCijMat(25);
        }
        if(fullD > Date.parse(god+".6.7") && fullD < Date.parse(god+".8.31")){
            addCijMat(25);
        }
    }
});

$("#kucni_ljubimac").on('change', function(){
    var klj = $(this).val();

    var val = $("#cijena").val();
    var va = parseFloat(val);

    function addCijZiv(add){
        document.getElementById("txt").innerHTML = va + add;
        document.getElementById("cijena").innerHTML = va + add;

        $("#cijena").val(va + add);
        $('.kucni_ljubimac').val(klj);
        $('.zaz3').prop('disabled', true);
    }

    if(fullD > Date.parse(god+".9.21") && fullD < Date.parse(god+".11.1") || fullD > Date.parse(god+".4.1") && fullD < Date.parse(god+".6.10")){
        if(klj == 1){
            addCijZiv(35);
        }
        else if(klj == 2){
            addCijZiv(80);
        }
        else if(klj == 3){
            addCijZiv(115);
        }
        else if(klj == 4){
            addCijZiv(150);
        }
        else if(klj == 5){
            addCijZiv(185);
        }
        else if(klj == 6){
            addCijZiv(120);
        }
        else if(klj == 7){
            addCijZiv(155);
        }
        else if(klj == 8){
            addCijZiv(190);
        }
        else if(klj == 9){
            addCijZiv(225);
        }
        else if(klj == 10){
            addCijZiv(260);
        }
    }
    if(fullD > Date.parse(god+".6.11") && fullD < Date.parse(god+".7.5") || fullD > Date.parse(god+".9.1") && fullD < Date.parse(god+".9.20")){
        if(klj == 1){
            addCijZiv(35);
        }
        else if(klj == 2){
            addCijZiv(80);
        }
        else if(klj == 3){
            addCijZiv(115);
        }
        else if(klj == 4){
            addCijZiv(150);
        }
        else if(klj == 5){
            addCijZiv(185);
        }
        else if(klj == 6){
            addCijZiv(120);
        }
        else if(klj == 7){
            addCijZiv(155);
        }
        else if(klj == 8){
            addCijZiv(190);
        }
        else if(klj == 9){
            addCijZiv(225);
        }
        else if(klj == 10){
            addCijZiv(260);
        }
    }
    if(fullD > Date.parse(god+".6.7") && fullD < Date.parse(god+".8.31")){
        if(klj == 1){
            addCijZiv(35);
        }
        else if(klj == 2){
            addCijZiv(80);
        }
        else if(klj == 3){
            addCijZiv(115);
        }
        else if(klj == 4){
            addCijZiv(150);
        }
        else if(klj == 5){
            addCijZiv(185);
        }
        else if(klj == 6){
            addCijZiv(120);
        }
        else if(klj == 7){
            addCijZiv(155);
        }
        else if(klj == 8){
            addCijZiv(190);
        }
        else if(klj == 9){
            addCijZiv(225);
        }
        else if(klj == 10){
            addCijZiv(260);
        }
    }
});

$('#odrasli').on('change', function() {
    var odras = $(this).val();

    var val = $("#cijena").val();
    var va = parseFloat(val);

    function addCijOsoba(add){
        document.getElementById("txt").innerHTML = va + add;
        document.getElementById("cijena").innerHTML = va + add;

        $("#cijena").val(va + add);
        $(".odrasli").val(odras);
        $(".zaz").prop('disabled', true);
    }

    if(fullD >= Date.parse(god+".9.21") && fullD <= Date.parse(god+".11.1") || fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".6.10")){
        if(odras == 1){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(30 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(30 + 8);
            }
            else {
                addCijOsoba(30);
            }
        }
        else if(odras == 2){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(60 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(60 + 8);
            }
            else {
                addCijOsoba(60);
            }
        }
        else if(odras == 3){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(90 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(90 + 8);
            }
            else {
                addCijOsoba(90);
            }
        }
        else if(odras == 4){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(120 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(120 + 8);
            }
            else {
                addCijOsoba(120);
            }
        }
        else if(odras == 5){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(150 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(150 + 8);
            }
            else {
                addCijOsoba(150);
            }
        }
        else if(odras == 6){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(180 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(180 + 8);
            }
            else {
                addCijOsoba(180);
            }
        }
        else if(odras == 7){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(210 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(210 + 8);
            }
            else {
                addCijOsoba(210);
            }
        }
        else if(odras == 8){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(240 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(240 + 8);
            }
            else {
                addCijOsoba(240);
            }
        }
        else if(odras == 9){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(270 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(270 + 8);
            }
            else {
                addCijOsoba(270);
            }
        }
        else if(odras == 10){
            if(fullD >= Date.parse(god+".10.1") && fullD < Date.parse(god+".11.1")){
                addCijOsoba(300 + 5);
            }
            else if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
                addCijOsoba(300 + 8);
            }
            else {
                addCijOsoba(300);
            }
        }
    }

    if(fullD > Date.parse(god+".6.11") && fullD < Date.parse(god+".7.5") || fullD > Date.parse(god+".9.1") && fullD < Date.parse(god+".9.20")){
        if(odras == 1){
            addCijOsoba(40);
        }
        else if(odras == 2){
            addCijOsoba(80);
        }
        else if(odras == 3){
            addCijOsoba(120);
        }
        else if(odras == 4){
            addCijOsoba(160);
        }
        else if(odras == 5){
            addCijOsoba(200);
        }
        else if(odras == 6){
            addCijOsoba(240);
        }
        else if(odras == 7){
            addCijOsoba(280);
        }
        else if(odras == 8){
            addCijOsoba(320);
        }
        else if(odras == 9){
            addCijOsoba(360);
        }
        else if(odras == 10){
            addCijOsoba(400);
        }
    }
    if(fullD > Date.parse(god+".6.7") && fullD < Date.parse(god+".8.31")){
        if(odras == 1){
            addCijOsoba(50);
        }
        else if(odras == 2){
            addCijOsoba(100);
        }
        else if(odras == 3){
            addCijOsoba(150);
        }
        else if(odras == 4){
            addCijOsoba(200);
        }
        else if(odras == 5){
            addCijOsoba(250);
        }
        else if(odras == 6){
            addCijOsoba(300);
        }
        else if(odras == 7){
            addCijOsoba(350);
        }
        else if(odras == 8){
            addCijOsoba(400);
        }
        else if(odras == 9){
            addCijOsoba(450);
        }
        else if(odras == 10){
            addCijOsoba(500);
        }
    }
});

$("#djeca_osam").on('change', function(){
    var odrass = $(this).val();

    var val = $("#cijena").val();
    var va = parseFloat(val);

    function addCijdjos(add){
        document.getElementById("txt").innerHTML = va + add;
        document.getElementById("cijena").innerHTML = va + add;

        $("#cijena").val(va + add);
        $(".djeca_osam").val(odrass);
        $(".zaz1").prop('disabled', true);
    }

    if(fullD >= Date.parse(god+".4.1") && fullD <= Date.parse(god+".9.30")){
        if(odrass == 1){
            addCijdjos(4);
        }
        else if(odrass == 2){
            addCijdjos(8);
        }
        else if(odrass == 3){
            addCijdjos(12);
        }
        else if(odrass == 4){
            addCijdjos(16);
        }
        else if(odrass == 5){
            addCijdjos(20);
        }
        else if(odrass == 6){
            addCijdjos(24);
        }
        else if(odrass == 7){
            addCijdjos(28);
        }
        else if(odrass == 8){
            addCijdjos(32);
        }
        else if(odrass == 9){
            addCijdjos(36);
        }
        else if(odrass == 10){
            addCijdjos(40);
        }
    }
    if(fullD >= Date.parse(god+".10.1") && fullD <= Date.parse(god+".11.1")){
        if(odrass == 1){
            addCijdjos(2.50);
        }
        else if(odrass == 2){
            addCijdjos(5);
        }
        else if(odrass == 3){
            addCijdjos(7.5);
        }
        else if(odrass == 4){
            addCijdjos(10);
        }
        else if(odrass == 5){
            addCijdjos(12.5);
        }
        else if(odrass == 6){
            addCijdjos(15);
        }
        else if(odrass == 7){
            addCijdjos(17.5);
        }
        else if(odrass == 8){
            addCijdjos(20);
        }
        else if(odrass == 9){
            addCijdjos(22.5);
        }
        else if(odrass == 10){
            addCijdjos(25);
        }
    }
});

$('#djeca_dva').on('change', function() {
    var odras = $(this).val();

    var val = $("#cijena").val();
    var va = parseFloat(val);

    function addCijOsoba(add){
        document.getElementById("txt").innerHTML = va + add;
        document.getElementById("cijena").innerHTML = va + add;

        $("#cijena").val(va + add);
        $(".djeca_dva").val(odras);
        $(".zaz2").prop('disabled', true);
    }

    if(fullD > Date.parse("2020.9.21") && fullD < Date.parse("2020.11.1") || fullD > Date.parse("2020.4.1") && fullD < Date.parse("2020.6.10")){
        if(odras == 1){
            addCijOsoba(15);
        }
        else if(odras == 2){
            addCijOsoba(30);
        }
        else if(odras == 3){
            addCijOsoba(45);
        }
        else if(odras == 4){
            addCijOsoba(60);
        }
        else if(odras == 5){
            addCijOsoba(75);
        }
        else if(odras == 6){
            addCijOsoba(90);
        }
        else if(odras == 7){
            addCijOsoba(105);
        }
        else if(odras == 8){
            addCijOsoba(120);
        }
        else if(odras == 9){
            addCijOsoba(135);
        }
        else if(odras == 10){
            addCijOsoba(150);
        }
    }
    if(fullD > Date.parse(god+".6.11") && fullD < Date.parse(god+".7.5") || fullD > Date.parse(god+".9.1") && fullD < Date.parse(god+".9.20")){
        if(odras == 1){
            addCijOsoba(20);
        }
        else if(odras == 2){
            addCijOsoba(40);
        }
        else if(odras == 3){
            addCijOsoba(60);
        }
        else if(odras == 4){
            addCijOsoba(80);
        }
        else if(odras == 5){
            addCijOsoba(100);
        }
        else if(odras == 6){
            addCijOsoba(120);
        }
        else if(odras == 7){
            addCijOsoba(140);
        }
        else if(odras == 8){
            addCijOsoba(160);
        }
        else if(odras == 9){
            addCijOsoba(180);
        }
        else if(odras == 10){
            addCijOsoba(200);
        }
    }
    if(fullD > Date.parse(god+".6.7") && fullD < Date.parse(god+".8.31")){
        if(odras == 1){
            addCijOsoba(25);
        }
        else if(odras == 2){
            addCijOsoba(50);
        }
        else if(odras == 3){
            addCijOsoba(75);
        }
        else if(odras == 4){
            addCijOsoba(100);
        }
        else if(odras == 5){
            addCijOsoba(125);
        }
        else if(odras == 6){
            addCijOsoba(150);
        }
        else if(odras == 7){
            addCijOsoba(175);
        }
        else if(odras == 8){
            addCijOsoba(200);
        }
        else if(odras == 9){
            addCijOsoba(225);
        }
        else if(odras == 10){
            addCijOsoba(250);
        }
    }
});

// Ajax i PHP za zahtjev rezerviranja
$(document).ready(function() {
    $('#butsave').on('click', function() {
        var fromperiod = $("#fromperiod").val();
        var toperiod = $("#toperiod").val();
        var odrasli = $('#odrasli').val();
        var djeca_osam = $('#djeca_osam').val();
        var djeca_dva = $('#djeca_dva').val();
        var kucni_ljubimac = $('#kucni_ljubimac').val();
        var oprema = $('#oprema').val();
        var smjestaj = $('#smjestaj').val();
        var name_lastname = $('#name_lastname').val();
        var napomena = $('#napomena').val();
        var cijena = $('#cijena').val();

        var smjestaj = [];
        $(".form-check-input").each(function(){
            if ($(this).is(":checked")) {
                smjestaj.push($(this).val());
            }
        });
        smjestaj = smjestaj.toString();

        var oprema = [];
        $(".form-check-input-oprema").each(function(){
            if ($(this).is(":checked")) {
                oprema.push($(this).val());
            }
        });
        oprema = oprema.toString();

        if(fromperiod!="" && toperiod!=""){
            $.ajax({
                url: "save.php",
                type: "post",
                data: {
                    fromperiod: fromperiod,
                    toperiod: toperiod,
                    odrasli: odrasli,
                    djeca_osam: djeca_osam,
                    djeca_dva: djeca_dva,
                    kucni_ljubimac: kucni_ljubimac,
                    oprema: oprema,
                    smjestaj: smjestaj,
                    name_lastname: name_lastname,
                    napomena: napomena,
                    cijena: cijena
                },
                success: function(dataResult){
                    $("#success").show();
                    $('#success').html('Uspješno rezervirano!');
                    $("#fupForm").find("input[type=text], textarea").val("");
                    $("#odrasli").val("");
                    $("#djeca_osam").val("");
                    $("#djeca_dva").val("");
                    $("#kucni_ljubimac").val("");
                    $("#kucni_ljubimac").prop('disabled', false);
                    $(".form-check-input").prop('checked', false);
                    $(".form-check-input-oprema").prop('checked', false);
                    $(".zaz2").prop('disabled', false);
                    $(".zaz").prop('disabled', false);
                    $(".zaz1").prop('disabled', false);
                    $("#img").html("");
                    $('#pov').hide();
                    $('#sma').hide();
                    $('#kn').hide();
                    document.getElementById("txt").innerHTML = "";
                    $('#cm').hide();
                    document.getElementById("tt").innerHTML = "";
                    document.getElementById("text").innerHTML = "";
                    $("#konacna_cijena").hide();
                    $("#op").removeAttr('style');
                    $("#op1").removeAttr('style');
                    $("#op2").removeAttr('style');
                    $("#op3").removeAttr('style');
                }
            });
        }
        else{
            $("#success").show();
            $('#success').html('Molim, popunite mjesta!');
        }
    });
});

//funkcija povecavanje slike
$("#pov").click(function() {
    $('#pic').height(350);
});

//funkcija smanjivanje slike
$("#sma").click(function() {
    $('#pic').height(200);
});

//Sakrij buttone za povecanje i smanjivanje
$('#pov').hide();
$('#sma').hide();

$('#cm').hide();
$('#kn').hide();

document.getElementById("fupForm").style.pointerEvents = "none";

//Funkcija prilikom odabira mjesta
$("button").click(function() {
    var btn = $(this).text();

    $("#fupForm").removeAttr("style");

    //Prikazi buttone za povecanje i smanjivanje
    $('#pov').show();
    $('#sma').show();

    $('#cm').show();
    $('#kn').show();

    //Cijene mjesta
    var zone1_price = "";
    var zone2_price = "";
    var zone3_price = "";
    var zone4_price = "";
    var zone5_price = "";

    if(fullD >= Date.parse("2020.9.21") && fullD <= Date.parse("2020.11.1") || fullD >= Date.parse("2020.4.1") && fullD <= Date.parse("2020.6.10")){
        var z1_jedan = 100 + 7;
        var z2_dva = 70 + 7;
        var z3_tri = 50 + 7;
        var z4_cetiri = 40 + 7;
        var z5_pet = 30 + 7;

        zone1_price += z1_jedan;
        zone2_price += z2_dva;
        zone3_price += z3_tri;
        zone4_price += z4_cetiri;
        zone5_price += z5_pet;
    }
    else if(fullD >= Date.parse(god+".6.11") && fullD <= Date.parse(god+".7.5") || fullD >= Date.parse(god+".9.1") && fullD <= Date.parse(god+".9.20")){
        var z1_jedan = 120 + 7;
        var z2_dva = 90 + 7;
        var z3_tri = 75 + 7;
        var z4_cetiri = 55 + 7;
        var z5_pet = 35 + 7;

        zone1_price += z1_jedan;
        zone2_price += z2_dva;
        zone3_price += z3_tri;
        zone4_price += z4_cetiri;
        zone5_price += z5_pet;
    }
    else if(fullD >= Date.parse(god+".6.7") && fullD <= Date.parse(god+".8.31")){
        var z1_jedan = 150 + 7;
        var z2_dva = 110 + 7;
        var z3_tri = 90 + 7;
        var z4_cetiri = 60 + 7;
        var z5_pet = 40 + 7;

        zone1_price += z1_jedan;
        zone2_price += z2_dva;
        zone3_price += z3_tri;
        zone4_price += z4_cetiri;
        zone5_price += z5_pet;
    }
    else {
        //$("#cont").remove();
    }

    // Ako je tocno izbaci određenu sliku
    function tocno(pp){
        $("#img").html("<img id='pic' src='img/"+pp+".jpg' height='200' />");
    }

    // Ako je netočno
    function netocno(){
        $("#text").html("Ne postoji u bazi!");
        $("#img").html("<img src='img/netocno.png' height='200' />");
    }

    // Opis svakog mjesta
    const desc = {
        1: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "+btn,
        2: "Description za mjesto "+btn,
        3: "Description za mjesto "+btn,
        4: "Description za mjesto "+btn,
        5: "Description za mjesto "+btn,
        6: "Description za mjesto "+btn,
        7: "Description za mjesto "+btn,
        8: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "+btn,
        9: "Description za mjesto "+btn,
        10: "Description za mjesto "+btn,
        11: "Description za mjesto "+btn,
        12: "Description za mjesto "+btn,
        13: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "+btn,
        14: "Description za mjesto "+btn,
        15: "Description za mjesto "+btn,
        16: "Description za mjesto "+btn,
        17: "Description za mjesto "+btn,
        18: "Description za mjesto "+btn,
        19: "Description za mjesto "+btn,
        20: "Description za mjesto "+btn,
        21: "Description za mjesto "+btn,
        23: "Description za mjesto "+btn,
        24: "Description za mjesto "+btn,
        25: "Description za mjesto "+btn,
        26: "Description za mjesto "+btn,
        27: "Description za mjesto "+btn,
        28: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. "+btn,
        29: "Description za mjesto "+btn,
        30: "Description za mjesto "+btn,
        31: "Description za mjesto "+btn,
        32: "Description za mjesto "+btn,
        33: "Description za mjesto "+btn,
        34: "Description za mjesto "+btn,
        35: "Description za mjesto "+btn,
        36: "Description za mjesto "+btn,
        37: "Description za mjesto "+btn,
        38: "Description za mjesto "+btn,
        39: "Description za mjesto "+btn,
        40: "Description za mjesto "+btn,
        41: "Description za mjesto "+btn,
        42: "Description za mjesto "+btn,
        43: "Description za mjesto "+btn,
        44: "Description za mjesto "+btn,
        45: "Description za mjesto "+btn,
        46: "Description za mjesto "+btn,
        47: "Description za mjesto "+btn,
        48: "Description za mjesto "+btn,
        49: "Description za mjesto "+btn,
        50: "Description za mjesto "+btn,
        51: "Description za mjesto "+btn,
        52: "Description za mjesto "+btn,
        53: "Description za mjesto "+btn,
        54: "Description za mjesto "+btn,
        55: "Description za mjesto "+btn,
        56: "Description za mjesto "+btn,
        57: "Description za mjesto "+btn,
        58: "Description za mjesto "+btn,
        59: "Description za mjesto "+btn,
        60: "Description za mjesto "+btn,
        61: "Description za mjesto "+btn,
        62: "Description za mjesto "+btn,
        63: "Description za mjesto "+btn,
        64: "Description za mjesto "+btn,
        65: "Description za mjesto "+btn,
        66: "Description za mjesto "+btn,
        67: "Description za mjesto "+btn,
        68: "Description za mjesto "+btn,
        69: "Description za mjesto "+btn,
        70: "Description za mjesto "+btn,
        71: "Description za mjesto "+btn,
        72: "Description za mjesto "+btn,
        73: "Description za mjesto "+btn,
        74: "Description za mjesto "+btn,
        75: "Description za mjesto "+btn,
        76: "Description za mjesto "+btn,
        77: "Description za mjesto "+btn,
        78: "Description za mjesto "+btn,
        79: "Description za mjesto "+btn,
        80: "Description za mjesto "+btn,
    };

    const qq = Object.keys(desc);

    // Mjesta u zoni
    const zone1 = [1,2,15,16,17];
    const title_z1 = "Zona 1";

    // Funckija za zonu
    function z1(pp, zon){
        for (let i = 0; i < pp.length; i++) {
            const element = pp[i];

            if(btn == element){
                tocno(btn);
                const title = zon +" - Parcela "+btn;
                document.getElementById("text").innerHTML = title;
                document.getElementById("txt").innerHTML = zone1_price;
                document.getElementById("cijena").value = zone1_price;
                
                for (let index = 0; index < qq.length; index++) {
                    const element = qq[index];
                    
                    if(btn == element){
                        document.getElementById("tt").innerHTML = desc[btn];
                    }
                }
            }
        }
    }
    
    // Mjesta za zonu
    const zone2 = [3,11,12,4,13,5,6,7,8,9,10,14,49,20,19,18,25,27,22,21,23,29,24,31,33];
    const title_z2 = "Zona 2";

    // Funckija za zonu
    function z2(pp, zon){
        for (let i = 0; i < pp.length; i++) {
            const element = pp[i];

            if(btn == element){
                tocno(btn);
                const title = zon +" - Parcela "+btn;
                document.getElementById("text").innerHTML = title;
                document.getElementById("txt").innerHTML = zone2_price;
                document.getElementById("cijena").value = zone2_price;

                for (let index = 0; index < qq.length; index++) {
                    const element = qq[index];
                    
                    if(btn == element){
                        document.getElementById("tt").innerHTML = desc[btn];
                    }
                }
            }
        }
    }

    // Mjesta za zonu
    const zone3 = [39,40,41,42,43,44,45,46,47,48,59,58,57,56,55,54,37,38];
    const title_z3 = "Zona 3";

    // Funckija za zonu
    function z3(pp, zon){
        for (let i = 0; i < pp.length; i++) {
            const element = pp[i];

            if(btn == element){
                tocno(btn);
                const title = zon +" - Parcela "+btn;
                document.getElementById("text").innerHTML = title;
                document.getElementById("txt").innerHTML = zone3_price;
                document.getElementById("cijena").value = zone3_price;

                for (let index = 0; index < qq.length; index++) {
                    const element = qq[index];
                    
                    if(btn == element){
                        document.getElementById("tt").innerHTML = desc[btn];
                    }
                }
            }
        }
    }

    // Mjesta za zonu
    const zone4 = [60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76];
    const title_z4 = "Zona 4";

    // Funckija za zonu
    function z4(pp, zon){
        for (let i = 0; i < pp.length; i++) {
            const element = pp[i];

            if(btn == element){
                tocno(btn);
                const title = zon +" - Parcela "+btn;
                document.getElementById("text").innerHTML = title;
                document.getElementById("txt").innerHTML = zone4_price;
                document.getElementById("cijena").value = zone4_price;

                for (let index = 0; index < qq.length; index++) {
                    const element = qq[index];
                    
                    if(btn == element){
                        document.getElementById("tt").innerHTML = desc[btn];
                    }
                }
            }
        }
    }

    // Mjesta za zonu
    const zone5 = [26,28,30,32,34,35,36,50,51,52,53,77,78,79,80];
    const title_z5 = "Zona 5";

    // Funckija za zonu
    function z5(pp, zon){
        for (let i = 0; i < pp.length; i++) {
            const element = pp[i];

            if(btn == element){
                tocno(btn);
                const title = zon +" - Parcela "+btn;
                document.getElementById("text").innerHTML = title;
                document.getElementById("txt").innerHTML = zone5_price;
                document.getElementById("cijena").value = zone5_price;

                for (let index = 0; index < qq.length; index++) {
                    const element = qq[index];
                    
                    if(btn == element){
                        document.getElementById("tt").innerHTML = desc[btn];
                    }
                }
            }
        }
    }

    // Pozivanje svih funckija
    z1(zone1, title_z1);
    z2(zone2, title_z2);
    z3(zone3, title_z3);
    z4(zone4, title_z4);
    z5(zone5, title_z5);
});