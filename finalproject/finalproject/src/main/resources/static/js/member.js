function doublecheck() {
	var yncheck = $('.confirmyn').val();
	if (yncheck == "n") {
		msg = "email 중복 검사를 하세요";
		$('.description').text(msg);
		$('.modal').modal('show');
	}
}

function zipcodeFind() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수
			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;
			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				fullAddr = data.jibunAddress;
			}
			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if (data.userSelectedType === 'R') {
				//법정동명이 있을 경우 추가한다.
				if (data.bname !== '') {
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if (data.buildingName !== '') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
			}
			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById('addr1').value = fullAddr;
			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('addr2').focus();
		}
	}).open();
}

$(document).ready(function() {
	$('.doublecheck').on('click', function() {
		var email = $('#email').val();
		if (email == "") {
			$('.description').text("E-mail을 입력하세요");
			$('.modal').modal('show');
			return;
		} else {
			var email = email;
			$.ajax({
				type: 'POST',
				data: { email: email },
				datatype: 'json',
				url: 'emailConfirmAjax',
				success: function(data) {
					var msg = "";
					if (data == "y") {
						msg = "사용중인 email입니다";
						$('.confirmyn').val('n');
						$('.description').text(msg);
						$('.ui.mini.modal').modal('show');
						$('#email').val('');
						$('#email').focus();
					} else {
						$('.confirmyn').val('y');
						msg = "사용 가능한 email입니다";
						$('.description').text(msg);
						$('.modal').modal('show');
					}
				},
				error: function(xhr, status, error) {
					alert('ajax error : ' + xhr.status + error);
				}
			});
		}
	});

	$(document).on('click', '#membertable td #leveleditbtn', function() {
		var row = $(this).closest('tr'); // 현재 선택된 tr을 row로 보겠다
		var td = row.children();
		var email = td.eq(1).children().children().text();
		var level = td.eq(7).children().val();
		$.ajax({
			type: 'POST',
			data: { email: email, level: level },
			datatype: 'json',
			url: 'memberUpdateAjax',
			success: function(data) {
				if (data == 'y') {
					$('#resultmessage').text("수정되었습니다.");
				} else {
					$('#resultmessage').text("수정되지않았습니다.");
				}
				$('#successmsg').css('display', "block")
					.delay(1200).queue(function() {
						$('#successmsg').css('display', "none").dequeue();
					});
			},
			error: function(xhr, status, error) {
				alert('ajax error : ' + xhr.status + error);
			}
		});
	});

	$(document).on('click', '#membertable td #leveldeletebtn', function() {
		var row = $(this).closest('tr'); // 현재 선택된 tr을 row로 보겠다
		var td = row.children();
		var email = td.eq(1).children().children().text();

		$('.mini.ui.modal.delete').modal('show');

		$('#deleteok').on('click', function() {
			$.ajax({
				type: 'POST',
				data: { email: email },
				datatype: 'json',
				url: 'memberDeleteAjax',
				success: function(data) {
					if (data == 'y') {
						row.remove();
						$('#resultmessage').text("삭제되었습니다.");
					} else {
						$('#resultmessage').text("삭제되지않았습니다.");
					}
					$('#successmsg').css('display', "block")
						.delay(1200).queue(function() {
							$('#successmsg').css('display', "none").dequeue();
						});
					$('.mini.ui.modal.delete').modal('hide');
				},
				error: function(xhr, status, error) {
					alert('ajax error : ' + xhr.status + error);
				}
			});
		});
	});

	$('.idfinder').on('click', function() {
		$('.ui.basic.modal.first').modal('show');
		$('#Idfindclick').on('click', function() {
			var name = $('#name').val();
			var gender = $('#gender').val();
			var birth = $('#birth').val();
			if (gender == 1 || gender == 3 || gender == 2 || gender == 4) {
				$.ajax({
					type: 'POST',
					data: { name: name, gender: gender, birth: birth },
					datatype: 'json',
					url: 'IdFindUP',
					success: function(data) {
						if (!data) {
							$('.ui.basic.modal.first').modal('hide');
							$('.description').text("잘못된 정보입니다.")
							$('.ui.mini.modal.second').modal('show');
						} else {
							$('.ui.basic.modal.first').modal('hide');
							$('.description').text("회원님의 이메일은 " + data + " 입니다")
							$('.ui.mini.modal.second').modal('show');
						}
					},
					error: function(xhr, status, error) {
						alert('ajax error : ' + xhr.status + error);
					}
				});
			} else {
				alert('올바론 숫자를 입력하세요(ex:1,2,3,4)')
			}

		});
	});

	$('#passwordchk').keyup(function() {
		var passwordchk = $('#passwordchk').val();
		var password = $('#password').val();
		if (passwordchk == password) {
			$('#pwdifferent').css("display", "none")
			$('#pwsame').css("display", "block")
		} else if (passwordchk != password) {
			$('#pwsame').css("display", "none")
			$('#pwdifferent').css("display", "block")
		}
	});
	$('#newpasswordchk').keyup(function() {
		var passwordchk = $('#newpasswordchk').val();
		var password = $('#newpassword').val();
		if (passwordchk == password) {
			$('#newPwdifferent').css("display", "none")
			$('#newPwsame').css("display", "block")
		} else if (passwordchk != password) {
			$('#newPwsame').css("display", "none")
			$('#newPwdifferent').css("display", "block")
		}
	});

	$('#pwshow').on('click', function() {
		$('#password').attr("type", "text");
		$('#passwordchk').attr("type", "text");
		$('#pwshow').css("display", "none");
		$('#pwhide').css("display", "block");
	});

	$('#pwhide').on('click', function() {
		$('#password').attr("type", "password");
		$('#passwordchk').attr("type", "password");
		$('#pwshow').css("display", "block");
		$('#pwhide').css("display", "none");
	});
	$(document).on('click', '#ordertable td #viewdetails', function() {
		var row = $(this).closest('tr'); // 현재 선택된 tr을 row로 보겠다
		var td = row.children();
		var ordernum = td.eq(0).children().children().text();
		$.ajax({
			type: 'POST',
			data: { ordernum: ordernum },
			datatype: 'json',
			url: 'deleteordersAjax',
			success: function(data) {
				alert('주문이 취소되었습니당');
				document.location.href = "membermypage";
			},
			error: function(xhr, status, error) {
				alert('ajax error : ' + xhr.status + error);
			}
		});
	});

	$('#findPWclick').on('click', function() {
		var email = $('#PWemail').val();
		var gender = $('#PWgender').val();
		var birth = $('#PWbirth').val();
		if (gender == 1 || gender == 3 || gender == 2 || gender == 4) {
			$.ajax({
				type: 'POST',
				data: { email: email, gender: gender, birth: birth },
				datatype: 'json',
				url: 'passwordFindUP',
				success: function(data) {
					if (data == "y") {
						document.location.href = "passwordChange?email=" + email;
					} else {
						alert("일치하는 정보가 없습니다");
					}
				},
				error: function(xhr, status, error) {
					alert('ajax error : ' + xhr.status + error);
				}
			});
		} else {
			alert('올바론 숫자를 입력하세요(ex:1,2,3,4)')
		}

	});

	$('#passwordChangeClick').on('click', function() {
		var email = $('#email').val();
		var password = $('#newpassword').val();
		$.ajax({
			type: 'POST',
			data: { password: password, email: email },
			datatype: 'json',
			url: 'passwordChangeUP',
			success: function(data) {
				if (data == "y") {
					alert("변경되었습니다");
					window.close();
				} else {
					alert("변경되지 않았습니다");
					window.close();
				}
			},
			error: function(xhr, status, error) {
				alert('ajax error : ' + xhr.status + error);
			}
		});
	});
	$('#findPWcancel').on('click', function() {
		self.close();
	});
	$('#passwordChangeCancel').on('click', function() {
		self.close();
	});
	$('#couponcancelbtn').on('click', function() {
		$('#couponyn').val(0);
		$('#couponcancelbtntd').css('display', 'none');
		$('#couponbtntd').css('display', 'block');
		$('#orderPoint').text(0);
		$('#totalPrice').text($('#orderPrice').text());
		$('#paymentstrong1').text($('#orderPrice').text());
	})
	$('#couponbtn').on('click', function() {
		var coupontext = $('#couponvalue').val();
		if (coupontext == 0) {
			alert('사용 가능한 쿠폰이 없습니다.')
		}
		else {
			$('#couponyn').val(1);
			$('#couponbtntd').css('display', 'none');
			$('#couponcancelbtntd').css('display', 'block');
			$('#orderPoint').text(6000);
			var orderPoint1 = $('#orderPoint').text();
			var orderPrice1 = $('#orderPrice').text();
			$('#totalPrice').text(orderPrice1 - orderPoint1);
			var totalPrice1 = $('#totalPrice').text();
			if (totalPrice1 < 0) {
				$('#totalPrice').text(0);
				$('#orderPoint').text(orderPrice1);
				$('#paymentstrong1').text(0);
			}
			else {
				$('#totalPrice').text();
				$('#paymentstrong1').text(totalPrice1);
			}
		}
	});

	$('#memberInsert').on('click', function() {
		var password = $('#password').val();
		var passwordchk = $('#passwordchk').val();
		var email = $('#email').val();
		var name = $('#name').val();
		var phone1 = $('#phone1').val();
		var phone2 = $('#phone2').val();
		var phone3 = $('#phone3').val();
		var birth = $('#birth').val();
		var gender = $('#gender').val();
		if (!email && !name && !phone1 && !phone2 && !phone3 && !birth && !gender) {
			alert('필수 입력 사항이 남아있습니다');
		} else {
			if (password == passwordchk) {
				$('#memberinsertform').attr('action', 'memberInsertSave').submit();
			} else {
				alert('비밀번호가 일치하지 않습니다');
			}
		}
	});
});