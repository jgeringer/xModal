/*
xModal Plugin: By Joe Geringer (Nansen)

Example:

JS:
$('.openModal').xModal({ width : "50%" });

HTML:
<a href="#xModal-Inline" class="openModal">Open Modal</a>

<div id="xModal-Inline" class="modal-wrapper">
    <div class="modal-container">
        <div class="modal-inner-container">
            <p>Modal Content</p>
        </div>
    </div>
</div>
*/

(function ($) {
    $.fn.xModal = function (options) {

      if(this.selector){
        console.log('its a selectlr');
      } else{
        console.log('not a selector');
      }

var $this = this;
      console.log('inside');



        this.off('click.xModal').on('click.xModal', function (e) {
            e.preventDefault();


            var settings = $.extend({
                width: "75%",
                headline: $this.data('m-headline')
            }, options);

            var $mMarkup = $('<div class="modal-wrapper"><div class="modal-container"><div class="modal-inner-container"></div></div></div>');
                $modal = $this.attr('href'),
                $mC = $mMarkup.find('.modal-inner-container'),
                $mWrapper = $mMarkup.find('.modal-container'),
                $mInlineContent = $($modal);

                $mInlineContent.prependTo($mC);



                $mMarkup.appendTo('body');

            var $mCH = $mC.height();


            if (!$modal.indexOf("#")) {
                //Inline Modal Code Goes Here
                console.log('inside #');

                $mWrapper.find('.closeModal').remove();
                $('<div class="closeModal icon-close"></div>').prependTo($mWrapper);
                $mWrapper.width(settings.width);
                $mWrapper.height($mCH);
                $mWrapper.css({
                  'margin-top' : -($mCH/2) + 'px'
                });
                $($mMarkup).addClass('active').addClass('puffIn');

                console.log('settings.headline', settings.headline);
                if($modal.length == 1){
                  console.log('path is 1');
                  $("<h1>" + settings.headline + "</h1>").prependTo($mC);
                }


            } else {
                //External Modal Code Goes Here
            }

            $(document).off('click', '.closeModal').on('click', '.closeModal', function () {
                $($mMarkup).removeClass('puffIn').addClass('puffOut');
                setTimeout(function () {
                    $($mMarkup).removeClass('active').removeClass('puffOut');
                }, 500);
            });

        });

        return this;
    };
}(jQuery));
