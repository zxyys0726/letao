$(function(){
  var currentPage = 1;
  var pageSize = 5;
  
  
  render();
  function render(){
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page:currentPage,
        pageSize:pageSize
      },
      dataType: "json",
      success: function (info) {        
        var strHtml = template('tpl',info);
        $('tbody').html(strHtml);
        
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

  $('#btnAdd').on('click',function(){
    $('#addModal').modal('show');
  })

  $('#addModal').bootstrapValidator({
  
    //1. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //2. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '一级分类不能为空'
          },
        }
      },
    }
  });
 
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      type: "POST",
      data: $('#form').serialize(),
      success: function( info ) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal("hide");
          // 重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
          currentPage = 1;
          render();

          // 重置表单校验状态和 表单内容
          // 传 true 不仅可以重置 状态, 还可以重置内容
          $('#form').data("bootstrapValidator").resetForm( true );
        }
      }
    })

  })
})