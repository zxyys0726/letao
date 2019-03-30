$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template('tpl', info);
        $('tbody').html(htmlStr);

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  var currentId
  var isDelete
  $('tbody').on('click', '.btn', function () {
    $('#user-model').modal('show');
    currentId = $(this).parent().data('id');
    console.log(currentId);
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  })

  $('.btn-confirm').click(function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function (info) {
        if (info.success) {
        $('#user-model').modal('hide');
         render();
        }       
      }
    });
  })

})