$(document).ready(function(){
  $("form").delegate(".component", "mousedown", function(md){
    $(".popover").remove();

    md.preventDefault();
    var tops = [];
    var mouseX = md.pageX;
    var mouseY = md.pageY;
    var $temp;
    var timeout;
    var $this = $(this);
    var delays = {
      main: 0,
      form: 120
    }
    var type;

    if($this.parent().parent().parent().parent().attr("id") === "components"){
      type = "main";
    } else {
      type = "form";
    }

    var delayed = setTimeout(function(){
      if(type === "main"){
        $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this.clone());
      } else {
        if($this.attr("id") !== "legend"){
          $temp = $("<form class='form-horizontal span6' id='temp'></form>").append($this);
        }
      }

      $("body").append($temp);

      $temp.css({"position" : "absolute",
                 "top"      : mouseY - ($temp.height()/2) + "px",
                 "left"     : mouseX - ($temp.width()/2) + "px",
                 "opacity"  : "0.9"}).show()

      var half_box_height = ($temp.height()/2);
      var half_box_width = ($temp.width()/2);
      var $target = $("#target");
      var tar_pos = $target.position();
      var $target_component = $("#target .component");

      $(document).delegate("body", "mousemove", function(mm){

        var mm_mouseX = mm.pageX;
        var mm_mouseY = mm.pageY;

        $temp.css({"top"      : mm_mouseY - half_box_height + "px",
          "left"      : mm_mouseX - half_box_width  + "px"});

        if ( mm_mouseX > tar_pos.left &&
          mm_mouseX < tar_pos.left + $target.width() + $temp.width()/2 &&
          mm_mouseY > tar_pos.top &&
          mm_mouseY < tar_pos.top + $target.height() + $temp.height()/2
          ){
            $("#target").css("background-color", "#fafdff");
            $target_component.css({"border-top" : "1px solid white", "border-bottom" : "none"});
            tops = $.grep($target_component, function(e){
              return ($(e).position().top -  mm_mouseY + half_box_height > 0 && $(e).attr("id") !== "legend");
            });
            if (tops.length > 0){
              $(tops[0]).css("border-top", "1px solid #22aaff");
            } else{
              if($target_component.length > 0){
                $($target_component[$target_component.length - 1]).css("border-bottom", "1px solid #22aaff");
              }
            }
          } else{
            $("#target").css("background-color", "#fff");
            $target_component.css({"border-top" : "1px solid white", "border-bottom" : "none"});
            $target.css("background-color", "#fff");
          }
      });

      $("body").delegate("#temp", "mouseup", function(mu){
        mu.preventDefault();

        var mu_mouseX = mu.pageX;
        var mu_mouseY = mu.pageY;
        var tar_pos = $target.position();

        $("#target .component").css({"border-top" : "1px solid white", "border-bottom" : "none"});

        // acting only if mouse is in right place
        if (mu_mouseX + half_box_width > tar_pos.left &&
          mu_mouseX - half_box_width < tar_pos.left + $target.width() &&
          mu_mouseY + half_box_height > tar_pos.top &&
          mu_mouseY - half_box_height < tar_pos.top + $target.height()
          ){
            $temp.attr("style", null);
            // where to add
            if(tops.length > 0){
              $($temp.html()).insertBefore(tops[0]);
            } else {
              $("#target fieldset").append($temp.append("\n\n\ \ \ \ ").html());
            }
          } else {
            // no add
            $("#target .component").css({"border-top" : "1px solid white", "border-bottom" : "none"});
            tops = [];
          }

        //clean up & add popover
        $target.css("background-color", "#fff");
        $(document).undelegate("body", "mousemove");
        $("body").undelegate("#temp","mouseup");
        $("#target .component").popover({trigger: "manual"});
        $temp.remove();
        genSource();
      });
    }, delays[type]);

    $(document).mouseup(function () {
      clearInterval(delayed);
      return false;
    });
    $(this).mouseout(function () {
      clearInterval(delayed);
      return false;
    });
  });

  var genSource = function(){
    var $temptxt = $("<div>").html($("#build").html());
    //scrubbbbbbb
    $($temptxt).find(".component").attr({"title": null,
      "data-original-title":null,
      "data-type": null,
      "data-content": null,
      "rel": null,
      "trigger":null,
      "style": null});
    $($temptxt).find(".valtype").attr("data-valtype", null).removeClass("valtype");
    $($temptxt).find(".component").removeClass("component");
    $($temptxt).find("form").attr({"id":  null, "style": null});
    $("#source").val($temptxt.html().replace(/\n\ \ \ \ \ \ \ \ \ \ \ \ /g,"\n"));
  }

  //activate legend popover
  $("#target .component").popover({trigger: "manual"});
  //popover on click event
  $("#target").delegate(".component", "click", function(e){
    e.preventDefault();
    $(".popover").hide();
    var $active_component = $(this);
    $active_component.popover("show");
    var valtypes = $active_component.find(".valtype");
    $.each(valtypes, function(i,e){
      var valID ="#" + $(e).attr("data-valtype");
      var val;
      if(valID ==="#placeholder"){
        val = $(e).attr("placeholder");
        $(".popover " + valID).val(val);
      } else if(valID==="#checkbox"){
        val = $(e).attr("checked");
        $(".popover " + valID).attr("checked",val);
      } else if(valID==="#option"){
        val = $.map($(e).find("option"), function(e,i){return $(e).text()});
        val = val.join("\n")
      $(".popover "+valID).text(val);
      } else if(valID==="#checkboxes"){
        val = $.map($(e).find("label"), function(e,i){return $(e).text().trim()});
        val = val.join("\n")
      $(".popover "+valID).text(val);
      } else if(valID==="#radios"){
        val = $.map($(e).find("label"), function(e,i){return $(e).text().trim()});
        val = val.join("\n");
        $(".popover "+valID).text(val);
        $(".popover #name").val($(e).find("input").attr("name"));
      } else if(valID==="#inline-checkboxes"){
        val = $.map($(e).find("label"), function(e,i){return $(e).text().trim()});
        val = val.join("\n")
          $(".popover "+valID).text(val);
      } else if(valID==="#inline-radios"){
        val = $.map($(e).find("label"), function(e,i){return $(e).text().trim()});
        val = val.join("\n")
          $(".popover "+valID).text(val);
        $(".popover #name").val($(e).find("input").attr("name"));
      } else if(valID==="#button") {
        val = $(e).text();
        var type = $(e).find("button").attr("class").split(" ").filter(function(e){return e.match(/btn-.*/)});
        $(".popover #color option").attr("selected", null);
        if(type.length === 0){
          $(".popover #color #default").attr("selected", "selected");
        } else {
          $(".popover #color #"+type[0]).attr("selected", "selected");
        }
        val = $(e).find(".btn").text();
        $(".popover #button").val(val);
      } else {
        val = $(e).text();
        $(".popover " + valID).val(val);
      }
    });

    $(".popover").delegate(".btn-danger", "click", function(e){
      e.preventDefault();
      $active_component.popover("hide");
    });

    $(".popover").delegate(".btn-info", "click", function(e){
      e.preventDefault();
      var inputs = $(".popover input");
      inputs.push($(".popover textarea")[0]);
      $.each(inputs, function(i,e){
      var vartype = $(e).attr("id");
      var value = $active_component.find('[data-valtype="'+vartype+'"]')
      if(vartype==="placeholder"){
        $(value).attr("placeholder", $(e).val());
      } else if (vartype==="checkbox"){
        if($(e).is(":checked")){
          $(value).attr("checked", true);
        }
        else{
          $(value).attr("checked", false);
        }
      } else if (vartype==="option"){
        var options = $(e).val().split("\n");
        $(value).html("");
        $.each(options, function(i,e){
          $(value).append("\n      ");
          $(value).append($("<option>").text(e));
        });
      } else if (vartype==="checkboxes"){
        var checkboxes = $(e).val().split("\n");
        $(value).html("\n      <!-- Multiple Checkboxes -->");
        $.each(checkboxes, function(i,e){
          if(e.length > 0){
            $(value).append('\n      <label class="checkbox">\n        <input type="checkbox" value="'+e+'">\n        '+e+'\n      </label>');
          }
        });
        $(value).append("\n  ")
      } else if (vartype==="radios"){
        var group_name = $(".popover #name").val();
        var radios = $(e).val().split("\n");
        $(value).html("\n      <!-- Multiple Radios -->");
        $.each(radios, function(i,e){
          if(e.length > 0){
            $(value).append('\n      <label class="radio">\n        <input type="radio" value="'+e+'" name="'+group_name+'">\n        '+e+'\n      </label>');
          }
        });
        $(value).append("\n  ")
          $($(value).find("input")[0]).attr("checked", true)
      } else if (vartype==="inline-checkboxes"){
        var checkboxes = $(e).val().split("\n");
        $(value).html("\n      <!-- Inline Checkboxes -->");
        $.each(checkboxes, function(i,e){
          if(e.length > 0){
            $(value).append('\n      <label class="checkbox inline">\n        <input type="checkbox" value="'+e+'">\n        '+e+'\n      </label>');
          }
        });
        $(value).append("\n  ")
      } else if (vartype==="inline-radios"){
        var radios = $(e).val().split("\n");
        var group_name = $(".popover #name").val();
        $(value).html("\n      <!-- Inline Radios -->");
        $.each(radios, function(i,e){
          if(e.length > 0){
            $(value).append('\n      <label class="radio inline">\n        <input type="radio" value="'+e+'" name="'+group_name+'">\n        '+e+'\n      </label>');
          }
        });
        $(value).append("\n  ")
          $($(value).find("input")[0]).attr("checked", true)
      } else if (vartype === "button"){
        var type =  $(".popover #color option:selected").attr("id");
        $(value).find("button").text($(e).val()).attr("class", "btn "+type);
      } else {
        $(value).text($(e).val());
      }
    $active_component.popover("hide");
    genSource();
    });
    });
  });
  $("#navtab").delegate("#sourcetab", "click", function(e){
    genSource();
  });
});
