$(function(){
  $.ajax({
    type: "GET",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function (info) {
      console.log(info);
      var htmlStr = template('userTpl',info);
      $('.mui-table-view').prepend(htmlStr);
      if (info.error === 400) {
        location.href = 'login.html'
      }
    }
  });

  $('#logout_btn').click(function(){
   $.ajax({
     type: "GET",
     url: "/user/logout",
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