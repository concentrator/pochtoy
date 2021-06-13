(function ($) {
    var dropDown = function (input,options) {
        var div=$('<div class="combo-dropdown" style="display: inline-block" ></div>');


        $(div).css({
            "margin":$(input).css("margin"),
            "margin-left":$(input).css("margin-left"),
            "margin-right":$(input).css("margin-right"),
            "margin-bottom":$(input).css("margin-bottom"),
            "margin-top":$(input).css("margin-top")
        })

        $(input).css({"margin":"",
            "margin-left":"",
            "margin-right":"",
            "margin-bottom":"",
            "margin-top":""
        });

        $(input).after(div);//.append(item);
        div.append(input);
        var ul=$('<ul></ul>').css({position:"absolute",width:$(input).outerWidth()});
        $(input).after(ul);

        var selectedLi=null;
        var prevVal="";

        var keyupCallback;
        this.setCallback=function(callback){
            keyupCallback=callback;
        }

        var kuch=null;

        $(input).bind("keydown",function(e){
            if(e.keyCode==13) {
                if (selectedLi) {
                    selectLi(selectedLi);
                }
            }

        });

        $(input).bind("keyup",function(e){
            if(e.keyCode==38){
                //up
                if(selectedLi==null){
                    selectedLi=ul.find("li:last").addClass("selected");
                }else{
                    if(selectedLi.prev("li").length!=0){
                        selectedLi.removeClass("selected");
                        selectedLi=selectedLi.prev("li").addClass("selected");
                    }
                }
            }else if(e.keyCode==40){
                //down
                if(selectedLi==null){
                    selectedLi=ul.find("li:first").addClass("selected");
                }else{
                    if(selectedLi.next("li").length!=0){
                        selectedLi.removeClass("selected");
                        selectedLi=selectedLi.next("li").addClass("selected");
                    }
                }
            }else{
                if(prevVal==$(this).val()){
                    return;
                }
                ul.hide();
                prevVal=$(this).val();
                clearTimeout(kuch);
                kuch=setTimeout(function(){
                    keyupCallback($(input).val());
                },300);
            }
        })

        $(document.body).click(function(e){
            if($(e.target).closest(div).length==0){
                ul.hide();
            }
        });

        $(ul).delegate("li","click",function(){
            selectLi($(this));
        });

        var selectLi=function($li){
            $(input).val($li.text()).change();
            ul.empty().hide();
            selectedLi=null;
        }

        this.selectLi=selectLi;

        var addItem=function(text){
            var li=$('<li></li>').text(text).appendTo(ul);
        };

        this.addItem=addItem;

        this.setList=function(list){
            selectedLi=null;
            ul.empty().hide();
            if(list.length==1 && list[0]==$(input).val()){
                return;
            }
            list.forEach(function(text){
                addItem(text);
            });
            if(list.length!=0){
                ul.show();
            }
        }

    };
    $.fn.dropDown = function (opt) {
        var options = $.extend(true, {
            test:1
        }, opt);
        return this.each(function () {
            if (!$(this).data('dropDown')) {
                $(this).data('dropDown', new dropDown(this, options));
            }else{
                var dropDownObject=$(this).data('dropDown');
                if(options.action){
                    switch(options.action){
                        case "addItem":
                            if(options.item){
                                dropDownObject.addItem(options.item);
                            }
                            break;
                        case "setList":
                            if(options.list){
                                dropDownObject.setList(options.list);
                            }
                            break;
                        case "setCallback":
                            if(options.callback){
                                dropDownObject.setCallback(options.callback);
                            }
                            break;
                    }
                }
            }
        });
    };
}(jQuery));