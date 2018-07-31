$(".wrap_chair_card .fa-star.on").click(function () {

    var $this = $(this);

    alert("해당 좌석을 삭제하시겠습니까?");

    if($this.hasClass("on")) {

        $this.removeClass("on");

        $this.parents(".wrap_chair_card").remove();

    }



});