
$(document).ready(function () {
    $('#learn_container').hide();
    $('#quiz_container').hide();

    $('.nav-link').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $('#nav_home').click(function (e) {
        $('#home_container').show();
        $('#learn_container').hide();
        $('#quiz_container').hide();
    });
        
    $('#nav_learn').click(function (e) {
        $('#home_container').hide();
        $('#learn_container').show();
        $('#quiz_container').hide();
    });
        
    $('#nav_quiz').click(function (e) {
        $('#home_container').hide();
        $('#learn_container').hide();
        $('#quiz_container').show();
    });
});
    
$(function(){
    $('.selectpicker').selectpicker();
});
