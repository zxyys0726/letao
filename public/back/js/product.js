$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var picArr = [];
  render();

  function render() {
    $.ajax({
      type: "GET",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        var htmlStr = template('productTpl', info);
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

  $('#btnAdd').click(function () {
    $('#addModal').modal('show');
    $.ajax({
      type: "GET",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (response) {
        var htmlStr = template('dropTpl', response);
        $('.dropdown-menu').html(htmlStr)
      }
    });

  })

  $('.dropdown-menu').on('click', 'a', function () {
    var text = $(this).text();

    $('.drop-txt').text(text);
    var id = $(this).attr('data-id');
    $('[name="brandId"]').val(id);
    var validator = $("#form").data('bootstrapValidator');
    validator.updateStatus('brandId', "VALID");
  })

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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          },
        }
      },
      picStatu: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择三张图片'
          },
        }
      },


      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          },
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          },
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须为非零数字'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺码必须为XX-XX格式，例如32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          },
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品价格'
          },
        }
      },
    }

  });

  $("#inputImg").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      picArr.unshift(data.result);
      $('.img-box').prepend('<img src="' + data.result.picAddr + '" width="100" alt="">');
      if (picArr.length > 3) {
        picArr.pop();
        // $('.img-box img:last-of-type').remove();
        $('.img-box img').eq(-1).remove();
      }

      if (picArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picStatu', 'VALID');
        
      }




    }
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    
    var formSerialize = $('#form').serialize();
    formSerialize +=  '&picAddr1='+picArr[0].picAddr+'&picName1='+picArr[0].picName;
    formSerialize +=  '&picAddr2='+picArr[1].picAddr+'&picName2='+picArr[0].picName;
    formSerialize +=  '&picAddr3='+picArr[2].picAddr+'&picName3='+picArr[0].picName;
    
    
    
    $.ajax({
      url: "/product/addProduct",
      type: "post",
      data: formSerialize,
      success: function( info ) {
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal("hide");
          // 重置校验状态和文本内容
          $('#form').data("bootstrapValidator").resetForm(true);
          // 重新渲染第一页
          currentPage = 1;
          render();

          // 手动重置, 下拉菜单
          $('.dropdown-menu').text("请选择二级分类")

          // 删除结构中的所有图片
          $('.img-box img').remove();
          // 重置数组 picArr
          picArr = [];

        }
      }
    })
  });




})