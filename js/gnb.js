$(function(){
	gnb.init();
});

var gnb = {
	$el : {},

	init : function(){
		var _ = this;
		_.$el = $('#gnb');

		_.$el.find('#btn_profile').click(function(){
			_.showModal();
		});

		_.$el.find('#btn_profile_close').click(function(){
			_.closeModal();
		});	

		_.$el.find('#btn_profile_submit').click(function(){
			_.saveProfile();
		});

		_.$el.find('#btn_logout').click(function(){
			_.logout();
		});
	},

	showModal : function(){
		var _ = this;
		_.resetModal();
		_.getProfile();
	},
	
	closeModal : function(){
		var _ = this;
		_.$el.find('#profile_modal').modal('hide');
	},

	resetModal : function(){
		var _ = this;
		_.$el.find('.sign_forms').val('');
	},

	getProfile : function(){
		var _ = this;

		$.ajax({
			method: 'GET',
			url: '/profile',
			dataType: 'json',
			success: function(data){
				_.$el.find('#my_email').val(data.email);
				_.$el.find('#my_name').val(data.name);
				_.$el.find('#my_job').val(data.job);
				_.$el.find('#profile_modal').modal();
				return false;
			}
		});
	},

	saveProfile : function(){
		var _ = this;
		var obj = {
			email : _.$el.find('#my_email').val(),
			originPassword : _.$el.find('#my_origin_password').val(),
			newPassword : _.$el.find('#my_new_password').val(),
			name : _.$el.find('#my_name').val(),
			job : _.$el.find('#my_job').val(),
		};

		$.ajax({
			method: 'POST',
			url: '/profile',
			data: obj,
			dataType: 'json',
			success: function(result){
				if(!result.status){
					alert('비밀번호가 잘못되었습니다.');
					return false;
				}
				var user = result.user;
				alert('회원정보가 변경되었습니다.');
				_.$el.find('#my_name').val(user.name);
				_.$el.find('#my_job').val(user.job);
				return false;
			}
		});
	},

	logout : function(){
		var _ = this;

		$.ajax({
			method: 'GET',
			url: '/logout',
			dataType: 'json',
			success: function(resultSession){
				if(!resultSession){
					location.href=location.origin+'/';
				}
				return false;
			}
		});
	}

}