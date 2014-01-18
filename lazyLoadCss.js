/**
 * Function for lazy loading CSS background images. 
 *
 * Copyright (c) 2013 Martin Albrecht
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author Martin Albrecht <martin.albrecht@javacoffee.de>
 * @version 0.1
 * 
 */
function lazyBackgroundCSS() {
	var self = this;
	this.backgrounds = document.querySelectorAll('.lazyBackground');
	this.count = this.backgrounds.length;

	/**
	 * Fetch offsetTop for element
	 */
	this.offTop = function(obj) {
		var pos = obj.offsetTop;
		var o = obj;
		var p = o.offsetParent;
		if( p ) {
			while(p) {							
				pos += p.offsetTop;
				o = p;
				p = o.offsetParent;
			}
		}		
		return pos;
	};

	/**
	 * Check if the images are inside the viewport
	 */
	this.check = function() {
		var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;				
		for(var i=0; i<count; i++) {
			var offset = (backgrounds[i].getAttribute('data-offset')) ? backgrounds[i].getAttribute('data-offset') : 100;
			var pos = this.offTop(backgrounds[i]);
			var divSeen = (pos - document.documentElement.clientHeight) - offset;
			if( scrollTop >= divSeen ) {				
				var objClass = backgrounds[i].getAttribute('class');				
				if( objClass.search('lzbg') === -1 ) {
					backgrounds[i].setAttribute('class', objClass + ' lzbg');
				}
			} 
		}
	};

	// Initialize	
	if( count > 0 ) {		
		window.onscroll = function() {
			self.check();
		};

		this.check(); // Initial check
	}
};