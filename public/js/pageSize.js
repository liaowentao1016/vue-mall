//动态获取屏幕宽度并设置html字体大小
window.onload = function() {
  var itcast = {
    adapter: function() {
      $(window)
        .on("resize", function() {
          //获取当前设备宽度
          var deviceWidth = $(window).width();
          html = $("html");
          //html.css("fontSize", deviceWidth / 7.5);
          if (deviceWidth > 750) {
            deviceWidth = 750;
            html.css("fontSize", deviceWidth / 7.5);
          } else if (deviceWidth < 320) {
            deviceWidth = 320;
            html.css("fontSize", deviceWidth / 7.5);
          } else {
            html.css("fontSize", deviceWidth / 7.5);
          }
        })
        .trigger("resize");
    }
  };
  itcast.adapter();
};
