$(function () {
  var id = getSearch('productId');
  console.log(id);


  function getSearch(k) {
    var searchStr = location.search;
    searchStr = decodeURI(searchStr);
    searchStr = searchStr.slice(1);
    var arr = searchStr.split('&');
    var obj = {};
    arr.forEach(function (v, i) {
      var key = v.split('=')[0];
      var value = v.split('=')[1];
      obj[key] = value;
    })
    return obj[k];
  }

  $.ajax({
    type: "GET",
    url: "/product/queryProductDetail",
    data: {
      id: id
    },
    dataType: "json",
    success: function (info) {
      console.log(info);
      var htmlStr = template('proTpl', info);
      $('.mui-scroll').html(htmlStr);
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
      mui('.mui-numbox').numbox();
    }
  });


  $('.lt_main').on('click', '.pro_size span', function () {
    $(this).addClass('current').siblings().removeClass('current');

  });



  $('#add_btn').click(function () {
    var size = $('.pro_size span.current').text();
    if (!size) {
      mui.toast('请选择尺码');
      return;
    }
    var num = $('.pro_num input').val();
    $.ajax({
      type: "POST",
      url: "/cart/addCart",
      data: {
        productId:id,
        num:num,
        size:size
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.error === 400) {
          location.href = 'login.html?retUrl='+location.href;
        }
        if (info.success) {
          mui.confirm('温馨提示','添加成功',['去购物车','继续浏览'],function(e){
            if (e.index === 0) {
              location.href = 'cart.html';
            }
          })
        }
        
      }
    });    
  });


})