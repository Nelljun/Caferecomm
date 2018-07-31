 var
        $Email = $("#Email"),
        $EmailBox= $("#EmailBox"),
        $NickName = $("#NickName"),
        $NickNameBox= $("#NickNameBox"),
        $pwd = $("#pwd"),
        $pwdBox = $("#pwdBox"),
        $allAgree = $("#signUp_page_agreement"),
        $caferecomm= $("#signUp_page_cafereccom_agreement"),
        $privacy = $("#signUp_page_privacy_agreement"),

        regNickName = /^[가-힣]{3,10}$/,
        regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        regPwd = /^[\w|\-]{6,20}$/;


    function validateNickName() {

        var val = $NickName.val();

        if(regNickName.test(val)) {
            $NickNameBox.removeClass("bad");
            $NickNameBox.addClass("good");
            return true;
        }else if(val ==""){
            $NickNameBox.removeClass("good");
            $NickNameBox.removeClass("bad");
        }else {
            $NickNameBox.removeClass("good");
            $NickNameBox.addClass("bad");
            return false;
        }//if~else end

    }//validateEmail() end




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
            return false;
        }//if~else end

    }//validateEmail() end




    function validatePwd() {

        var val = $pwd.val();

        if(regPwd.test(val)) {
            $pwdBox.removeClass("bad");
            $pwdBox.addClass("good");
            return true;
        }else if(val ==""){
            $pwdBox.removeClass("good");
            $pwdBox.removeClass("bad");
        }else {
            $pwdBox.removeClass("good");
            $pwdBox.addClass("bad");
            return false;
        }//if~else end

    }//validatePwd() end

    $NickName.keyup(validateNickName);
    $Email.keyup(validateEmail);
    $pwd.keyup(validatePwd);



     $allAgree.click(function () {

        if($allAgree.prop("checked")) {

            $caferecomm.prop("checked",true);
            $privacy.prop("checked",true);

        }else {

            $caferecomm.prop("checked",false);
            $privacy.prop("checked",false);
        }

    });



    function check(){

        var $caferecomm= $("#signUp_page_cafereccom_agreement"),
            $privacy = $("#signUp_page_privacy_agreement"),

            val1 = $("#NickName").val(),
            val2=  $("#Email").val(),
            val3 = $("#pwd").val(),

            checked1 = $caferecomm.prop("checked"),
            checked2 = $privacy.prop("checked"),

            regNickName = /^[가-힣]{3,10}$/,
            regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            regPwd = /^[\w|\-]{6,20}$/;

        console.log(val1);
        console.log(val2);
        console.log(val3);
        console.log(checked1);
        console.log(checked2);

        if(regNickName.test(val1)&&regEmail.test(val2)&&regPwd.test(val3)&&checked1 ==true&&checked2==true){

            $(".btn_signUp_submit").attr("disabled",true);

            $(".btn_signUp_submit").removeAttr("disabled");

            $(".btn_signUp_submit").css("opacity",1);

        }else {

            $(".btn_signUp_submit").attr("disabled",false);

            $(".btn_signUp_submit").css("opacity",0.5);

        }
    }

    $NickName.keyup(check);
    $Email .keyup(check);
    $pwd.keyup(check);
    $caferecomm.click(check);
    $privacy.click(check);
    $allAgree.click(check);


        function agreeAll() {
        var
            $caferecomm = $("#signUp_page_cafereccom_agreement"),
            $privacy = $("#signUp_page_privacy_agreement"),
            $allAgree = $("#signUp_page_agreement"),
            checked1 = $caferecomm.prop("checked"),
            checked2 = $privacy.prop("checked");


        if(checked1==true&&checked2==true){

            $allAgree.prop("checked",true);

        }else{

            $allAgree.prop("checked",false);

        }
    }

    $caferecomm.click(agreeAll);
    $privacy.click(agreeAll);



    // input hidden으로 숨기고 버튼으로 바꿔서 값을 받아옴 type이 1,2로 나뉘기때문에
    $(".btn_signUp_submit").click(function(e){

        var data = $(this).attr("data-no");
        $(".submit").val(data);

    });
