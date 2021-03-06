
$(document).ready(function() {
	/** 관리자 주문 들어온 리스트에서 주문 접수처리하는 Script */
	$('.btn-orderin-act').on('click',function(){
		var ordernum = $(this).attr('data-num');
		$.ajax({
            type: 'POST',
            datatype: 'json',
          data:{ordernum:ordernum},
            url: 'NowStockChk',
            success: function(data) {
            if(data=="end"){
                  alert("이 주문을 마지막으로 매진되는 재고가 있습니다. 확인바랍니다.");
               document.location.href = "QuickorderConfirm?ordernum=" + ordernum;               
            }else if(data=="n"){
               alert("주문 재고 중 부족한 재고가 있습니다. 확인바랍니다.");
            }else{
               alert("주문 접수처리가 완료되었습니다.");
               document.location.href = "QuickorderConfirm?ordernum=" + ordernum;
            }
         },
            error: function(xhr, status, error) {
         alert('ajax error : ' + xhr.status + error);
            }
      });
	});
	
	/** 관리자 주문 들어온 리스트에서 주문 접수 취소 처리하는 Script */
	$('.btn-orderout-act').on('click',function(){
		var ordernum = $(this).attr('data-num');
		$.ajax({
		   	type: 'POST',
		   	datatype: 'json',
 			data:{ordernum:ordernum},
		   	url: 'QuickOrderCancle',
		   	success: function(data) {
				alert("주문이 취소처리되었습니다.")
				document.location.href = "OrderList";
			},
		   	error: function(xhr, status, error) {
			alert('ajax error : ' + xhr.status + error);
		   	}
		});
	});
	
	/**온라인 주문 들어가기전 세션 체크 */
	$('#Sessionchk2').on('click',function(){
		$.ajax({
		   	type: 'POST',
		   	datatype: 'json',
		   	url: 'sessionCheck',
		   	success: function(data) {
				if(data=="n"){
		      		alert("권한이 없습니다. 로그인을 하십시오.")
					document.location.href = "memberLogin";
				}else{
					document.location.href = "Order";
				}
			},
		   	error: function(xhr, status, error) {
			alert('ajax error : ' + xhr.status + error);
		   	}
		});
	});
	
	/**온라인 주문 페이지 재료 담기 Script */
	$('.btn-cartin-act').click(function(){
		var num = $(this).attr('data-num');
		var ordernum = $('#ordernum').val();
		var procode = $('#procode'+num).val();
		var qty = $('#qty'+num).val();
		$.ajax({
		   type: 'POST',
		   datatype: 'json',
		   data:{procode:procode,qty:qty,ordernum:ordernum},
		   url: 'orderInsert',
		   success: function(data) {
		      alert("담기가 완료되었습니다.");
		   },
		   error: function(xhr, status, error) {
		      alert('ajax error : ' + xhr.status + error);
		   }
		});

	});
	
	/** 온라인 주문 페이지 주문 접수 */
	$('#orderconfirm').on('click',function(){
		var ordernum = $('#ordernum').val();
		$.ajax({
	   		type: 'POST',
	   		datatype: 'json',
	   		data:{ordernum:ordernum},
	   		url: 'orderConfirm',
	   		success: function(data) {
	      		alert("주문이 완료되었습니다.");
				document.location.href = "membermypage";
		   	},
		   	error: function(xhr, status, error) {
		   	   alert('ajax error : ' + xhr.status + error);
		   	}
		});
	});
	
	/** 온라인 주문 페이지 주문 취소 */
	$('#ordercancle').on('click',function(){
		var ordernum = $('#ordernum').val();
		$.ajax({
	   		type: 'POST',
	   		datatype: 'json',
	   		data:{ordernum:ordernum},
	   		url: 'orderCancle',
	   		success: function(data) {
	      		alert("주문이 취소되었습니다.");
				document.location.href = "index";
		   	},
		   	error: function(xhr, status, error) {
		   	   alert('ajax error : ' + xhr.status + error);
		   	}
		});
	});
	
	/** 관리자 미확인 주문 리스트 DataTables Library */
	$('#nofirmorderlist').DataTable({
		aaSorting: [],
		deferRender: true,
		scrollY: 360,
		scrollCollapse: true
	});
	$('.div-act1').on('mouseover',function(){
		$('.div-act2').css('display','block');
		$('.div-act2').css('opacity','100');
	})
	$('#product101').on('mouseover',function(){
		$('#afterproduct101').css('display','block');
		$('#afterproduct101').css('opacity','100');
	});
   
  	$('#product101').on('mouseleave',function(){
      	$('#afterproduct101').css('display','none');
      	$('#afterproduct101').css('opacity','0');
   	});
   
   	$('#product102').on('mouseover',function(){
      	$('#afterproduct102').css('display','block');
      	$('#afterproduct102').css('opacity','100');
   	});
   
   	$('#product102').on('mouseleave',function(){
      	$('#afterproduct102').css('display','none');
      	$('#afterproduct102').css('opacity','0');
   	});
   
   	$('#product103').on('mouseover',function(){
      	$('#afterproduct103').css('display','block');
      	$('#afterproduct103').css('opacity','100');
   	});
   
  	$('#product103').on('mouseleave',function(){
      	$('#afterproduct103').css('display','none');
      	$('#afterproduct103').css('opacity','0');
   	});
   
   	$('#product201').on('mouseover',function(){
      	$('#afterproduct201').css('display','block');
      	$('#afterproduct201').css('opacity','100');
   	});
   
   	$('#product201').on('mouseleave',function(){
      	$('#afterproduct201').css('display','none');
      	$('#afterproduct201').css('opacity','0');
   	});
	$('#product301').on('mouseover',function(){
      	$('#afterproduct301').css('display','block');
      	$('#afterproduct301').css('opacity','100');
   	});
   
   	$('#product301').on('mouseleave',function(){
      	$('#afterproduct301').css('display','none');
      	$('#afterproduct301').css('opacity','0');
   	});
	



})