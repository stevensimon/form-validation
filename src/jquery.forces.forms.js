/*
	jquery forces forms plugin

	Forms helper

	jquery.forcesForms( "label" ) -- get label element
	requires jquery

*/

if ( jQuery !== "undefined" ) {
(function( $ ){
	"use strict";

	var methods = {

		// $( x ).forcesForms( "label" )
		// $( x ).forcesForms( "label", { groupLabel : true })
		// return .label associated with element or containing group
		label : function( options ) {
			return this.map(function( index, domElement ) {

				var $element = $( domElement );

				if ( typeof options === "object" && options.level === "group" ) {
					return $element.closest( ".group" ).find( ".label" )[0];

				} else if ( $element.is( ":radio" )) {
					return $element.closest( "fieldset" ).find( ".label" )[0];

				} else {
					return $element.closest( "form" ).find( "label[for=" + domElement.id + "] > .label" )[0];
				}

			});
		},

		// $( x ).forcesForms( "group" )
		// return group element for item
		group : function() {
			return this.map(function( index, domElement ) {
				return $( domElement ).parentsUntil( "form", ".group" )[0];
			});
		},

		// $( x ).forcesForms( "validationMessage" )
		// return String validation message, e.g. "Must be completed"
		validationMessage : function() {

			var validityState = this[0].validity;

			if ( typeof validityState === "undefined" || validityState.valid === true ) {
				return "";

			} else if ( validityState.valueMissing ) {
				return "Must be completed";

			} else if ( validityState.typeMismatch ) {
				return "Must be an email address";
			}
		}

	},
	
	highlightActiveAncestors = function( event ) {

		var target = $( event.target ),

			ancestorQuestions = target.parentsUntil( "form" , ".group, .questions > *" )
		;

		// deactive current previously active questions
		target.closest( "form" ).find( ".questions > *, .group" ).not( ancestorQuestions ).removeClass( "active" );

		// activate current questions
		ancestorQuestions.addClass( "active" );

	};


	// highlight active ancestors when focus received
	$( "form a, input, select, textarea" ).live( "focus", highlightActiveAncestors );


	$.fn.forcesForms = function( method ) {

		// Method calling logic
		// http://docs.jquery.com/Plugins/Authoring#Plugin_Methods
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === "object" || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( "Method " +  method + " does not exist on jQuery.forcesForms" );
		}

	};


}( jQuery ));
}
