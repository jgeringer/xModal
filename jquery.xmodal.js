/*
xModal Plugin: By Joe Geringer (Nansen)

Example:

JS:
$('.openModal').xModal({ width : "50%" });
$.xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html" });
$.xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html", effect:"vanish" });
$.xModal({ html : "<p>In a Paragraph</p>" });
$.xModal({ img : "http://lorempixel.com/output/technics-q-c-640-480-2.jpg" });

HTML:
<a href="#xModal-Inline" class="openModal">Open Modal</a>

<div id="xModal-Inline" class="modal-wrapper">
    <div class="modal-container">
        <div class="modal-inner-container">
            <p>Modal Content</p>
        </div>
    </div>
</div>

Different Modals:
x - Inline: Lives on the page hidden. $('.openModal').xModal({ width : "50%" });
x - Dynamic Inline: Content lives in plugin call. $('.openModal').xModal({ headline:"Headline", description:"Description" });
x - Script: Can be executed wholey in script. $(window).xModal({ headline:"Headline", description:"Description" });
x - Ajax: Lives on another page. $('.openModal').xModal();
x - Dynamic Ajax: Lives on another page. $(window).xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html" });
x - Html: Takes pure html
IMG:

  Ideas:
  Pure HTML
  Multiple Modals
  Different effects (maybe css magictime or greensock)
  Ability to toggle all console.logs(create a function and output the consoles in there) for dev mode.
  Extend it (add events)
  Click outside and close
  Loading icon
  Center Image

*/

(function ($) {
    $.fn.xModal = function (options) {

      var $mMarkup = $('<div class="modal-wrapper"><div><div></div></div></div>'),
          $mInnerWrapper = $mMarkup.find('>*'),
          $mContentContainer = $mMarkup.find('>*>*');

      var settings = $.extend({
          width: "75%",
          headline: "",
          description: "",
          href:"",
          effect:"puff",
          html:""
      }, options);

      function bindEvents(){
        var closer = function(e){
          if (e) {
              log('event:' + e);
          } else {
              log("this didn't come from an event!");
          }

          $($mMarkup).removeClass(settings.effect+'In').addClass(settings.effect+'Out');
          setTimeout(function () {
              $($mMarkup).removeClass('active').removeClass(settings.effect+'Out');
              $mContentContainer.empty();
              $($mMarkup).remove();
          }, 1000);

          //unbind the keyup event
          $(document).off('keyup.xModalEscape');
          $(document).off('click.xModalCloseBody');
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

        $(document).on('click.xModalCloseBody', '.modal-wrapper', function (e) {
          log('clicked on this: '+ e.target);
          if($(e.target).is('.modal-wrapper')) closer();
        });
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
          }
        });
      }


      if(!this.selector) {
        log('this is not a selector.');

        var $mContent = $('<div/>');

        //inject content here
        if(settings.href){
            log('you gotta path!' + settings.href);
            ajaxService(settings.href, function(data){
              $(data).prependTo($mContentContainer);
            });
        }
        if(settings.headline){
            $("<h1>" + settings.headline + "</h1>").appendTo($mContent);
        }
        if(settings.description){
            $("<p>" + settings.description + "</p>").appendTo($mContent);
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

        function doStyling(){
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
        return;

      }

      this.off('click.xModal').on('click.xModal', function (e) {
          log('inside xmodal close')
          e.preventDefault();
          var $this = $(this),
              $modal = $this.attr('href');

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
      return this;
    };

  	jQuery.extend({
  		xModal: function(obj){
  			$(window).xModal(obj);
  		}
  	});


    //Testing Code...
    var devMode = true;

    function log(msg){
      if(devMode === true){
        console.log(msg);
      }
    }

}(jQuery));
