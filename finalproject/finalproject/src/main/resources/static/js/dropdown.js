var index = 0;
window.onload = function() {
	slideShow();
	semantic.dropdown = {};
}

function slideShow() {
	var i;
	var x = document.getElementsByClassName("slide1");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	index++;
	if (index > x.length) {
		index = 1;
	}
	x[index - 1].style.display = "block";
	setTimeout(slideShow, 4000);
}

// ready event
semantic.dropdown.ready = function() {

	// selector cache
	var
		$examples = $('.example'),
		$hoverDropdown = $examples.filter('.hover').find('.ui.dropdown'),
		$clearingDropdown = $examples.filter('.clearing').find('.ui.dropdown'),
		$buttonDropdown = $examples.filter('.button.example').find('.ui.dropdown'),
		$dropdown = $examples.filter('.dropdown').find('.menu > .item > .ui.dropdown, .menu > .item.ui.dropdown, > .ui.dropdown:not(.simple), .inline.dropdown, .icon.buttons .button, .form .dropdown.selection'),
		$transition = $examples.filter('.transition').find('.ui.dropdown'),
		$simpleDropdown = $examples.filter('.simple').find('.ui.dropdown'),
		$transitionButton = $examples.filter('.transition').find('.ui.button').first(),
		$categoryDropdown = $examples.filter('.category').find('.ui.dropdown'),
		// alias
		handler
		;

	// event handlers
	handler = {

	};

	$transitionButton
		.on('click', function(event) {
			$transition.dropdown('toggle');
			event.stopImmediatePropagation();
		})
		;

	$clearingDropdown
		.dropdown({
			clearable: true
		})
		;

	$transition
		.dropdown({
			onChange: function(value) {
				$transition.dropdown('setting', 'transition', value);
			}
		})
		;

	$categoryDropdown
		.dropdown({
			allowCategorySelection: true
		})
		;

	$dropdown
		.dropdown()
		;
	$hoverDropdown
		.dropdown({
			on: 'hover',
			action: 'hide'
		})
		;
	$simpleDropdown
		.dropdown({
			action: 'hide'
		})
		;
	$buttonDropdown
		.dropdown({
			action: 'hide'
		})
		;

};


// attach ready event
$(document)
	.ready(semantic.dropdown.ready)
	;