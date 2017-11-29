﻿'use strict'

var walk = require('rework-walk')
var balanced = require('balanced-match')
var toSingleQuotes = require('to-single-quotes')

var PROPERTY_IDENTIFIER = 'background-image'
var VALUE_IDENTIFIER = 'image-set'
var IMAGE_DELIMITER = ','

module.exports = function () {
  return function imageSet (css) {
    walk(css, function (rule, node) {
      rule.declarations.forEach(function (declaration, i) {
        var property = declaration.property
        var value = declaration.value

        if (property === PROPERTY_IDENTIFIER && value.indexOf(VALUE_IDENTIFIER) === 0) {
          if (!balanced('(', ')', value)) {
            throw new Error(
              'rework-image-set-plus: missing closing ")" in the value "' + value + '"'
            );
          }

          value = toSingleQuotes(value);

          var openBrace = value.indexOf('(')
          var closeBrace = value.indexOf(')')
		  //获取原件路径字符
		  var vurlal = value.slice(10,closeBrace + 4)
		  //获取原件分辨率倍数字符
		  var vfor = value.slice(closeBrace + 2,closeBrace + 3)
		  
          var images = value.substr(openBrace + 1, closeBrace - openBrace - 1)
                            .split(IMAGE_DELIMITER)  

		  var vsurl = getDefaultImage(images)
		  //获取webp位置字符
		  var vsurlr = vsurl.slice(vsurl.length - 6)
		  var vsurll = vsurl.slice(0,vsurl.length - 6)
		  //获取其他图片位置字符
		  var vsurlr2 = vsurl.slice(vsurl.length - 5)
		  var vsurll2 = vsurl.slice(0,vsurl.length - 5)
		  
		  var vsurlall =[];	  
		  
		  if(vfor != " " || vfor >= 1){	
			  if(vsurlr == ".webp'"){					  
			      for(var i=1; i< vfor; i++)
				  {				  
					 vsurlall.push( 'url(' + vsurll + '@' + i + 'x' + vsurlr + ')' + ' ' + i + 'x' + ', ' )
				  }					 
			   }
			   if(vsurlr2 == ".png'" || vsurlr2 == ".jpg'" || vsurlr2 == ".gif'" || vsurlr2 == ".bmp'"){	
				  
			      for(var i=1; i< vfor; i++)
				  {				  
					 vsurlall.push( 'url(' + vsurll2 + '@' + i + 'x' + vsurlr2 + ')' + ' ' + i + 'x' + ', ' )
				  }					 
			   }
		   }
			
		   var vsurlvalur = 'image-set(' + vsurlall.join('') + vurlal + ')';
		   var vsurlbak = vsurlall[0]
		   var vsurlbaky = vsurlbak.slice(4,vsurlbak.length - 6)			

		  declaration.value = 'url(' + vsurlbaky + ')'
          rule.declarations.push({
            type: 'declaration',
            property: 'background-image',
            value: vsurlvalur
          })
        }
      })

      return rule
    })
  }
}

function getDefaultImage (images) {
  return images[0].trim().match(/'(.+?)'/)[0]
}
