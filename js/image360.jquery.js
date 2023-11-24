(function ($) {


	$.fn.image360 = function (options) {

		// настройки
		var settings = $.extend({
			'count_loop': 4, // количество оборотов на ширину блока
			'auto_rotate': true // Добавление опции для автоматического вращения
		}, options);

		var $main_div = this, // блок с картинками
			div_width, // ширирна блока
			count_imgs = 0, // количество картинок
			start_drag = false, // старт анимации
			position_X = 0, // положение курсора над картинкой
			index_img = 0, // индекс отображаемой картинки
			last_perc = 0, // предыдущее положение курсора относительно блока в процентах
			direction = true; // направление движения мыши true - влево, false -  вправо
		autoRotateInterval = true; // Добавлен интервал для автоматического вращения
		var timerId; // Глобальная переменная для идентификатора таймера
		var touchStartY = 0; // Начальная позиция касания
		var check = true;

		var methods = {

			init: function (settings) {

				// ширина блока
				div_width = $main_div.width();
				// подготовка картинок
				$main_div.find("img").each(function (num) {
					if (num != 0) {
						$(this).hide();
					}
				});
				count_imgs = $main_div.find("img").length;

				if (settings.auto_rotate) { //Если установлен флаг auto_rotate, запускается автоматическое вращение
					methods.startAutoRotate();
				}


				$('#exit-full-btn').on('click touchend', function () {
					clearTimeout(timerId);
					check = true;
				})

				$('#clue-btn').on('click touchend', function () {
					$('#clue-id').toggleClass('none');
				})

				$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function () {
					if (!document.fullscreenElement && !document.mozFullScreenElement &&
						!document.webkitFullscreenElement && !document.msFullscreenElement) {
						if (!$('#clue-id').hasClass('none')) {
							$('#clue-id').toggleClass('none');
						}
						clearTimeout(timerId);

					}
				});
				$('#full-screen-btn').on('click touchend', function () {
					if($('#rotate-img').hasClass('slick-current') && check){
						check = false;
						timerId = setTimeout(function () {
							$("#clue-id").toggleClass('none');
						}, 3000);
					}
				});






				$('#prev-id').on('click touchend', function () {
					
					clearTimeout(timerId);
				});
				$('#next-id').on('click touchend', function () {
					clearTimeout(timerId);
				});
				//methods.setupMouseRotationHandlers();

				$('#rotate-auto').on('click touchend', function () {
					$(this).toggleClass('clicked');
					if ($(this).hasClass('clicked')) {
						methods.stopAutoRotate();
					} else {
						methods.startAutoRotate();
					}
				})



				$('#rotate-hand').on('click touchend', function () {
					$(this).toggleClass('clicked');
					$('#rotate-auto').toggleClass('none', $(this).hasClass('clicked'));
					if ($(this).hasClass('clicked')) {

						methods.stopMouseRotation();
					} else {
						if ($("#rotate-auto").hasClass('clicked')) {
						} else {
							methods.startAutoRotate();
						}
						methods.startMouseRotation();
					}

				})


				$(window).on('orientationchange', function () {
					methods.resize();
				});
			},

			handleTouchEvents: function (e) {
				if (e.type === 'touchstart') {
					start_drag = true;
					position_X = e.originalEvent.touches[0].pageX;
				} else if (e.type === 'touchmove') {
					if (start_drag) {
						var touch = e.originalEvent.touches[0];
						if (position_X > touch.pageX) {
							direction = false;
						}
						if (position_X < touch.pageX) {
							direction = true;
						}
						position_X = touch.pageX;
						var offset_div = $main_div.offset();
						var positionX = (touch.pageX - offset_div.left);
						methods.move_imgs(positionX);
					}
				} else if (e.type === 'touchend') {
					start_drag = false;
				}
			},



			move_imgs: function (positionX) {
				if (positionX < 0) positionX = 0;
				if (positionX > div_width) positionX = div_width;
				var percent_div = (positionX / div_width) * 100;
				var percent_img = 100 / (settings.count_loop * count_imgs);
				if (Math.abs(percent_div - last_perc) > percent_img) {
					last_perc = percent_div;
					if (direction) {
						index_img--;
					} else {
						index_img++;
					}
					if (index_img < 0) index_img = (count_imgs - 1);
					if (index_img > (count_imgs - 1)) index_img = 0;
					$main_div.find("img").hide();
					$main_div.find("img").eq(index_img).show();
				}
			},

			resize: function () {
				// div_width = $main_div.width();
				div_width = $('#main-slider-container').width();
			},

			setupMouseRotationHandlers: function () {
				$main_div.on('touchstart touchmove touchend', function (e) {
					e.preventDefault();
					methods.handleTouchEvents(e);

					if (e.type === 'touchstart') {
						touchStartY = e.originalEvent.touches[0].pageY;
					} else if (e.type === 'touchmove') {
						var deltaY = e.originalEvent.touches[0].pageY - touchStartY;

						// Проверяем, если движение по оси Y (вертикальное движение)
						if (Math.abs(deltaY) > 10) {
							// Выполняем скролл страницы
							window.scrollBy(0, -deltaY);

							// Обновляем начальную позицию касания
							touchStartY = e.originalEvent.touches[0].pageY;
						} else {
							// Иначе, если движение влево или вправо, вызываем функцию вращения
							var offset_div = $main_div.offset();
							var positionX = (e.originalEvent.touches[0].pageX - offset_div.left);
							methods.move_imgs(positionX);
						}
					}
				});
				$main_div.bind('mousedown touchstart touchmove touchend mousemove click', function (e) {
					e.preventDefault();

					if (e.type === 'mousedown' || e.type === 'touchstart') {
						// клик или тач
						// старт
						start_drag = true;
						position_X = e.pageX;

					} else if (e.type === 'touchmove') {
						// движение тач
						if (start_drag) {
							var touch = e.originalEvent.touches[0];
							// движение влево
							if (position_X > touch.pageX) {
								direction = false;
							}
							// движение вправо
							if (position_X < touch.pageX) {
								direction = true;
							}
							position_X = touch.pageX;
							var offset_div = $main_div.offset();
							var positionX = (touch.pageX - offset_div.left);
							// анимация
							methods.move_imgs(positionX);
						}
					} else if (e.type === 'touchend') {
						// отпустили тач
						start_drag = false;
					}
				});

				// движение мышки
				$main_div.bind('mousemove', function (e) {
					e.preventDefault();
					if (start_drag) {
						// движение влево
						if (position_X > e.pageX) {
							direction = false;
						}
						// движение вправо
						if (position_X < e.pageX) {
							direction = true;
						}
						position_X = e.pageX;
						var offset_div = $main_div.offset();
						var positionX = (e.pageX - offset_div.left);
						// анимация
						methods.move_imgs(positionX);
					}
				});

				// остановка, если отпустили кнопку мышки
				$(document).bind('mouseup', function (e) {
					start_drag = false;
				});
			},
			startAutoRotate: function () {
				autoRotateInterval = setInterval(function () { //Автоматическое вращение с использованием анимации
					if (!start_drag) {
						if (direction) {  //Задаётся направление
							index_img--;
						} else {
							index_img++;
						}
						if (index_img < 0) index_img = (count_imgs - 1);
						if (index_img > (count_imgs - 1)) index_img = 0;
						$main_div.find("img").hide();
						$main_div.find("img").eq(index_img).show();
					}
				}, 500); // Задаётся скорость вращение
			},
			stopAutoRotate: function () {
				clearInterval(autoRotateInterval);
			},

			startMouseRotation: function () {
				//auto_rotate=true;
				methods.setupMouseRotationHandlers();

			},

			stopMouseRotation: function () {
				$main_div.off('mousedown touchstart touchmove touchend mousemove click');
				//$(document).off('mouseup');
				methods.stopAutoRotate();
			},

		};

		$main_div.on('touchstart touchmove touchend', function (e) {
			e.preventDefault();
			methods.handleTouchEvents(e);

			if (e.type === 'touchstart') {
				touchStartY = e.originalEvent.touches[0].pageY;
			} else if (e.type === 'touchmove') {
				var deltaY = e.originalEvent.touches[0].pageY - touchStartY;

				// Проверяем, если движение по оси Y (вертикальное движение)
				if (Math.abs(deltaY) > 10) {
					// Выполняем скролл страницы
					window.scrollBy(0, -deltaY);

					// Обновляем начальную позицию касания
					touchStartY = e.originalEvent.touches[0].pageY;
				} else {
					// Иначе, если движение влево или вправо, вызываем функцию вращения
					var offset_div = $main_div.offset();
					var positionX = (e.originalEvent.touches[0].pageX - offset_div.left);
					methods.move_imgs(positionX);
				}
			}
		});


		$main_div.bind('mousedown touchstart touchmove touchend mousemove click', function (e) {
			e.preventDefault();
			if (e.type === 'mousedown' || e.type === 'touchstart') {
				// клик или тач
				// старт
				start_drag = true;
				position_X = e.pageX;

			} else if (e.type === 'touchmove') {
				// движение тач
				if (start_drag) {
					var touch = e.originalEvent.touches[0];
					// движение влево
					if (position_X > touch.pageX) {
						direction = false;
					}
					// движение вправо
					if (position_X < touch.pageX) {
						direction = true;
					}
					position_X = touch.pageX;
					var offset_div = $main_div.offset();
					var positionX = (touch.pageX - offset_div.left);
					// анимация
					methods.move_imgs(positionX);
				}
			} else if (e.type === 'touchend') {
				// отпустили тач
				start_drag = false;
			}
		});

		// движение мышки
		$main_div.bind('mousemove', function (e) {
			e.preventDefault();
			if (start_drag) {
				// движение влево
				if (position_X > e.pageX) {
					direction = false;
				}
				// движение вправо
				if (position_X < e.pageX) {
					direction = true;
				}
				position_X = e.pageX;
				var offset_div = $main_div.offset();
				var positionX = (e.pageX - offset_div.left);
				// анимация
				methods.move_imgs(positionX);
			}
		});

		// остановка, если отпустили конпку мышки
		$(document).bind('mouseup', function (e) {
			start_drag = false;
		});

		$(window).resize(function () {
			methods.resize();
		});
		methods.init(settings);
	};
})(jQuery);