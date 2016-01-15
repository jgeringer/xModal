/*
  xModal Plugin: By Joe Geringer (Nansen)
  https://github.com/jgeringer/xModal
*/

(function ($) {
    $.fn.xModal = function (options) {

      var $mMarkup = $('<div class="modal-wrapper"><div><div></div></div></div>'),
          $mInnerWrapper = $mMarkup.find('>*'),
          $mContentContainer = $mMarkup.find('>*>*'),
          $mContent = $('<div/>');

      var settings = $.extend({
          width: "75%",
          headline: "",
          description: "",
          href:"",
          effect:"puff",
          html:"",
          onLoadingStart:"",
          onLoadingDone:"",
          onCloseStart:"",
          onCloseDone:""
      }, options);

      function bindEvents(){
        var closer = function(e){
          if (e) {
              log('event:' + e);
          } else {
              log("this didn't come from an event!");
          }
          
          if(settings.onCloseStart){
            settings.onCloseStart();
          }

          $($mMarkup).removeClass(settings.effect+'In').addClass(settings.effect+'Out');
          setTimeout(function () {
              $($mMarkup).removeClass('active').removeClass(settings.effect+'Out');
              $mContentContainer.empty();
              $($mMarkup).remove();
              
              if(settings.onCloseDone){
                settings.onCloseDone();
              }
              
          }, 1000);

          //unbind the keyup event
          $(document).off('keyup.xModalEscape');
          $(document).off('close.xModalCloseBody');
        }

        $(document).on('keyup.xModalEscape', function (e) {
            log('e.which:'+ e.which);
            if (e.which == '27') {
              log('you hit escape');
              closer(e);
            }
        });

        $(document).off('click.xModalClose', '.closeModal').on('click.xModalClose', '.closeModal', function () {
          log('you clicked the close icon');
          closer();
        });

        $(document).off('click.xModalCloseBody', '.modal-wrapper').on('click.xModalCloseBody', '.modal-wrapper', function (e) {
          log('clicked on this: '+ e.target);
          if($(e.target).is('.modal-wrapper')) closer();
        });
        
        //apply loading complete:  get the duration from css          
        var element = $('.modal-wrapper')[0],
            style = window.getComputedStyle(element),
            duration = style.getPropertyValue('-webkit-animation-duration'),
            stripped = duration.slice(0,-1),
            finaltime = stripped * 1000;
        
        setTimeout(function(){
            loadingComplete();
        }, finaltime);
        
      }

      function ajaxService(path, callback){
        $.ajax({
          url: path,
          success: function (data) {
            log('success');
            callback(data);
          },
          error: function (err) {
            log('error');
            //callback(err);
            callback($('<div>ERROR</div>'));
          },
          complete: function(){
            doStyling();
          }
        });
      }


      if(!this.selector) {
        loadingStart();
        log('this is not a selector.');

        //inject content here
        if(settings.href){
            log('you gotta path foooooo!!!!!!!!!! ' + settings.href);
            ajaxService(settings.href, function(data){
              $(data).prependTo($mContentContainer);
            });
        }

        if(settings.headline || settings.description){
          if(settings.headline){
              $("<h1>" + settings.headline + "</h1>").appendTo($mContent);
          }
          if(settings.description){
              $("<p>" + settings.description + "</p>").appendTo($mContent);
          }
          doStyling();
        }

        if(settings.html){
          $(settings.html).appendTo($mContent);
          doStyling();
        }

        if(settings.img){
          // console.log('loading...');
          // $("<img src="+settings.img+">").on('load', function(){
          //   console.log('loaded');
          //     $(this).appendTo($mContent);
          // });

          function loadSprite(src) {
              var deferred = $.Deferred(),
                  sprite = new Image();

              sprite.onload = function() {
                  deferred.resolve();
              };
              sprite.src = src;
              return deferred.promise();
            }

            var loaders = [];

            loaders.push(loadSprite(settings.img));

            $.when.apply(null, loaders).done(function() {
                // callback when everything was loaded
                log('done');
                $("<img src="+settings.img+">").appendTo($mContent);
                doStyling();
            });
        }

        
        return;

      }
      
      function doStyling(){
          log('Doing the styling::::'+ $mContent);
          
          $mContent.prependTo($mContentContainer);
          $mMarkup.appendTo('body');

          var $mCH = $mContentContainer.height();

          $mInnerWrapper.find('.closeModal').remove();
          $('<a class="closeModal icon-close"></a>').prependTo($mInnerWrapper);
          $mInnerWrapper.width(settings.width);
          $mInnerWrapper.height($mCH);
          $mInnerWrapper.css({
            'margin-top' : -($mCH/2) + 'px'
          });

          $($mMarkup).addClass('active').addClass(settings.effect+'In');

          bindEvents();
        }

      this.off('click.xModal').on('click.xModal', function (e) {
          e.preventDefault();
          var $this = $(this),
              $modal = $this.attr('href');

          loadingStart();

          if (!$modal.indexOf("#")) {
              //Open an inline modal on the page
              log('contains a #');

              var $mInlineContent = $($modal);
              $mInlineContent.clone().appendTo($mContentContainer);

              if($modal.length == 1){
                //Insert the data into the modal only
                if(settings.headline){
                    $("<h1>" + settings.headline + "</h1>").appendTo($mContentContainer);
                }
                if(settings.description){
                    $("<p>" + settings.description + "</p>").appendTo($mContentContainer);
                }
              }

          } else {
              //External Modal Code Goes Here
              ajaxService($modal, function(data){
                $(data).prependTo($mContentContainer);
              });
          }

          //Finally, add the modal to the dom, calculate the height, show it and bind the events!
          $mMarkup.appendTo('body');

          var $mCH = $mContentContainer.height();

          $mInnerWrapper.find('.closeModal').remove();
          $('<a class="closeModal icon-close"></a>').prependTo($mInnerWrapper);
          $mInnerWrapper.width(settings.width);
          $mInnerWrapper.height($mCH);
          $mInnerWrapper.css({
            'margin-top' : -($mCH/2) + 'px'
          });

          $($mMarkup).addClass('active').addClass(settings.effect+'In');

          bindEvents();
      });

      function loadingStart(){
        log('loadingStart...');
        if(settings.onLoadingStart){
            settings.onLoadingStart();
        }
      };

      function loadingComplete(){
        log('loadingComplete');
        if(settings.onLoadingDone){
            settings.onLoadingDone();
        }
      }

      //add closingStart and closingComplete her

      return this;
    };

  	jQuery.extend({
  		xModal: function(obj){
  			$(window).xModal(obj);
  		}
  	});


    //Testing Code...
    var devMode = 1;

    function log(msg){
      if(devMode === 1){
        console.log(msg);
      }
    }

}(jQuery));