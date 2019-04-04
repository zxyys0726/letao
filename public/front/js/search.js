$(function () {
  // var arr = ['哈哈','拉拉','大大','滴滴'];
  // var jsonStr = JSON.stringify(arr);
  // localStorage.setItem('search_list',jsonStr);

  var historyArr = [];
  render();


  function getHistory() {
    var str = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(str);
    return arr;
  }

  function render() {
    var arr = getHistory();
    var htmlStr = template('tpl', {
      arr: arr
    });
    $('.lt_history').html(htmlStr);
  }

  function setLocalStorage(key, value) {
    var jsonStr = JSON.stringify(value);
    localStorage.setItem(key, jsonStr);
  }

  $('.lt_history').on('click', '.btn_empty', function () {
    mui.confirm('确认要清空搜索记录吗', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        localStorage.removeItem('search_list');
        historyArr = [];
        render();
      }

    })


  })

  $('.btn_search').click(function () {
    var str = $(this).siblings().val();
    if (str.trim() != '') {
      historyArr.unshift(str);
      setLocalStorage('search_list', historyArr);
      render();
      $(this).siblings().val('');
      location.href = 'searchList.html?key='+str;
    }else{
      mui.toast('请输入关键字',{
        duration:2000,
      })
    }

  })

  $('.lt_history').on('click', '.btn_delete', function () {
    mui.confirm('确认要删除此条记录吗', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        var id = $(this).parent().data('id');
        historyArr.splice(id, 1);
        setLocalStorage('search_list', historyArr);
        render();
      }
    }, )

  })

})