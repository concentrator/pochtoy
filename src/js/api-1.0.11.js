let api = new function() {
    let apiRequest = this.apiRequest = function(action, data, callback) {
        data.ajax = 1;
        data.action = action;

        return $.post("/ajax/", data, function(jsonData) {
            callback(jsonData);
        }, "json")
            .fail(function(e) {
                data.originalAction = data.action;
                data.action = "logError";
                data.responseText = e.responseText;

                if (data.responseText !== "") {
                    $.post("/ajax/", data, function(){});
                    showAlert("warning", "Ошибка на стороне сервера");
                }
            });
    };

    this.createUSAPack=function(data,callback){
        apiRequest('createUSAPack',{data:data},callback);
    };

    this.getPassportCountries=function(callback){
        apiRequest('getPassportCountries',{},callback);
    };

    this.getUSAds=function(callback){
        apiRequest("getUSAds",{},callback);
    };

    this.isPassportNeeded=function(ds,callback){
        apiRequest("isPassportNeeded",{ds:ds},callback);
    };

    this.getDeclarationFields=function(ds,callback){
        apiRequest("getDeclarationFields",{ds:ds},callback);
    };

    /**

     * @param postid
     * @param vote
     * @param callback
     */
    this.setVote=function(postid,vote,callback){
        apiRequest("setVote",{postid:postid,vote:vote},callback);
    };

    this.ZipLookup=function(zip,callback){
        apiRequest("ZipLookup",{zip:zip},callback);
    };

    this.fbm_calc=function(zip, weight, service, pack_type, callback){
        apiRequest("fbm_calc",{zip:zip,weight:weight,service:service,pack_type:pack_type},callback);
    };

    this.registration=function(email,password,name,surname,g_recaptcha_response,success,mailExists,mailError){
        apiRequest("registration",{email:email,password:password,name:name,surname:surname,g_recaptcha_response:g_recaptcha_response},function(data){
            if(data.status==="ok"){
                return success();
            }
            if(data.status==="error"){
                if(data.code==="email_exists"){
                    return mailExists();
                }
                if(data.code==="email_error"){
                    return mailError();
                }
            }
        });
    };

    this.GoogleSignIn=function(token,callback){
        apiRequest("GoogleSignIn",{token:token},callback);
    };

    this.FBSignIn=function(token,userid,callback){
        apiRequest("FBSignIn",{token:token,userid:userid},callback);
    };

    this.login = function(email, password, g_recaptcha_response, success, authentificationFail) {
        apiRequest('login', {email: email, password: password, g_recaptcha_response: g_recaptcha_response}, function(data) {
            if (data.status === 'ok') {
                return success();
            } else {
                return authentificationFail(data);
            }
        });
    };

    this.getRegions=function(country,success,no_regions){
        apiRequest("getRegions",{country:country},function(data){
            if(data.status==="ok"){
                if(data.regions.length===0){
                    no_regions();
                }else{
                    success(data.regions);
                }
            }
        })
    };

    this.addOrderFromLanding=function(url,name,price,callback){
        apiRequest('addOrderFromLanding',{url:url,name:name,price:price},callback);
    };

    this.getCitiesList=function(country,region,cityPart,success){
        apiRequest("getCitiesList",{country:country,region:region,city:cityPart},success);
    };

    this.getCities=function(country,region,success,no_cities){
        apiRequest("getCities",{country:country,region:region},function(data){
            if(data.status==="ok"){
                if(data.cities.length===0){
                    no_cities();
                }else{
                    success(data.cities);
                }
            }
        })
    }

    var _calc=false;

    this.cmpCalc=function(weight,country,region,city,zipCode,weightUnit,x,y,z,vaQty,saSum,saShip,ins,success){
        if(_calc) return;
        $(".calc-include input").attr("disabled",'disabled');
        _calc=true;
        apiRequest("calculate",{sp:1,weight:weight,country:country,city:city,zip:zipCode,weightUnit:weightUnit,region:region,x:x,y:y,z:z,vaQty:vaQty,saSum:saSum,saShip:saShip,ins:ins},function(data){
            success(data);
            _calc=false;
            $(".calc-include input").removeAttr("disabled");
        });
    };

    /** размеры в ДЮЙМАХ */
    this.calculate=function(weight,country,region,city,zipCode,weightUnit,x,y,z,vaQty,saSum,saShip,ins,success){
        if(_calc) return;
        // $(".calc-include input").attr("disabled",'disabled');
        _calc=true;
        apiRequest("calculate",{weight:weight,country:country,city:city,zip:zipCode,weightUnit:weightUnit,region:region,x:x,y:y,z:z,vaQty:vaQty,saSum:saSum,saShip:saShip,ins:ins},function(data){
            success(data);
            _calc=false;
            $(".calc-include input").removeAttr("disabled");
        }).error(function(){
            _calc=false;
        });
    };

    this.moreReviews=function(page,success){
        apiRequest("moreReviews",{page:page},success);
    };

    this.closeNews=function(id){
        apiRequest("closeNews",{newsid:id});
    };

    this.getDomain=function(url,success){
        apiRequest("getDomain",{url:url},success);
    };

    this.getPvzCities=function(ds,success){
        apiRequest('getPvzCities',{ds:ds},success);
    };

    this.getPvzForCity=function(city,ds,success){
        apiRequest('getPvzForCity',{city:city,ds:ds},success)
    };

    this.getPvzForGeo=function(lat1,lat2,lng1,lng2,ds,callback){
        apiRequest("getPvzForGeo",{lat1:lat1,lat2:lat2,lng1:lng1,lng2:lng2,ds:ds},callback);
    };

    this.translit=function(text){
        //text=text.toUpperCase();
        var sootv={};
        sootv["А"]="A";
        sootv["Б"]="B";
        sootv["В"]="V";
        sootv["Г"]="G";
        sootv["Д"]="D";
        sootv["Е"]="E";
        sootv["Ё"]="YO";
        sootv["Ж"]="ZH";
        sootv["З"]="Z";
        sootv["И"]="I";
        sootv["Й"]="Y";
        sootv["К"]="K";
        sootv["Л"]="L";
        sootv["М"]="M";
        sootv["Н"]="N";
        sootv["О"]="O";
        sootv["П"]="P";
        sootv["Р"]="R";
        sootv["С"]="S";
        sootv["Т"]="T";
        sootv["У"]="U";
        sootv["Ф"]="F";
        sootv["Х"]="KH";
        sootv["Ц"]="TC";
        sootv["Ч"]="CH";
        sootv["Ш"]="SH";
        sootv["Щ"]="SHC";
        sootv["Ъ"]="";
        sootv["Ы"]="Y";
        sootv["Ь"]="";
        sootv["Э"]="E";
        sootv["Ю"]="YU";
        sootv["Я"]="YA";

        var mgk={};
        mgk["А"]=1;
        mgk["Б"]=0;
        mgk["В"]=0;
        mgk["Г"]=0;
        mgk["Д"]=0;
        mgk["Е"]=2;
        mgk["Ё"]=1;
        mgk["Ж"]=0;
        mgk["З"]=0;
        mgk["И"]=1;
        mgk["Й"]=1;
        mgk["К"]=0;
        mgk["Л"]=0;
        mgk["М"]=0;
        mgk["Н"]=0;
        mgk["О"]=1;
        mgk["П"]=0;
        mgk["Р"]=0;
        mgk["С"]=0;
        mgk["Т"]=0;
        mgk["У"]=1;
        mgk["Ф"]=0;
        mgk["Х"]=0;
        mgk["Ц"]=0;
        mgk["Ч"]=0;
        mgk["Ш"]=0;
        mgk["Щ"]=0;
        mgk["Ъ"]=1;
        mgk["Ы"]=1;
        mgk["Ь"]=1;
        mgk["Э"]=1;
        mgk["Ю"]=2;
        mgk["Я"]=2;
        var res="";
        for(var i=0;i<text.length;i++){
            var key=text.substr(i,1);
            var uKey=key.toUpperCase();
            if( uKey in  sootv){
                if(key==="Е" && (i===0 || mgk[text.substr(i-1,1)])!==0){
                    if(key===uKey) {
                        res += "YE";
                    }else{
                        res += "ye";
                    }
                }else{
                    if(key===uKey) {
                        res += sootv[uKey];
                    }else{
                        res += sootv[uKey].toLowerCase();
                    }
                }
            }else{
                res+=text.substr(i,1);
            }
        }

        return res;
    }

    this.findInFaq=function(text,callback){
        apiRequest("findInFaq",{text:text},callback);
    }

    this.restorePassword=function(email,success){
        apiRequest("restorePassword",{email:email},success);
    }

    this.getPostsNextPage=function(page,category_id,success){
        apiRequest('getPostsNextPage',{page:page,category_id:category_id},success);
    };

	this.getSuperFastCountries=function(callback){
        apiRequest('getSuperFastCountries',{},callback);
    }

	this.getDeclLimitByCountry=function(country,callback){
        apiRequest('getDeclLimitByCountry',{country:country},callback);
    }

	this.getDeliveryServicesByCountry=function(country,callback){
        apiRequest('getDeliveryServicesByCountry',{country:country},callback);
    }

	this.sendTgMessage=function(message,callback){
		apiRequest('sendTgMessage',{message:message},callback);
    };

    this.getCurrency=function(callback){
		apiRequest('getCurrency', {}, callback);
    };

	this.setUtmDirect = function(no_history, callback) {
        apiRequest('setUtmDirect', {no_history: no_history}, callback);
    };

    this.getReviews=function(from,count,success){
        apiRequest("getReviews",{from:from,count:count},success);
    };

    this.getReviewsBlock=function(from,count,success){
        apiRequest("getReviewsBlock",{from:from,count:count},success);
    };

    this.rmGetCities = function(callback) {
        apiRequest('rmGetCities', {}, callback);
    }

    this.rmGetReviews = function(city, callback) {
        apiRequest('rmGetReviews', {city: city}, callback);
    }

    this.getCBRFCurrencies = function(callback) {
        apiRequest('getCBRFCurrencies', {}, callback);
    }

    this.getGoodsInPage = function (page,perPage,filter,order,listGoods){
        apiRequest('getGoodsInPage', {page:page,perPage:perPage,filter:filter,order:order}, listGoods);
    }

    this.checkSoldGarageSale = function (listGoods,soldGoods){
        apiRequest('checkSoldGarageSale', {goods:listGoods}, soldGoods);
    }
}
