# xModal
jQuery Modal Plugin (3kb minified)

### [View Demo](http://joegeringer.com/xmodal/build/)

## Installation:
Include the following in the HTML.
```html
<link rel="stylesheet" href="xmodal.css" />
<script src="jquery.xmodal.js"></script>
```

## API Methods:

Method Details:
* Instantiate
* Parameters

# Instantiate:

With no parameters, xModal will be instantiated with the default configuration options. For advanced configuration, any number of options may be passed as an object literal. See Parameters.

### To load a modal when clicking on an element that has "openModal" as the class name:
```javascript
$('.openModal').xModal();
```

### To load an inline modal:
```html
<a class="openModal" href="#xModal-Inline">Open Inline Modal</a>

<div id="xModal-Inline" class="modal-wrapper">
    <div class="modal-container">
        <div class="modal-inner-container">
            <p>Modal Content</p>
        </div>
    </div>
</div>
```

### Load via script:
```javascript
$.xModal({ headline:"Headline", description:"Description", width:"25%", href:"ajax.html", effect:"vanish" });
```

### Load html:
```javascript
$.xModal({ html : "<p>In a Paragraph</p>" });
```

### Load image:
```javascript
$.xModal({ img : "http://lorempixel.com/400/200" });
```

# Parameters:
```javascript
$.xModal({ 
    headline: "Headline",  
    description: "Description", 
    width: "25%", 
    href: "filepath",
    effect: "puff",
    html: "",
    onLoadingStart:"",
    onLoadingDone:"",
    onCloseStart:"",
    onCloseDone:""
});
```

# Effects:
Awesome effects are from the awesome [magic css animation library](https://github.com/miniMAC/magic).

Example:
```javascript
$.xModal({ 
    effect:"swash" 
});
```
Options:  
```javascript
"swash", "foolish", "tinDown", "tinLeft"
```

# Browser Support
| Browsers       | Version |
|----------      |---------|
| Chrome         | 31+     |
| Firefox        | 31+     |
| Safari         | 7+      |
| iOS Safari     | 7+      |
| Android        | 4.1+    |
| Android Chrome | 42+     |
| IE             | 9+      |


# Benefits:
* Follows SUIT CSS naming conventions.

# What's Next?
* Isolate magictime
* Make default styling more generic
* Make it so that you dont need as many child classnames (ex: inline)
* Loading icon
* $('element').on('xModelEnd', function(e, state){
    console.log(state.totalShow+' elements match the current filter');
});

## Down the road...
* Make it so that you can't scroll down the body of the page, only within the modal.
* Multiple Modals
* Other effects
* Have image fit width of modal
* Add gallery functionality (have arrows/bullets show)