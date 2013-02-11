spyGlassTouch
=============

This is my answer to a question on a jQuery Mobile LinkedIn.

This spyGlass plugin is a simple inner zoom made for touch screens.  Think of your finger as a magnifying glass.  You can view a demo [here](http://www.thierryblais.com/spyGlass/index.html).

To initialize the plugin:

>$(selector).spyglass();

The plugin comes with some default settings which can be configured with a standard object literal:

>$(selector).spyglass({property: value, otherProperty: value});

Properties

addClass
--------
Classes to add to the zoom element so you can style the window youself or give it a responsive class 
*You must add !important to definitions of width and height to override defaults with custom classes*
Accepts: string containing class names.

width
-----
The width of the spyglass window.
Accepts: px, %, calculated value.

height
------
The height of the spyglass window.
Accepts: px, %, calculated value.

xDistance
---------
The horizontal distance from your touch.
Accepts: px, calculated value.

yDistance
---------
The vertical distance from your touch.
Accepts: px, calculated value.

zoom
----
The magnification of the image
Accepts: positive integer

More to come....