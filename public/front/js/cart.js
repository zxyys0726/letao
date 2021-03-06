$(function () {

  function render() {
    setTimeout(function () {
      $.ajax({
        type: "GET",
        url: "/cart/queryCart",
        dataType: "json",
        success: function (info) {
          console.log(info);
          if (info.error === 400) {
            location.href = 'login.html';
          }
          var htmlStr = template('cartTpl', {
            arr: info
          });
          $('#OA_task_2').html(htmlStr);
          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh()
        }
      });
    }, 500)
  }

  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50, //可选,默认50.触发下拉刷新拖动距离,
        auto: true, //可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {
          render();
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });


  $('.lt_main').on('tap', '.btn_delete', function () {
    var id = $(this).data("id");
    console.log(id);
    $.ajax({
      type: "GET",
      url: "/cart/deleteCart",
      data: {
        id: [id]
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        }
      }
    });
  })

  $('.lt_main').on('tap', '.btn_edit', function () {
    var obj = this.dataset;
    var id = obj.id;
    console.log(obj);
    var htmlStr = template('editTpl', obj);
    htmlStr = htmlStr.replace(/\n/g, '');
    mui.confirm(htmlStr, '编辑商品', ['确认', '取消'], function (e) {
      if (e.index === 0) {
        var size = $('.pro_size span.current').text();
        var num = $('.mui-numbox-input').val();
        $.ajax({
          type: "POST",
          url: "/cart/updateCart",
          data: {
            id:id,
            size:size,
            num:num
          },
          dataType: "json",
          success: function (info) {
            console.log(info);
            if (info.success) {
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }

    });
    mui('.pro_num').numbox();


  });

  $('body').on("click", ".pro_size span", function () {
    $(this).addClass("current").siblings().removeClass("current");
  });
})