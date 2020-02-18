$(function () {
    vue_tb_list = new Vue({
        el: '.common_table',
        delimiters: ['[[', ']]'],
        data: {
            category_list: []
        },
        methods: {
            add: function () {
                $('.pop_con').find('h3').html('新增分类');
                $('.input_txt3').val('');
                $('.pop_con').show();
            },
            edit: function (event) {
                //event对象是由js提供的，表示事件对象
                //event.target表示触发事件的页面元素
                var a_edit = $(event.target);
                sId = a_edit.parent().siblings().eq(0).html();
                $('.pop_con').find('h3').html('修改分类');
                $('.input_txt3').val(a_edit.parent().prev().html());
                $('.pop_con').show();
            }
        }
    });
    get_category_list();

    $('.cancel').click(function () {
        $('.pop_con').hide();
        $('.error_tip').hide();
    });

    $('.input_txt3').click(function () {
        $('.error_tip').hide();
    });

    $('.confirm').click(function () {
        var sVal = $('.input_txt3').val();
        if (sVal == '') {
            $('.error_tip').html('输入框不能为空').show();
            return;
        }

        if ($('.pop_con').find('h3').html() == '修改分类') {//修改
            $.post('/admin/news_type_edit', {
                'cid': sId,
                'name': sVal,
                'csrf_token': $('#csrf_token').val()
            }, function (data) {
                if (data.result == 1) {
                    $('.error_tip').html('分类名称已经存在').show();
                } else {
                    get_category_list();
                    $('.cancel').click();
                }
            });
        }
        else {//新增
            $.post('/admin/news_type_add', {
                'name': sVal,
                'csrf_token': $('#csrf_token').val()
            }, function (data) {
                if (data.result == 1) {
                    $('.error_tip').html('分类名称已经存在').show();
                } else {
                    get_category_list();
                    $('.cancel').click();
                }
            });
        }

    })
})

function get_category_list() {
    $.get('/admin/news_type_list', function (data) {
        vue_tb_list.category_list = data.category_list;
    });
}