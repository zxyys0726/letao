$(function(){
  $('.category').on('click',function(){
    $('.child').stop().slideToggle();
  })

  $('.icon-menu').on('click',function(e){
    e.preventDefault();
    $('.lt-aside').toggleClass("hidemenu");
    $('.lt-main').toggleClass("hidemenu");
    $('.topbar').toggleClass("hidemenu");
    $('.container-fluid').toggleClass("hidemenu");
  })

  $('.icon-logout').click(function(){
    $('#myModal').modal('show')
  })

  $('.btn-logout').click(function(){
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = 'login.html'
        }
      }
    });
  })
})