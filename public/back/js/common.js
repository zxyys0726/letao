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
      console.log(info);
      if (info.error === 400) {
        location.href = 'login.html';
      }
    }
  });
}