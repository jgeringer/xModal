# xModal
jQuery Modal Plugin

## API Methods:

Method Details:
* Instantiate
* Other Params

### Instantiate:

With no parameters, xModal will be instantiated with the default configuration options. For advanced configuration, any number of options may be passed as an object literal. See Configuration Object.

`$('.openModal').xModal();`



### What's Next?
Add a Demo link on joegeringer.com/xmodal
Ideas:
* Multiple Modals
* Different effects (maybe css magictime or greensock)
* Ability to toggle all console.logs(create a function and output the consoles in there) for dev mode.
* Add events: (begin, end)
* $('element').on('xModelEnd', function(e, state){
    console.log(state.totalShow+' elements match the current filter');
});
* Click outside and close
* Loading icon
* Center Image
* Add gallery functionality (have arrows/bullets show)
  

### What's done, but not documented:

* `$('.openModal').xModal({ width : "50%" });`
* `$.xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html" });`
* `$.xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html", effect:"vanish" });`
* `$.xModal({ html : "<p>In a Paragraph</p>" });`
* `$.xModal({ img : "http://lorempixel.com/output/technics-q-c-640-480-2.jpg" });`

Finish this markdown doc. List all examples with markup and script:
x - Inline: Lives on the page hidden. $('.openModal').xModal({ width : "50%" });
x - Dynamic Inline: Content lives in plugin call. $('.openModal').xModal({ headline:"Headline", description:"Description" });
x - Script: Can be executed wholey in script. $(window).xModal({ headline:"Headline", description:"Description" });
x - Ajax: Lives on another page. $('.openModal').xModal();
x - Dynamic Ajax: Lives on another page. $(window).xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html" });
x - Html: Takes pure html
