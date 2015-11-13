$(function(){

	member.init();
	
});

var member = {
	$el : {},

	init : function(){
		console.log("init start");
		var userList = [],
			_ = this;

		$.ajax({
			method: 'GET',
			url: '/member/list',
			dataType: 'json',
			success: function(data){

				_.makeTbody(data);
				_.$el = $('#member_main');

				_.$el.on('click', '.member_info', function(){
					var email = $(this).attr('id');
					_.getMember(email);
				});
			}
		});
	},

	makeTbody : function(members){
		var $table = $('#tboard'),
			$oldTbody = $table.find('tbody'),
			$tbody = $(document.createElement('tbody')),
			i = 1;

		if($oldTbody){
			$oldTbody.remove();
		}

		$.each(members, function(index, member){
			var $tr = $(document.createElement('tr'));
			$tr.addClass('member_info');
			$tr.attr('id', member.email);

			var $td = $(document.createElement('td'));
			$td.text(i);
			$tr.append($td);

			for(prop in member){
				if(prop === 'email'){
					var $td = $(document.createElement('td'));
					$td.text(member.email);
					$tr.append($td);
				}
				if(prop === 'joinDate'){
					var $td = $(document.createElement('td'));
					$td.text(member.joinDate.substr(0, 10));
					$tr.append($td);
				}
			}
			
			i++;
			$tbody.append($tr);
		});

		$table.append($tbody);
	},

	getMember : function(email){
		var _ = this;
		_.$el = $('#gnb');
		
		var obj = {
			email : email
		};

		$.ajax({
			method: 'POST',
			url: '/member/info',
			data: obj,
			dataType: 'json',
			success: function(result){
				var member = result.user;
				_.$el.find('#my_email').val(member.email);
				_.$el.find('#my_name').val(member.name);
				_.$el.find('#my_job').val(member.job);
				_.$el.find('#profile_modal').modal();
				return false;
			}
		});
	}

}