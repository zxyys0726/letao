$(function () {
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            // 为空时显示的提示信息
            message: "用户名不能为空"
          },
          // 长度要求 2-6 位
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是 2-6 位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  })

  $("[type='reset']").click(function () {
    $('#form').data('bootstrapValidator').resetForm(true);
  })

  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    // console.log(e);
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = 'index.html';
        }
        if (info.error == 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
        if (info.error == 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }

      }
    });

  })
})