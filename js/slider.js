
$('#main-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '#thumbnail-slider',
  draggable: false,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
});

$('#thumbnail-slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: '#main-slider',
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  arrows: false,
  draggable: true,
  border: true,
  
});      