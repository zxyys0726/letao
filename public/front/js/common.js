$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false
  });
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
  });
// 用于解析地址栏参数
  function getSearch(k){
    var searchStr = location.search;
    searchStr = decodeURI(searchStr);
    searchStr = searchStr.slice(1);
    var arr = searchStr.split('&');
    var obj = {};
    arr.forEach(function(v,i){
      var key = v.split('=')[0];
      var value = v.split('=')[1];
      obj[key] = value;
    })
    return obj[k];
  }

})