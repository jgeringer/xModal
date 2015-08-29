# xModal
jQuery Modal Plugin (3kb minified)

## API Methods:

Method Details:
* Instantiate
* Other Params

### Instantiate:

With no parameters, xModal will be instantiated with the default configuration options. For advanced configuration, any number of options may be passed as an object literal. See Configuration Object.

`$('.openModal').xModal();`


### What's Next?

* Loading icon
* Add events: (begin, end)
* $('element').on('xModelEnd', function(e, state){
    console.log(state.totalShow+' elements match the current filter');
});
* Add a Demo link on joegeringer.com/xmodal
* Multiple Modals
* Different effects (maybe css magictime or greensock)
* Have image fit width of modal
* Add gallery functionality (have arrows/bullets show)
* Finish this MD doc
  

### What's done, but not documented:

* `$('.openModal').xModal({ width : "50%" });`
* `$.xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html" });`
* `$.xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html", effect:"vanish" });`
* `$.xModal({ html : "<p>In a Paragraph</p>" });`
* `$.xModal({ img : "http://lorempixel.com/output/technics-q-c-640-480-2.jpg" });`

Finish this markdown doc. List all examples with markup and script:

* Inline: Lives on the page hidden. $('.openModal').xModal({ width : "50%" });
* Dynamic Inline: Content lives in plugin call. $('.openModal').xModal({ headline:"Headline", description:"Description" });
* Script: Can be executed wholey in script. $(window).xModal({ headline:"Headline", description:"Description" });
* Ajax: Lives on another page. $('.openModal').xModal();
* Dynamic Ajax: Lives on another page. $(window).xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html" });
* Html: Takes pure html
* Ability to toggle all console.logs(create a function and output the consoles in there) for dev mode.
* Click outside and close

### HTML:
```
<a href="#xModal-Inline" class="openModal">Open Modal</a>

<div id="xModal-Inline" class="modal-wrapper">
    <div class="modal-container">
        <div class="modal-inner-container">
            <p>Modal Content</p>
        </div>
    </div>
</div>
```
