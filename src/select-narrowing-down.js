// 初期値保存用の変数
select_bk = []

$(function(){
  // プルダウン絞り込み用独自イベント
  $.event.special.selectNarrowingDown = {
    setup: function() {
      $(this).bind( "change", function( event ) {

        var _this = $(this).children("select");

        // 選択されているものを配列に格納
        var selected = [];
        _this.each(function(){
          if ($(this).val() !==""){
            selected.push($(this).val());
          }
        });

        _this.each(function(){
          selected_val = $(this).val();

          // 自分所のselectボックスだけ復活させる->選択を元に戻す
          reset_pulldown(_this, _this.index(this));
          $(this).val(selected_val);

          // optionタグの走査
          $(this).children().each(function(){
            // 他で選択されているもの、でも自分ところの選択は消さない
            if($(this).val() !== selected_val && $.inArray($(this).val(), selected) !== -1){
              $(this).remove();
            }
          });
        });

        $(this).trigger("selectNarrowingDown");

        return "aaaa";
      });

      // 初期値待避
      backup_pulldown($(this).children("select"));
    }
  }

});

// 引数で指定した添字のプルダウンを元に戻す
function reset_pulldown(_this, idx){
  _this.eq(idx).html( select_bk[idx]);
}

// 全ての表示用プルダウンを元に戻す(使ってない)
function reset_all_pulldown(_this){
  for (var i = 0; i < select_bk.length; ++i){
    _this.eq(i).html(select_bk[i]);
  }
}

// 初期値待避
function backup_pulldown(_this){
  _this.each(function(){
     select_bk.push($(this).html());
  });
}
