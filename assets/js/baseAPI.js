// 注意： 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
$.ajaPrefilter(function(options) {
    options.url = "http://ajax.frontend.itheima.net/" + options.url;


})