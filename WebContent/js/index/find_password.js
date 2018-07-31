var
    $Email = $("#Email"),
    $EmailBox= $("#EmailBox"),
    regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;








function validateEmail() {

    var val = $Email.val();

    if(regEmail.test(val)) {
        $EmailBox.removeClass("bad");
        $EmailBox.addClass("good");

        $(".btn_find_password_submit").attr("disabled",true);

        $(".btn_find_password_submit").removeAttr("disabled");

        $(".btn_find_password_submit").css("opacity",1);

        return true;
    }else if(val ==""){
        $EmailBox.removeClass("good");
        $EmailBox.removeClass("bad");
    }else {
        $EmailBox.removeClass("good");
        $EmailBox.addClass("bad");


        $(".btn_find_password_submit").attr("disabled",true);

        $(".btn_find_password_submit").removeAttr("disabled");

        $(".btn_find_password_submit").css("opacity",0.6);

        return false;
    }//if~else end

}//validateEmail() end





$Email.keyup(validateEmail);
