
$(function () {

  'use strict';
  var imagewidth, imageheight; 
  var console = window.console || { log: function () {} },
      $alert = $('.docs-alert'),
      $message = $alert.find('.message'),
      showMessage = function (message, type) {
        $message.text(message);

        if (type) {
          $message.addClass(type);
        }

        $alert.fadeIn();

        setTimeout(function () {
          $alert.fadeOut();
        }, 3000);
      };

  // Demo
  // -------------------------------------------------------------------------

  (function () {
	  var gwindow = $(window).width();
	  var $download = $('#download');
	   var $actions = $('.docs-actions');
    var $image = $('#img-container > img'),
        options = {
        strict: true,
        // responsive: false,
          checkImageOrigin: false,

          // modal: false,
  	     guides: false,
          // highlight: false,
          //background: true,

         autoCrop: true,
       
          dragCrop: false,
       		 movable: false,
          resizable: false,
          // rotatable: false,
          // zoomable: false,
          // touchDragZoom: false,
          // mouseWheelZoom: false,
	
       	 minCanvasWidth: gwindow,
 	   	  minCanvasHeight: gwindow,
          minCropBoxWidth: gwindow,
          minCropBoxHeight:gwindow,
      	   minContainerWidth: gwindow ,
          	minContainerHeight:  gwindow ,
		//autoCropArea: 1,
		cropBoxMovable:false,
		cropBoxResizable: false,
          // build: null,
          // built: null,
          // dragstart: null,
          // dragmove: null,
          // dragend: null,
          // zoomin: null,
          // zoomout: null,

          aspectRatio:600/810,
		  crop:function(data){
				 var json = [
                  '{"x":' + data.x,
                  '"y":' + data.y,
                  '"height":' + data.height,
                  '"width":' + data.width,
                  '"rotate":' + data.rotate + '}'
                ].join();

            	$("#avatar_data").val(json);
			  //this.minCanvasWidth  = imagewidth;
		
			
			 }
        };

    /*$image.on({
      'build.cropper': function (e) {
		
        console.log(e.type);
      },
      'built.cropper': function (e) {
        console.log(e.type);
      },
      'dragstart.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragmove.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'dragend.cropper': function (e) {
        console.log(e.type, e.dragType);
      },
      'zoomin.cropper': function (e) {
        console.log(e.type);
      },
      'zoomout.cropper': function (e) {
        console.log(e.type);
      }
    }).cropper(options);*/
    $image.cropper(options);
		

    // Methods
    $("#download").on('click', function (event) {
		event.stopPropagation();
      var data = $(this).data(),
          $target,
          result;
		data.method = 'getCroppedCanvas';
		if($("#IsUploadImage").val() =="0"){
			alert('您还没上传哦！！');
			return false;	
		}
      if (data.method) {
        data = $.extend({}, data); // Clone a new one

        if (typeof data.target !== 'undefined') {
          $target = $(data.target);

          if (typeof data.option === 'undefined') {
            try {
              data.option = JSON.parse($target.val());
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        result = $image.cropper(data.method, data.option);
        if (data.method === 'getCroppedCanvas') {
			//	window.open(result.toDataURL("image/jpeg"));
			// location.href = result.toDataURL("image/png");
			
				var imgSrc = result.toDataURL("image/png");
				
				var tempCanvas = $('<canvas width="640" height="850" style="display:none;">').appendTo(document.body)[0];
				var tempCtx = tempCanvas.getContext("2d");
				var scaleX =   result.width/ 600 ;
				var scaleY =   result.height/ 810 ;
			//  
		
			
				//tempCtx.scale(scaleX, scaleY);
				
			
				//return false
			
				var img = new Image();
				img.onload = function() {
					tempCtx.drawImage(img, 22, 18,600,810);
					var img2 = new Image();
					img2.src= "images/style"+styleValue+".png";
					img2.onload = function(){
						tempCtx.drawImage(img2, 0, 0,640,850);	
						canvas640 = tempCanvas.toDataURL("image/JPEG");
						
				//	window.location.href = canvas640;
					
					$(".PageDiv3").hide();
					$(".PageDiv4").show();
					$("#CanvasResult").html("<img src='"+canvas640+"' width='100%'>");
					
					//document.body.removeChild(tempCanvas);
						tempCanvas = img = tempCtx = null;
					}
					
				};
				img.src = imgSrc;
        }
		


        if ($.isPlainObject(result) && $target) {
          try {
            $target.val(JSON.stringify(result));
          } catch (e) {
            console.log(e.message);
          }
        }

      }
    }).on('keydown', function (e) {

      switch (e.which) {
        case 37:
          e.preventDefault();
          $image.cropper('move', -1, 0);
          break;

        case 38:
          e.preventDefault();
          $image.cropper('move', 0, -1);
          break;

        case 39:
          e.preventDefault();
          $image.cropper('move', 1, 0);
          break;

        case 40:
          e.preventDefault();
          $image.cropper('move', 0, 1);
          break;
      }

    });


    // Import image
    var $inputImage = $('#avatarInput'),
        URL = window.URL || window.webkitURL,
        blobURL;
	//alert(URL == true)
	//console.log(window.webkitURL);
    if (URL) {
		
      $inputImage.change(function() {
    	$(".loading").show();
		$("#loadingtips").html('载入中..');
	
        var files = this.files,
            file;
			
        if (files && files.length) {
          file = files[0];
		  $("#IsUploadImage").val(1) 
          if (/^image\/\w+$/.test(file.type)) {
         // blobURL = URL.createObjectURL(file);
			
		//	var imgObj = new Image();
//			imgObj.src = blobURL; 
//			imgObj.onload = function (){
					
				 EXIF.getData(file, function() {
				 // var PixWidth = EXIF.getTag(this, 'PixelXDimension');
				  //var PixHeight = EXIF.getTag(this, 'PixelYDimension');
				//	alert(EXIF.getTag(this, 'PixelXDimension'));
				//	alert(EXIF.getTag(this, 'PixelYDimension'));
					var getOrientation = EXIF.getTag(this, 'Orientation');

					var mpImg = new MegaPixImage(file);
					
					var resCanvas2 = document.getElementById('resultCanvas2');
				
						 mpImg.render(resCanvas2, { maxWidth: 2000, maxHeight: 2000, orientation: getOrientation},function(){
						
								 $image.one('built.cropper', function () {
									//URL.revokeObjectURL(blobURL); // Revoke when load complete
							}).cropper('reset', true).cropper('replace', resCanvas2.toDataURL("image/png"));
							 });	
						
   					
		
						
					 //console.log(resCanvas2.toDataURL('JPEG'));
					 	imagewidth = resCanvas2.width;
						imageheight = resCanvas2.height;
						
					
						
				});
				
			
			//	}
          } else {
			  	$(".loading").hide();
				alert('请正确选择图片哦！！');
          }
        }
      });
 		 } else {
     		 $inputImage.parent().remove();
    }


    // Options
    $('.docs-options :checkbox').on('change', function () {
      var $this = $(this);

      options[$this.val()] = $this.prop('checked');
      $image.cropper('destroy').cropper(options);
    });


    // Tooltips
  //  $('[data-toggle="tooltip"]').tooltip();

  }());

});

