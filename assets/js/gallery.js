"use strict";

var currentImage = 1;
var maxImage = 1;
var count = "initial_count";
var max = "initial_max";

var imageObject = {
  clickSwap: function (obj) {
    obj.click(function () {
      var activeImage = $('#image-container').children('img.active');
      var activeTxt = $('#description').children('span.active');
      activeImage.removeClass('active');
      activeTxt.removeClass('active');

      if (activeImage.next().length > 0 && currentImage < maxImage) {
        activeImage.next().addClass('active');
        $("#image-container").css({width: activeImage.next().width()});
        activeTxt.next().addClass('active');
        currentImage++;
      } else {
        var current = $('#image-container').children('img:first-of-type');
        current.addClass('active');
        $("#image-container").css({width: current.width()});
        var currentText = $('#description').children('span:first-of-type');
        currentText.addClass('active');
        currentImage = 1;
      }

      count.innerHTML = currentImage;
      return false;
    });
  }
};


$(function () {
  imageObject.clickSwap($('#imageContainer')); // clicking on IMAGE
  imageObject.clickSwap($('#gal_next')); // clicking on NEXT button
});

var imageObject2 = {
  clickPrev: function (obj) {
    obj.click(function () {
      var activeImage = $('#image-container').children('img.active');
      var activeTxt = $('#description').children('span.active');
      activeImage.removeClass('active');
      activeTxt.removeClass('active');

      if (activeImage.prev().length > 0 && currentImage > 1) {
        activeImage.prev().addClass('active');
        activeImage = $('#image-container').children('img.active');
        $("#image-container").css({width: activeImage.width()});
        activeTxt.prev().addClass('active');
        currentImage--;
      } else {
        var current = $('#image-container').children('img:last-of-type');
        current.addClass('active');
        $("#image-container").css({width: current.width()});
        var currentText = $('#description').children('span:last-of-type');
        currentText.addClass('active');
        currentImage = maxImage;
      }

      count.innerHTML = currentImage;
      return false;
    });
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
      activeImage.removeClass('active');
      activeTxt.removeClass('active');
      if (activeImage.prev().length > 0 && currentImage > 1) {
        activeImage.prev().addClass('active');
        activeImage = $('#image-container').children('img.active');
        $("#image-container").css({width: activeImage.width()});
        activeTxt.prev().addClass('active');
        currentImage--;
      } else {
        current = $('#image-container').children('img:last-of-type');
        current.addClass('active');
        $("#image-container").css({width: current.width()});
        currentText = $('#description').children('span:last-of-type');
        currentText.addClass('active');
        currentImage = maxImage;
      }

      count.innerHTML = currentImage;
      break;

    case 39: // Right
      activeImage.removeClass('active');
      activeTxt.removeClass('active');
      if (activeImage.next().length > 0 && currentImage < maxImage) {
        activeImage.next().addClass('active');
        $("#image-container").css({width: activeImage.width()});
        activeTxt.next().addClass('active');
        currentImage++;
      } else {
        current = $('#image-container').children('img:first-of-type');
        current.addClass('active');
        currentText = $('#description').children('span:first-of-type');
        currentText.addClass('active');
        currentImage = 1;
      }

      count.innerHTML = currentImage;
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
      activeTxt.removeClass('active');

      $('#image-container').removeClass("display_none");
      $('#gal_nav').removeClass("display_none");
      $('#thumbsContainer').addClass("display_none");

      var bigImageId = "a" + this.id;
      var descriptionId = "b" + this.id;

      $("#gal_current").html(this.id);

      var bigImage = document.getElementById(bigImageId);
      var description = document.getElementById(descriptionId);

      if(bigImage !== undefined) {
        bigImage.className = "active";
        activeImage = $('#image-container').children('img.active');
        $("#image-container").css({width: activeImage.width()});
      }

      if(description !== undefined) {
        description.className = "active";
      }

      count.innerHTML = currentImage = Number(this.id);

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
  $('#description').addClass("invisible");

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
      max.innerHTML = "/ " + maxImage;
    }
  }
};
