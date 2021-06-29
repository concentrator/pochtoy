var start = true;
var calcLbWeight = 0;
var $button = $("#calc-form").find(".btn");

$("#city,#package-weight").on("click", function () {
    $(this).select();
});

$("#zip").on('input', function () {
    $(".weight-range").trigger('change');
});

var wrth = null;

function calculate() {
    var weight = parseFloat($("#package-weight").val().replace(",", "."));
    if ($(".package-weight").val() === 'kg') {
        weight = weight * 2.20462;
    }

    var country = $("#country").val();
    var region = $("#region").val();
    var city = $("#city").val();
    var zip = $("#zip").val();

    $(".dservice-price").addClass('loading').text("...");
    api.calculate(weight, country, region, city, zip, 'lb', 0, 0, 0, 1, 0, 0, 0, function (result) {
        $(`.delivery-services`).show()
        $(".calc-output .dservice .dservice-price").show();
        $(".calc-output .dservice .busy").hide();
        $(".calc-output .dservice").data({price: 0}).hide().each(function () {
            var ds = $(this).attr("data-ds");
            if (result[ds]) {
                $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").text("$" + result[ds]).removeClass('loading');
                $(".dservice-details." + ds + " .price").text("$" + result[ds]);

                if( ds === 'sdek_sf' && 'bb_sf' in result ){
                    $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").prev('.dservice-card__price--old').text("$" + result['bb_sf'])
                }
                else if( ds === 'sdek' && 'bb_lc' in result ){
                    $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").prev('.dservice-card__price--old').text("$" + result['bb_lc'])
                }else{
                    $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").removeClass('dservice-card__price--new').prev('.dservice-card__price--old').hide();
                }
            } else {
                $(".dservice-details." + ds).hide();
            }
        });
        $("ul.delivery-services li").hide();
        $(".calc-col [data-ds]").hide()
        for (var ds in result) {
            $("ul.delivery-services li[data-ds=" + ds + "]").css({display: "inline-block"});
            $(".calc-result .price[data-ds=" + ds + "]").text("$" + result[ds]);
        }
        $("ul.delivery-services li:visible:first").click();

        var sort_array = [];

        for (var ds in result) {
            sort_array.push({ds: ds, price: parseFloat(result[ds])});
        }

        sort_array = sort_array.filter((el) => !isNaN(el.price))

        sort_array.sort(function (ds1, ds2) {
            return ds1.price - ds2.price
        });

        var $prev = $(".dservices-head");

        sort_array.forEach(function (item) {
            var $elem = $(".dservice[data-ds=" + item.ds + "]");
            if ($elem.length != 0) {
                $elem.insertAfter($prev);
                $prev = $elem;
            }
        });

        selectCheap()
    })
}

$(".calculate-btn").click(function () {
    var weight = parseFloat($("#package-weight").val().replace(",", "."));

    if ($(".package-weight").val() === 'kg') {
        weight = weight * 2.20462;
    }

    var country = $("#country").val();
    var region = $("#region").val();
    var city = $("#city").val();
    var zip = $("#zip").val();

    $(".dservice-price").addClass('loading').text("...");

    api.calculate(weight, country, region, city, zip, 'lb', 0, 0, 0, 1, 0, 0, 0, function (result) {
        $(".calc-output .dservice .dservice-price").show();
        $(".calc-output .dservice .busy").hide();
        $(".calc-output .dservice").data({price: 0}).hide().each(function () {
            var ds = $(this).attr("data-ds");
            if (result[ds]) {
                $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").text("$" + result[ds]).removeClass('loading');
                $(".dservice-details." + ds + " .price").text("$" + result[ds]);

                if( ds === 'sdek_sf' && 'bb_sf' in result ){
                    $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").prev('.dservice-card__price--old').text("$" + result['bb_sf'])
                }
                else if( ds === 'sdek' && 'bb_lc' in result ){
                    $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").prev('.dservice-card__price--old').text("$" + result['bb_lc'])
                }else{
                    $(this).show().data({price: parseFloat(result[ds])}).find(".dservice-price").removeClass('dservice-card__price--new').prev('.dservice-card__price--old').hide();
                }
            } else {
                $(".dservice-details." + ds).hide();
            }
        });
        $("ul.delivery-services li").hide();
        $(".calc-col [data-ds]").hide()
        for (var ds in result) {
            $("ul.delivery-services li[data-ds=" + ds + "]").css({display: "inline-block"});
            $(".calc-result .price[data-ds=" + ds + "]").text("$" + result[ds]);
        }
        $("ul.delivery-services li:visible:first").click();

        var sort_array = [];
        for (var ds in result) {
            sort_array.push({ds: ds, price: parseFloat(result[ds])});
        }

        sort_array.sort(function (ds1, ds2) {
            return ds1.price - ds2.price;
        });

        var $prev = $(".dservice:first");
        sort_array.forEach(function (item) {
            var $elem = $(".dservice[data-ds=" + item.ds + "]");

            if ($elem.length != 0) {
                $elem.insertAfter($prev);
                $prev = $elem;
            }
        });

        selectCheap();
    });
});

