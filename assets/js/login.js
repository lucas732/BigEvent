$(function () {
    // 注册tab切换
    $("#link_reg").on("click", function () {
        $(".login_box").hide();
        $(".reg_box").show();
    })

    $("#link_login").on("click", function () {
        $(".reg_box").hide();
        $(".login_box").show();
    })

    // 从layui中获取form对象
    // form.verify 是函数
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //  value是repwd这个效验规则所处input框中的内容  也就是确认密码框
            // 还需要拿到 密码框中的内容 并进行比较
            var pwd = $('.reg_box [name=password]').val();
            if (value !== pwd) {
                return "密码不一致"
            }

        }

    })


    var layer = layui.layer
    // 监听表单提交事件

    $("#form_reg").on("submit", function (e) {
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
                $('#link_login').click()
            }

        })
    })

    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
          }
        })
      })

})