$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      dataType: "json",
      success: function (info) {
        
        var htmlStr = template('secondTpl',info);
        $('tbody').html(htmlStr);
        
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    });
  }

  $('#btnAdd').click(function(){
    $('#addModal').modal('show');
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page:1,
        pageSize:100
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template('dropTpl',info);
        $('.dropdown-menu').html(htmlStr);
      }
    });
  })

  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('.dropTxt').text(txt);
    var id = $(this).attr('data-id');
    $('[name="categoryId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });



  $("#inputImg").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var url = data.result.picAddr;
      $('#img-box img').attr('src',url);
      $('[name="brandLogo"]').val(url);
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
});

$('#form').bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    brandName: {
      validators: {
        //不能为空
        notEmpty: {
          message: '品牌名称不能为空'
        },
        //长度校验
      }
    },
    categoryId: {
      validators: {
        //不能为空
        notEmpty: {
          message: '一级分类不能为空'
        },
        //长度校验
      }
    },
    brandLogo: {
      validators: {
        //不能为空
        notEmpty: {
          message: '图片不能为空'
        },
        //长度校验
      }
    },
  }

});

$("#form").on('success.form.bv', function (e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    type: "post",
    url: "/category/addSecondCategory",
    data: $('#form').serialize(),
    dataType: "json",
    success: function (info) {
      console.log(info);
      if (info.success) {
        $('#addModal').modal('hide');
        currentPage = 1;
        render();
        $("#form").data('bootstrapValidator').resetForm(true);
        $('.dropTxt').text("请选择1级分类")
        // 找到图片重置
        $('#img-box img').attr("src", "")

      }
    }
  });
});
  
})