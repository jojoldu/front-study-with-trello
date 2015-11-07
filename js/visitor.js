
$(function(){
	visitor.init();
});


var visitor = {
	$el : {},

	init : function(){
		var _ = this;
		

		$('.view-modal.btn').click(function(e){
			e.preventDefault();
			_.showModal();
		});

		$('.close.btn ,#btnClose').click(function(e){
			e.preventDefault();
			_.closeModal();
		});	
	},

	showModal : function(){
		var _ = this;
		console.log('aa')
		$('#visitorModal').css('display','block')		
	},
	
	closeModal : function(){
		var _ = this;
		$('#visitorModal').css('display','none')	
	},


};





