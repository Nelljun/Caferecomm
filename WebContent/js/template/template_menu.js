/* 메뉴 이미지를 마우스 오버시 */
$(".box_menu_image").mouseover(function () {

    var $this = $(this);

    $this.find(".menu_click").css("display", "block");

});


/* 메뉴 이미지를 마우스 떠날시 */

$(".box_menu_image").mouseleave(function () {

    var $this = $(this);

    $this.find(".menu_click").css("display", "none");

});