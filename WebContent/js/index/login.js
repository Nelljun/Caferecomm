var
    $Email = $("#Email"),
    $EmailBox= $("#EmailBox"),
    $pwd = $("#pwd"),
    $pwdBox = $("#pwdBox"),

    regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    regPwd = /^[\w|\-]{6,20}$/;







function validateEmail() {

    var val = $Email.val();

    if(regEmail.test(val)) {
        $EmailBox.removeClass("bad");
        $EmailBox.addClass("good");

        return true;
    }else if(val ==""){
        $EmailBox.removeClass("good");
        $EmailBox.removeClass("bad");


    }else {
        $EmailBox.removeClass("good");
        $EmailBox.addClass("bad");

        $(".btn_login_submit").attr("disabled",true);

        $(".btn_login_submit").removeAttr("disabled");
        $(".btn_login_submit").css("opacity",0.6);

        return false;
    }//if~else end

}//validateEmail() end


function validatePwd() {

    var val = $pwd.val();

    if(regPwd.test(val)) {
        $pwdBox.removeClass("bad");
        $pwdBox.addClass("good");

        $(".btn_login_submit").attr("disabled",true);

        $(".btn_login_submit").removeAttr("disabled");

        $(".btn_login_submit").css("opacity",1);




        return true;


    }else if(val ==""){
        $pwdBox.removeClass("good");
        $pwdBox.removeClass("bad");


    }else {
        $pwdBox.removeClass("good");
        $pwdBox.addClass("bad");

        $(".btn_login_submit").attr("disabled",true);

        $(".btn_login_submit").removeAttr("disabled");
        $(".btn_login_submit").css("opacity",0.6);
        return false;
    }//if~else end

}//validatePwd() end





$Email.keyup(validateEmail);
$pwd.keyup(validatePwd);