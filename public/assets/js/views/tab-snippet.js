var TabSnippetView = SnippetView.extend({
  events:{
    "mousedown" : "mouseDownHandler"
  }
  , mouseDownHandler: function(mouseEvent){
    mouseEvent.preventDefault();
    //hide all popovers
    $(".popover").hide();
    $temp = new TempSnippetView({model: this.model.clone()}).render();
    $("body").append($temp).show().on('mousemove', moveTemp);
    centerOnMouse($temp, mouseEvent);
    $("body").on("mousemove", function(mouseEvent){centerOnMouse($temp, mouseEvent);});
  }
});