function selectCheap() {
    let cheapestDs = '',
        cheapestValue = Infinity;

    $('.delivery-services li:visible').each(function (i, el) {
        let cds = $(el).data('ds'),
            cval = parseFloat($('.ddetails-data.price[data-ds="${cds}"]').text().replace('$', ''));

        if (cheapestValue > cval && cval != 0) {
            cheapestValue = cval;
            cheapestDs = cds;
        }
    })
    if (cheapestDs != '') {
        $(`.delivery-services li:visible[data-ds=${cheapestDs}]`).click();
    }
}

$(".package-weight").change(function () {
    $(".weight-range").change().trigger('input');
});

$("#package-weight").on('input', function () {
    var val = $(this).val();
    val = val.replace(",", ".");
    val = parseFloat(val);
    if (isNaN(val)) return;
    var weightType = $(".package-weight").val();
    if (weightType === 'kg') {
        calcLbWeight = val * 2.20462;
        calcLbWeight = Math.round(calcLbWeight * 100) / 100;
    } else {
        val = val / 2.20462;
        val = Math.round(val * 100) / 100;
        calcLbWeight = val;
    }

    $(".weight-range").val(val).trigger('change');
});

$(".weight-range").on('input', function (e) {
    var kg = $(this).val();

    if (parseFloat($(this).val()) > 14.5) {
        kg = parseFloat($(this).val()) - 0.5;
    }

    // console.log("Script: " + $(this).val());

    var lb = kg * 2.20462;
    calcLbWeight = lb;
    lb = Math.round(lb * 100) / 100;
    var weightType = $(".package-weight").val();
    if (weightType === 'kg') {
        $("#package-weight").val(kg);
    } else {
        $("#package-weight").val(lb);
    }
}).trigger('input');

$("select#country").change(function () {
    var country = $(this).val();
    var cities = {};
    if ($('#lang_page').val() == 'en')
        cities = {'RU': 'Moscow', 'UA': 'Kiev', 'BY': 'Minsk', 'KZ': 'Astana'};
    else
        cities = {'RU': 'Москва', 'UA': 'Киев', 'BY': 'Минск', 'KZ': 'Астана'};
    var regions = {
        'RU': 'Московская область',
        'UA': 'Киевская область',
        'BY': 'Минская область',
        'KZ': 'Акмолинская область'
    };
    console.log("select#country change");
    console.log(cities);
    if (country in cities) {

        $("#city").val(cities[country]);
        $("#region").val(regions[country]);
    } else {
        $("#city,#region").val('');
    }


    var $region = $("#region").html('<option>...</option>').attr("disabled", "disabled");

    // api.getRegions($(this).val(), function (regions) {

    //     $region.find("option").remove();
    //     regions.forEach(function (region) {
    //         $('<option></option>').appendTo($region).text(region).attr("value", region);
    //     });
    //     $region.removeAttr("disabled");
    //     var calc_region = $("#calc_region").val();
    //     $("select#region option").filter(function () {
    //         return $(this).text() == calc_region;
    //     }).prop('selected', true);

    //     $("select#region").change();


    // }, function () {


    //     $button.removeAttr("disabled");
    // });

    $(".weight-range").change();

}).change();

$("select#region").change(function () {

}).change();

$("#city").dropDown()
    .dropDown({
        action: "setCallback", callback: function (city) {
            if (city.length < 3) return;
            var country = $("#country").val();
            var region = $("#region").val();

            // alert(lang);
            api.getCitiesList(country, region, city, function (data) {
                $("#city").dropDown({action: "setList", list: data.cities});
            });
        }
    }).change(function () {
    var arr = $(this).val().split("(");
    if (arr.length > 1) {
        $(this).val(arr[0].trim()).change();
        $("#region").val(arr[1].split(")")[0]).change();
    }
    $(".weight-range").change();
});

var calc_init = false;

$("#calc-form").submit(function (e) {
    e.preventDefault();


});


