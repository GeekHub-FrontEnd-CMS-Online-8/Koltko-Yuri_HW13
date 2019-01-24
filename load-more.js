var count = 0;
	
	$("#btnajax").click(function(){
		fetchDataAndDisplay();
	});
	
	function fetchDataAndDisplay(){
		$.ajax({
			url:"https://jsonplaceholder.typicode.com/todos",
			method:"GET"
		}).done(function(data){
			var start = count > 0 ? 6 * count : count;
			var end = start + 6;
			var str = '';
			for(var i=start; i<end; i++){
				str += '<div class="item-details">' + 
						'User Id is = ' + data[i].userId + '<br />' +
						'Id is= ' + data[i].id + '<br />' +
						'Titile is = ' + data[i].title + '<br />' +
						'</div>';
			}
			
			if(start == data.length){
				count = 0;
				$(".display__ajax").empty();
				$(".display__ajax").append("Список пройден. Начать сначала!");
				return;
			}
			
			count++;
			$(".display__ajax").empty();
			$(".display__ajax").append(str);
		})
	}