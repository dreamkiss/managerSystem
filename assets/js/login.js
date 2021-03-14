$(function() {

    // 点击 去注册账号 的链接
    $("#link_reg").on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 点击 登陆 的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 从layui 中获取 form对象
    var form = layui.form;
    // 通过form.verify() 函数校验规则
    form.verify({

        // 定义一个 pwd 的校验规则 在 lay-verify 里 通过 ｜ 符号加入校验
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var repwd = $(".reg-box [name=password]").val();
            console.log(" repeat typed value is:", repwd);
            if (repwd != value) {
                return '两次密码不一致';
            }
            return;
        }
    })
    var layer = layui.layer;

    //监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val()
        };
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) {
                layer.msg(res.message);
                return;
            }
            layer.msg("注册成功，请登录！");
            // 模拟人的点击登陆操作
            $("#link_login").click();
        })
    })

    // 监听登陆表单的提交事件
    // $(".login-box").on('submit', function(e) {
    //     e.preventDefault();

    //     var data = {
    //         username: $(".login-box [name=username]").val(),
    //         password: $(".login-box [name=password]").val()
    //     };
    //     // 提交请求
    //     $.post('http://ajax.frontend.itheima.net/api/login', data, function(res) {
    //         if (res.status != 0) {
    //             layer.msg(res.message);
    //         }
    //         layer.msg("登陆成功！");
    //     })
    // })

    $('#form-login').submit(function(e) {

        // 阻止默认行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg("登陆失败！");
                }

                layer.msg('登陆成功！')
                    // 将登陆成功得到的token字符串 , 保存到localStorage

                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }

        })
    })
})