//Расчёт ширины, высоты и длины
$(".btn-calc-dimensions").click(function (e) {

    let $target = $(e.target);

    var $dservice = $target.closest('.dservice-card.dservice');
    var ds = $dservice.attr("data-ds");

    var weight = parseFloat($("#package-weight").val().replace(",", "."));
    if ($(".package-weight").val() === 'kg') {
        weight = weight * 2.20462;
    }

    var country = $("#country").val();
    var region = $("#region").val();
    var city = $("#city").val();
    var zip = $("#zip").val();

    var width = $dservice.find(".width-input").val();
    var heigth = $dservice.find(".height-input").val();
    var length = $dservice.find(".length-input").val();

    var reg = /[^0-9,.]+/;

    if( reg.test(width) || reg.test(heigth) || reg.test(length) ){
        e.preventDefault();
        showAlert('Введите корректные данные');
        return false;
    }

    $dservice.find(".dservice-price").addClass('loading').text("...");

    api.calculate(weight, country, region, city, zip, 'lb', width, heigth, length, 1, 0, 0, 0, function (result) {

        $dservice.data({price: 0});
        if (result[ds]) {
            $dservice.show().data({price: parseFloat(result[ds])}).find(".dservice-price").text("$" + result[ds]).removeClass('loading');
            $(".dservice-details." + ds + " .price").text("$" + result[ds]);

        } else {
            showAlert('Введите другие значения');
            $(".dservice-details." + ds).hide();
        }

        $("ul.delivery-services li[data-ds=" + ds + "]").css({display: "inline-block"});
        $(".calc-result .price[data-ds=" + ds + "]").text("$" + result[ds]);

    })

});



$(".dimensions-calc-btn").click(function () {
    $("#calc-form").submit();
});

$(".service-details-show").click(function () {
    $(this).closest(".delivery-service").find(".details").toggle();
});

function buildDetailsTable(weight, weightUnit, deliveryPrice) {
    var $table = $("<table></table>").addClass("all-services-table");
    var $tbody = $("<tbody></tbody>").appendTo($table);
    var $tr = $("<tr></tr>").appendTo($tbody);
    $tr.append('<td class="service-col"><span>Вес посылки:</span></td>');
    $("<span></span>").text(weight + " " + weightUnit).appendTo($('<td class="service-price-col"></td>').appendTo($tr));

    $tr = $("<tr></tr>").appendTo($tbody);
    $tr.append('<td class="service-col"><span>Прием входящих посылок:</span></td>');
    $("<span></span>").text("$1").appendTo($('<td class="service-price-col"></td>').appendTo($tr));

    $tr = $("<tr></tr>").appendTo($tbody);
    $tr.append('<td class="service-col"><span>Объединение посылок:</span></td>');
    $("<span></span>").text("$0").appendTo($('<td class="service-price-col"></td>').appendTo($tr));

    $tr = $("<tr></tr>").appendTo($tbody);
    $tr.append('<td class="service-col"><span>70 дней хранения:</span></td>');
    $("<span></span>").text("$0").appendTo($('<td class="service-price-col"></td>').appendTo($tr));

    $tr = $("<tr></tr>").appendTo($tbody);
    $tr.append('<td class="service-col"><span>Стоимость доставки:</span></td>');
    $("<span></span>").text("$" + deliveryPrice).appendTo($('<td class="service-price-col"></td>').appendTo($tr));

    $tr = $("<tr></tr>").appendTo($tbody);
    $tr.append('<td class="service-col"><span>Упаковочные материалы:</span></td>');
    $("<span></span>").text("$0").appendTo($('<td class="service-price-col"></td>').appendTo($tr));

    $tr = $("<tr></tr>").appendTo($tbody);
    $tr.append('<td class="service-col"><span>Итого:</span></td>');
    $("<span></span>").text("$" + deliveryPrice).appendTo($('<td class="service-price-col"></td>').appendTo($tr));

    return $table;
}


$("input[name='calc-type']").change(function () {
    $(".calc-details").hide();
    var calcType = $(this).val();
    if (calcType == 'general-calc') {
        $("#va-packs-qty,#sa-sum,#sa-shipping").val("0").closest("span.field").hide();
    } else if (calcType == 'va-calc') {
        $("#va-packs-qty").closest("span.field").show();
        $("#sa-sum,#sa-shipping").val("0").closest("span.field").hide();
    } else if (calcType == 'sa-calc') {
        $("#va-packs-qty").val("0").closest("span.field").hide();
        $("#sa-sum,#sa-shipping").closest("span.field").show();
    }
});
