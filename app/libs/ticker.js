!function(S){var i={scroll:{scrollType:"continuous",scrollStart:"inside",scrollInterval:20,transitionTime:500},fade:{displayTime:4e3,transitionTime:300},type:{typeInterval:10,displayTime:4e3,transitionTime:300},slide:{slideDistance:100,displayTime:4e3,transitionTime:350}},t={},n={init:function(e){var Q={};return S.extend(Q,{smthNotNeeded:e.smthNotNeeded}),S.extend(Q,t[Q.smthNotNeeded]),S.extend(Q,{effect:e.effect}),S.extend(Q,i[Q.effect]),S.extend(Q,e),this.each(function(){function e(){var e=N.width();w.length&&(e-=w.outerWidth(!0)),W.length&&(e-=W.outerWidth(!0)),x.css("width",e),u=e}function i(){}function t(){m=0,I.children().each(function(){m+=S(this).outerWidth(!0)+1}),I.css("width",m),"scroll"!=Q.effect&&I.children("li:not(:first)").addClass("ticker--hide"),g?(g=!1,Q.autoplay&&(s(),f())):l(),a("first"),Q.refresh&&setTimeout(i,function(e){var i;if("number"==typeof e)i=e;else{var t=e.split(":");t.reverse(),i=parseFloat(t[0]),t[1]&&(i+=60*parseFloat(t[1])),t[2]&&(i+=3600*parseFloat(t[2]))}return 1e3*i}(Q.refresh)),b=!0}function n(e){b&&a(e.data.type)}function a(e){if(!k)switch(k=!0,o(),e){case"first":switch(Q.effect){case"scroll":"outside"==Q.scrollStart&&I.css("margin-left",u),l();break;case"fade":I.children(":first").css({opacity:0}).animate({opacity:1},Q.transitionTime,function(){l()});break;case"type":d(I.children(":first").css({opacity:0}).animate({opacity:1},Q.transitionTime).children("a"));break;case"slide":I.children(":first").css({opacity:0,"margin-left":Q.slideDistance}).animate({opacity:1,"margin-left":0},Q.transitionTime,function(){l()})}k=!1;break;case"prev":switch(Q.effect){case"scroll":if("discontinuous"==Q.scrollType){var i=r(),t=j.length-1;-1==i||0==i?I.animate({"margin-left":u},Q.transitionTime,function(){I.css("margin-left",-m),I.animate({"margin-left":-j[t]},Q.transitionTime,function(){k=!1})}):(n=-j[i-1],I.animate({"margin-left":n},Q.transitionTime,function(){k=!1}))}else I.css({"margin-left":-S(I.children(":last")).outerWidth()}).children(":last").prependTo(I),I.animate({"margin-left":0},Q.transitionTime,function(){k=!1});F.mouseleave(function(){l()});break;case"fade":I.children(":first").animate({opacity:0},Q.transitionTime,function(){S(this).addClass("ticker--hide"),I.children(":last").prependTo(I).removeClass("ticker--hide").css({opacity:0}).animate({opacity:1},Q.transitionTime,function(){l()}),k=!1});break;case"type":I.children(":first").animate({opacity:0},Q.transitionTime,function(){S(this).addClass("ticker--hide"),d(I.children(":last").prependTo(I).removeClass("ticker--hide").css({opacity:0}).animate({opacity:1},Q.transitionTime).children("a")),k=!1});break;case"slide":I.children(":first").animate({opacity:0},Q.transitionTime,function(){S(this).addClass("ticker--hide"),I.children(":last").prependTo(I).removeClass("ticker--hide").css({opacity:0,"margin-left":Q.slideDistance}).animate({opacity:1,"margin-left":0},Q.transitionTime,function(){l()}),k=!1})}break;case"next":switch(Q.effect){case"scroll":var n;if("discontinuous"==Q.scrollType)(i=r())==(t=j.length-1)?I.animate({"margin-left":-m},Q.transitionTime,function(){I.css("margin-left",u),I.animate({"margin-left":0},Q.transitionTime,function(){k=!1})}):(n=-1==i?0:-j[i+1],I.animate({"margin-left":n},Q.transitionTime,function(){k=!1}));else I.animate({"margin-left":-S(I.children(":first")).outerWidth()},Q.transitionTime,function(){I.css("margin-left",0).children(":first").appendTo(I),k=!1});D.mouseleave(function(){l()});break;case"fade":I.children(":first").animate({opacity:0},Q.transitionTime,function(){S(this).addClass("ticker--hide").appendTo(I),I.children(":first").removeClass("ticker--hide").css({opacity:0}).animate({opacity:1},Q.transitionTime,function(){l()}),k=!1});break;case"type":I.children(":first").animate({opacity:0},Q.transitionTime,function(){S(this).addClass("ticker--hide").appendTo(I),d(I.children(":first").removeClass("ticker--hide").css({opacity:0}).animate({opacity:1},Q.transitionTime).children("a")),k=!1});break;case"slide":I.children(":first").animate({opacity:0},Q.transitionTime,function(){S(this).addClass("ticker--hide").appendTo(I),I.children(":first").removeClass("ticker--hide").css({opacity:0,"margin-left":Q.slideDistance}).animate({opacity:1,"margin-left":0},Q.transitionTime,function(){l()}),k=!1})}}}function r(){var e=parseFloat(I.css("margin-left")),i=j.length;if(0<e)return-1;e=Math.abs(e);for(var t=0;t<i-1;t++)if(e>=j[t]&&e<j[t+1])return t;return i-1}function s(){y=!0,p="scroll"==Q.effect?setInterval(function(){if(!k){var e=parseFloat(I.css("margin-left"));I.css("margin-left",e-1),"discontinuous"==Q.scrollType?e<0&&Math.abs(e)>m&&I.css("margin-left",u):e<0&&Math.abs(e)>S(I.children("li")[0]).outerWidth()&&I.css("margin-left",0).children(":first").appendTo(I)}},Q.scrollInterval):setInterval(function(){a("next")},Q.displayTime)}function c(){y=!1,clearInterval(p)}function o(){y&&(T=!0,c())}function l(){T&&!v&&(s(),T=!1)}function d(i){var t=i.html().split(""),n=0;i.html("_");var a=setInterval(function(){var e=i.html().split("_")[0]+t[n++];n!=t.length&&(e+="_"),i.html(e),n==t.length&&(clearInterval(a),l())},Q.typeInterval)}function f(){M.addClass("ticker--pause")}function h(){return!1}var m,u,p,y=!1,T=!1,k=!1,v=!1,g=!0,b=!1,C=S(this),N=C.children(".ticker--body"),w=N.children(".ticker--label"),x=N.children(".ticker--content"),I=x.children("ul"),W=(I.children("li"),N.children(".ticker--controls")),F=W.children(".ticker--prev"),D=W.children(".ticker--next"),M=W.children(".ticker--play");if("scroll"==Q.effect&&C.addClass("ticker--scroll"),w.length&&x.css("left",w.outerWidth(!0)),e(),S(window).resize(e),"discontinuous"==Q.scrollType){var j=[],_=0;I.children().each(function(){j.push(_),_+=S(this).outerWidth()})}x.hover(function(){b&&(o(),v=!0)},function(){b&&(v=!1,l())}),F.mousedown(h).bind("click",{type:"prev"},n),D.mousedown(h).bind("click",{type:"next"},n),M.mousedown(h).click(function(){b&&(y?(c(),M.removeClass("ticker--pause")):(s(),f()))}),"smthNotNeeded1"==Q.smthNotNeeded||"smthNotNeeded2"==Q.smthNotNeeded||t(),C.data("pause",o),C.data("resume",l),C.data("refresh",i)})},pause:function(){return this.each(function(){S(this).data("pause")()})},resume:function(){return this.each(function(){S(this).data("resume")()})},refresh:function(){return this.each(function(){S(this).data("refresh")()})}};S.fn.currencyTicker=function(e){return n[e]?n[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void S.error("Method "+e+" does not exist on jQuery.currencyTicker"):n.init.apply(this,arguments)}}(jQuery);