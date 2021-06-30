// オプションを指定してSkipprの実行
$(".theTarget").skippr({
  // スライドショーの変化（"fade" or "slide"）
  transition : 'fade',
  // 変化にかかる時間（ミリ秒）
  speed : 1000,
  // easingの種類
  easing : 'easeOutQuart',
  // ナビゲーションの形（"block" or "bubble"）
  navType : 'block',
  // 子要素の種類（"div" or "img"）
  childrenElementType : 'div',
  // ナビゲーション矢印の表示（trueで表示）
  arrows : true,
  // スライドショーの自動再生（falseで自動再生なし）
  autoPlay : true,
  // 自動再生時のスライド切替間隔（ミリ秒）
  autoPlayDuration : 5000,
  // キーボードの矢印キーによるスライド送りの設定（trueで有効）
  keyboardOnAlways : true,
  // 1枚目のスライド表示時に戻る矢印を表示するかどうか [false]:矢印を隠さない [true]:矢印を隠す
  hidePrevious : false
});

$(function() {
  // #back内のaタグがクリックされたときの処理
  $('#back a').on('click',function(event){
    $('body,html').animate({
      scrollTop:0
    }, 800);
    event.preventDefault();
  });
});

$(function(){
  // .menu-triggerクリック時に行われる処理
  $('.menu-trigger').on('click',function(event){
    // 指定されているclass（ここではactive）をトグル処理するメソッド
    $(this).toggleClass('active');
    // フェードイン・フェードアウトを切り替えるメソッド
    $('#sp-menu').fadeToggle();
    event.preventDefault();
  });
});

$('#tab-contents .tab[id != "tab1"]').hide();

$('#tab-menu a').on('click', function(event){
  // イベント発生時に行われる処理
  $("#tab-contents .tab").hide();
  $("#tab-menu .active").removeClass("active");
  $(this).addClass("active");
  $($(this).attr("href")).show();
  event.preventDefault();
});

// 取得したAPIキー
const API_KEY ="1a2503652ce880c2c7dd18e58428d9e0";

$(function(){
  $('#btn').on('click',function(){
    // 入力された都市名でWebAPIに天気情報をリクエスト
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + $('#cityname').val() + "&units=metric&appid=" + API_KEY,
      dateType:'jsonp',
    }).done(function(date){
      //通信成功
      // 位置
      $('#place').text(date.name);
      // 最高気温
      $('#temp_max').text(date.main.temp_max);
      // 最低気温
      $('#temp_min').text(date.main.temp_min);
      // 湿度
      $('#humidity').text(date.main.humidity);
      // 風速
      $('#speed').text(date.wind.speed);
      // 天気
      $('#weather').text(date.weather[0].main);
      // 天気アイコン
      $('#img').attr("src","http://openweathermap.org/img/w/" + date.weather[0].icon + ".png");
      $('#img').attr("alt",date.weather[0].main);
    }).fail(function(date){
      //通信失敗
      alert('通信に失敗しました。');
    });
  });
});