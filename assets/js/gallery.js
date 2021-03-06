//"use strict";

var currentImage = 1;
var maxImage = 1;
var count = "initial_count";
var max = "initial_max";

function setNext() {
  var activeImage = $('img.active');
  var activeTxt = $('span.active');


  activeImage.removeClass('active');
  if(activeTxt.attr('id') !== 'b0') {
    activeTxt.removeClass('active');
  }

  if (activeImage.next().length > 0 && currentImage < maxImage) {
    var next = activeImage.next();
    var nextTxt = activeTxt.next();
    $("#image-container").css({width: next.width()});
    next.addClass('active');
    if(activeTxt.attr('id') !== 'b0') {
      nextTxt.addClass('active');
    }
    currentImage++;
  } else {
    var current = $('#image-container').children('img:first-of-type');
    $("#image-container").css({width: current.width()});
    current.addClass('active');
    var currentText = $('#description').children('span:first-of-type');
    currentText.addClass('active');
    currentImage = 1;
  }

  count.innerHTML = currentImage;
  return false;
}

var imageObject = {
  clickSwap: function (obj) {
    obj.click(setNext);
  }
};


$(function () {
  //imageObject.clickSwap($('#imageContainer')); // clicking on IMAGE
  imageObject.clickSwap($('#gal_next')); // clicking on NEXT button
});

function setPrev() {
  var activeImage = $('img.active');
  var activeTxt = $('span.active');

  activeImage.removeClass('active');
  if(activeTxt.attr('id') !== 'b0') {
    activeTxt.removeClass('active');
  }

  if (activeImage.prev().length > 0 && currentImage > 1) {
    var prev = activeImage.prev();
    var prevTxt = activeTxt.prev();
    $("#image-container").css({width: prev.width()});
    prev.addClass('active');
    if(activeTxt.attr('id') !== 'b0') {
      prevTxt.addClass('active');
    }
    currentImage--;
  } else {
    var current = $('#image-container').children('img:last-of-type');
    var currentText = $('#description').children('span:last-of-type');
    $("#image-container").css({width: current.width()});
    current.addClass('active');
    currentText.addClass('active');
    currentImage = maxImage;
  }

  count.innerHTML = currentImage;
  return false;
}

var imageObject2 = {
  clickPrev: function (obj) {
    obj.click(setPrev);
  }
};

$(function () {
  imageObject2.clickPrev($('#gal_prev')); // clicking on PREV button
});

/**
 * Image changing via keyboard arrows
 *
 * @param e
 * @returns {boolean}
 */
function arrowsNavigation(e) {
  var activeImage = $('#image-container').children('img.active');
  var activeTxt = $('#description').children('span.active');
  var currentText;
  var current;

  switch (event.keyCode) {

    case 37: // Left
      setPrev();
      break;

    case 39: // Right
      setNext();
      break;
  }
}

window.addEventListener('keydown', arrowsNavigation, false);

var imgPreview = {
  clickPreview: function (obj) {
    obj.click(function () {
      var activeImage = $('#image-container').children('img.active');
      var activeTxt = $('#description').children('span.active');
      activeImage.removeClass('active');
      if(activeTxt.attr('id') !== 'b0') {
        activeTxt.removeClass('active');
      }

      $('#image-container').removeClass("display_none");
      $('#gal_nav').removeClass("display_none");
      $('#thumbsContainer').addClass("display_none");

      var bigImageId = "a" + this.id;
      var descriptionId = "b" + this.id;
      console.log("BigImage ID = " + bigImageId);
      var bigImage = document.getElementById(bigImageId);

      if(bigImage !== null) {
        console.log("Width of clicked preview big = " + bigImage.width);
        $("#image-container").css({width: bigImage.width});
        bigImage.className = "active";
      }

      var description = document.getElementById(descriptionId);

      if(description !== null) {
        description.className = "active";
      } else {
        var description_alt = document.getElementById("b0");
        if(description_alt !== null) {
          description_alt.className = "active";
        }
      }

      count.innerHTML = Number(this.id);
      currentImage = Number(this.id);

      return false;
    });
  }
};


/**
 * Clicking on image preview
 */
$(function () {
  imgPreview.clickPreview($('.mini'));
});

var allBtn = {
  clickAll: function (obj) {
    obj.click(function () {
      $('#image-container').addClass("display_none");
      $('#gal_nav').addClass("display_none");
      $('#thumbsContainer').removeClass("display_none");
      return false;
    });
  }
};


/**
 * Clicking on ALL button
 */
$(function () {
  allBtn.clickAll($('#gal_all'));
});


var infoBtn = {
  clickInfo: function (obj) {
    var visibility = false;
    obj.click(function () {
      if (visibility === false) {
        $('#description').removeClass("invisible");
        $('#description').addClass("visible");
        visibility = true;
      } else {
        $('#description').removeClass("visible");
        $('#description').addClass("invisible");
        visibility = false;
      }
      return false;
    });
  }
};

/**
 * Clicking on INFO button
 */
$(function () {
  infoBtn.clickInfo($('#gal_info'));
});

/**
 * Assigning classes. Initial calculation of images in gallery
 */
window.onload = function () {
  var activeImage = $('#image-container').children('img:first-of-type');
  activeImage.addClass('active');
  $("#image-container").css({width: activeImage.width()});

  $('#description').children('span:first-of-type').addClass('active');
  $('#thumbsContainer').addClass("display_none");
  $('#loading').addClass("display_none");
  //$('#description').addClass("invisible");

  var lastId = $('#image-container').children('img:last-of-type').attr('id');

  if (lastId !== undefined) {
    var nrString = lastId.substr(1);
    maxImage = Number(nrString);
    count = document.getElementById("gal_current");

    if (count !== undefined && count !== null) {
      count.innerHTML = currentImage;
    }

    max = document.getElementById("gal_max");

    if (max !== undefined && max !== null) {
      max.innerHTML = " / " + maxImage;
    }
  }
};
