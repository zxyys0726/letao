$(document).ajaxStart(function () {
  NProgress.start()
});

$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done()
  }, 500)
});

if (location.href.indexOf('login.html') === -1) {
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function (info) {
      if (info.error === 400) {
        location.href = 'login.html';
      }
    }
  });
}

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
    $('.lt-content').toggleClass("hidemenu");
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
        if (info.success) {
          location.href = 'login.html'
        }
      }
    });
  })
})