'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
	// selectors
	var menuButton = $('#menuButton'),
	    navList = $('#navList'),
	    body = $('body');

	// layout control variables
	var browser = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? true : false; //check if firefox
	var documentWidth = document.documentElement.clientWidth,
	    documentHeight = document.documentElement.clientHeight,
	    windowWidth = $(window).width(),
	    executeAnimation = false,
	    // for calling works and contact animations
	mouseClick = 2,
	    // for button animation control
	storedNumber = 0,
	    resizeId = void 0; // for timeout 

	// canvas variables
	var myCanvas = document.getElementById("canvasAnimation"),
	    parentCanvas = $(myCanvas).parent(),
	    ctx = myCanvas.getContext('2d'),
	    numParticles = window.innerWidth < 700 ? 100 : 200;
	var particles = [];

	// each section default margin-left
	var marginArr = [0, documentWidth * -1, documentWidth * -1 * 2];

	// for welcome text animation
	var welcomeText = "Hello world! My name is Marcin, I'm an oridinary guy that want to become a webdeveloper due to quite complex reasons. Feel free to check my works and do not hesitate to contact me if you find them somehow interesting.";

	//menu button animation
	(function transtionMenuButton() {
		menuButton.mouseenter(function () {
			menuButton.children().animate({
				width: "50px"
			}, 100);
		});

		menuButton.mouseleave(function () {
			var pixelValue = ["50px", "30px", "45px", "20px"];

			if (mouseClick % 2 === 0) {
				for (var i = 0; i < 4; i++) {
					$('#menuButton span').eq(i).animate({
						width: pixelValue[i]
					}, 100);
				}
			}
		});
	})();

	(function clickMenuButton() {
		menuButton.click(function () {
			mouseClick++;
			menuButton.children().css({
				width: "50px"
			});
			for (var i = 0; i < 4; i++) {
				$('#menuButton span:eq(' + i + ')').toggleClass('rotated' + i);
			}
			navList.fadeToggle(100, 'linear');
		});
	})();

	function typeWriterAnimation(text, i) {
		var paragraph = $('#welcomeText');
		if (i <= text.length) {
			paragraph.html(text.substring(0, i + 1) + '<span></span>');
		}

		if (i <= text.length) {
			setTimeout(function () {
				typeWriterAnimation(text, i + 1);
			}, 50);
		}
	}

	// works buttons controller
	(function worksButtonsController() {
		var buttons = [$('#workInfoButton1'), $('#workInfoButton2'), $('#workInfoButton3'), $('#workInfoButton4'), $('#workInfoButton5'), $('#workInfoButton6')],
		    descriptions = [$('#workDesc1'), $('#workDesc2'), $('#workDesc3'), $('#workDesc4'), $('#workDesc5'), $('#workDesc6')];

		var _loop = function _loop(i) {
			buttons[i].click(function (event) {
				descriptions[i].toggleClass('left');
				event.stopPropagation();
			});
		};

		for (var i = 0; i < buttons.length; i++) {
			_loop(i);
		}
		$(window).click(function () {
			for (var i = 0; i < buttons.length; i++) {
				if (descriptions[i].hasClass('left')) {
					descriptions[i].removeClass('left');
				}
			}
		});
	})();

	// menu links anchors
	(function menuAnchors() {
		// for mobile - vertical page view
		navList.on('click', 'a', function (event) {
			event.preventDefault();

			if (!executeAnimation) {
				worksAnimationController();
				executeAnimation = !executeAnimation;
			}

			if (documentWidth < 700) {
				var section = $(this).data('section');
				menuButton.click().mouseleave();

				$('html, body').animate({
					scrollTop: $(section).offset().top
				}, 250);
			} else {
				storedNumber = $(this).data('anchor');

				menuButton.click().mouseleave();

				body.animate({
					marginLeft: marginArr[storedNumber]
				}, 250);
			}
		});
	})();

	function worksAnimationController() {
		setTimeout(function () {
			$('.Work').each(function (index) {
				$(this).delay(index * 200).fadeIn(500);
			});
		}, 100);
	};

	// horizontal scrolling controller
	function scrollPage(browser) {

		function setLeftMargin() {
			body.animate({
				marginLeft: marginArr[storedNumber]
			}, 250);
		}

		body.on('wheel', function (event) {
			event.preventDefault();

			if (!executeAnimation) {
				worksAnimationController();
				executeAnimation = !executeAnimation;
			}

			if (browser) {
				// check if firefox -> different delta
				if (event.originalEvent.deltaY < 0) {
					if (storedNumber <= 2 && storedNumber !== 0) {
						storedNumber--;
						setLeftMargin();
					}
				} else {
					if (storedNumber < 2) {
						storedNumber++;
						setLeftMargin();
					}
				}
			} else {
				if (event.originalEvent.wheelDelta < 0) {
					// remaining browsers compatibility
					if (storedNumber < 2) {
						storedNumber++;
						setLeftMargin();
					}
				} else {
					if (storedNumber <= 2 && storedNumber !== 0) {
						storedNumber--;
						setLeftMargin();
					}
				}
			}
		});
	}

	// star object with blinking animation

	var Star = function () {
		function Star() {
			_classCallCheck(this, Star);

			this.opacity = Math.random().toFixed(2);
			this.x = myCanvas.width * Math.random();
			this.y = myCanvas.height * Math.random();
			this.color = 'rgba(255, 255, 200, ' + this.opacity;
			this.falling = Math.random();

			if (this.opacity < 0.5) {
				return this.size = 1;
			} else if (this.opacity >= 0.5 && this.opacity < 0.8) {
				return this.size = 2;
			} else {
				return this.size = 3;
			}
		}

		_createClass(Star, [{
			key: 'draw',
			value: function draw(ctx) {
				// draw circles

				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 2 * Math.PI, false);
				ctx.fillStyle = this.color;
				ctx.shadowBlur = 8;
				ctx.shadowColor = "white";
				ctx.fill();
			}
		}, {
			key: 'redraw',
			value: function redraw() {
				// redraw with different opacity for blinking effect
				this.opacity = +Math.random().toFixed(2);
				this.color = 'rgba(255, 255, 200, ' + this.opacity;

				if (this.falling < 0.02) {
					this.color = "#faff70";
					this.x = this.x + 17;
					this.y = this.y + 17;
					if (this.x > myCanvas.width && this.y > myCanvas.height) {
						this.x = myCanvas.width * Math.random();
						this.y = myCanvas.height * Math.random();
						this.falling = 0;
					}
				}
			}
		}]);

		return Star;
	}();

	;

	function loop() {
		myCanvas.width = myCanvas.width;

		for (var i = 0; i < numParticles; i++) {
			particles[i].redraw();
			particles[i].draw(ctx);
		}
		requestAnimationFrame(loop);
	}

	// layout size control
	function controlSectionSize(width, height, callback, callParam) {

		$('.NavContainer').css({ // always resize navigation to fit viewport
			width: width,
			height: height + 300
		});

		$(myCanvas).attr('width', width); // dynamic resizing for canvas
		$(myCanvas).attr('height', height);

		if (width > 400) {
			// if not mobile - dynamically resize sections to fit viewports (RWD)
			$('section').css({
				width: width,
				height: height
			});
		}

		if (width > 700) {
			// callback for horizontal/vertical scrolling control
			if (typeof callback == 'function') {
				callback(callParam);
			}
		}
	};

	//function calls

	$(window).resize(function () {
		if ($(window).width() != windowWidth) {
			windowWidth = $(window).width();
			body.hide();
			clearTimeout(resizeId);
			resizeId = setTimeout(location.reload(), 1000);
		}
	});

	controlSectionSize(documentWidth, documentHeight, scrollPage, browser);

	for (var i = 0; i < numParticles; i++) {
		particles.push(new Star());
	}
	loop();

	setTimeout(typeWriterAnimation(welcomeText, 0), 50000);
});