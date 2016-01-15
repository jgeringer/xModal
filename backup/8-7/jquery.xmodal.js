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

        var settings = $.extend({
            width: "75%"
        }, options);

        var $this = this,
            $modal = $this.attr('href'),
            $mC = $($modal).find('>*'),
            $mCH = $mC.height();

        this.off('click.xModal').on('click.xModal', function (e) {
            e.preventDefault();

            if (!$modal.indexOf("#")) {
                //Inline Modal Code Goes Here
                $mC.find('.closeModal').remove();
                $('<div class="closeModal icon-close"></div>').prependTo($mC);
                $mC.width(settings.width);
                $mC.height($mCH);
                $mC.css({
                  'margin-top' : -($mCH/2) + 'px'
                });
                $($modal).addClass('active').addClass('puffIn');
            } else {
                //External Modal Code Goes Here
            }

            $(document).off('click', '.closeModal').on('click', '.closeModal', function () {
                $($modal).removeClass('puffIn').addClass('puffOut');
                setTimeout(function () {
                    $($modal).removeClass('active').removeClass('puffOut');
                }, 500);
            });

        });

        return this;
    };
}(jQuery));
