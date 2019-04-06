$(function () {
  $('#login_btn').click(function () {
    var username = $('[type="text"]').val();
    var password = $('[type="password"]').val();
    if (!username) {
      mui.toast('请输入用户名');
      return;
    }
    if (!password) {
      mui.toast('请输入密码');
      return;
    }

    $.ajax({
      type: "POST",
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.error === 403) {
          mui.toast('用户名或密码错误');
          return;
        }
        if (info.success) {
          var retUrl = location.search;
          if (retUrl.indexOf('retUrl') > -1) {
            var retUrl = retUrl.replace('?retUrl=','');
            location.href = retUrl;
          }else{
            location.href = 'user.html';
          }
        }

      }
    });
  })
})