$(document).ready(function() {
if(JSON.parse(localStorage.getItem("items"))) {
		var items = JSON.parse(localStorage.getItem("items"));
		var countOfItems = items.length;
		for (var i = items.length - 1; i >= 0; i--) {
			var obj=JSON.parse(items[i]);
			if(obj.state && obj.done) {
				var segment  = $("<div class='segment state done' id='seg"+obj.id+"'><p>" +obj.value+"</p></div>");
			} else if (obj.done) {
				var segment  = $("<div class='segment done' id='seg"+obj.id+"'><p>" +obj.value+"</p></div>");
			} else if (obj.state){
				var segment  = $("<div class='segment state' id='seg"+obj.id+"'><p>" +obj.value+"</p></div>");
			} else {
				var segment  = $("<div class='segment' id='seg"+obj.id+"'><p>" +obj.value+"</p></div>");
			};
			var panelWrap = $("<div class='panelWrap'><button class='left floated ui red button'>Eliminar</button><div class='right floated'></div></div>"),
			element = segment.append(panelWrap);
			$('.segments').append(element);
		};
	} else {
		var items = [],
			countOfItems = 0;
	};
	var elm = {};
	checkSegmentsIsEmty();
	$("#taskButton").on("click",function(){
		var inptVal=$("#taskArea").val().trim();
		segment= $("<div class='segment' id='seg"+countOfItems+"'><p>" +inptVal+"</p></div>"),
		panelWrap = $("<div class='panelWrap'><button class='left floated ui red button'>Eliminar</button><div class='right floated'></div></div>"),
		element = segment.append(panelWrap);
		appendTaskToList(element,inptVal.length,inptVal,countOfItems);
		$("#taskArea").val(""); // clearing teaxtarea value after creating task
		checkSegmentsIsEmty();
		if (inptVal.length!=0) {
			countOfItems++;
		};
	});

	function checkSegmentsIsEmty() {
		$(".emptySegment").remove();
		if ($(".segments .segment").length==0) {
			var segment=$("<div class='emptySegment'>La lista está vacía ahora...</div>");
			$('.segments').append(segment);
			$('#clear').addClass('hidden');
		} else {
			$('#clear').removeClass('hidden');
		};
	};
	
	function appendTaskToList(el,lengthStr,inptVal,segmentID) {
		if (lengthStr!=0) {
			elm.value=inptVal;
			elm.id=segmentID.toString();
			items.push(JSON.stringify(elm));
			$('.segments').prepend(el);
			localStorage.setItem("items",JSON.stringify(items));
		} else {
			$('.todoWrap .infoLabel').html("Lo sentimos, las tareas no pueden estar vacías...");
			window.setTimeout(function(){
				$('.todoWrap .infoLabel').html("Comentarios");
			}, 2500);
		};
	};

	$(document).on("click", ".segment button", function(){
		removeTask($(this).parents(".segment"));
	});
	$(document).on("click", ".segment .star", function(){
		toggleState($(this).parents(".segment"));
	});
	$(document).on("click", ".segment .check", function(){
		toggleDone($(this).parents(".segment"));
	});
	$('#clear').on("click", function() {
		removeAllTasks();	
	});
	function removeAllTasks() {
		$('.ui.basic.modal').modal('show');
		$("#agreeDeleteTask").on("click",function(){
			deleteAll();
		});
		function deleteAll() {
			window.localStorage.clear();
         location.reload(true);
			return false;
		};
	};
	function removeTask(task) {
		var taskID = task.attr("id");
		$('.ui.basic.modal').modal('show');
		$("#agreeDeleteTask").on("click",function(){
			deleteIt(taskID);
		});
		function deleteIt(taskID) {
			var thisTaskID = parseInt(taskID.match(/\d+$/)[0]);
			for( var j = 0; j < items.length; j++) {
				if (JSON.parse(items[j]).id==thisTaskID) {
					items.splice(j,1);
					window.localStorage.clear();
					localStorage.setItem("items",JSON.stringify(items));
					task.remove();
					checkSegmentsIsEmty();
					break;
				};
			};
		};
	};

	function toggleState(domEl) {
		for (var i = 0; i < items.length; i++) {
			if (JSON.parse(items[i]).id == parseInt((domEl[0].id).match(/\d+$/)[0])) {
				var parseEl = JSON.parse(items[i]);
				domEl.toggleClass("state");
				parseEl.state = !parseEl.state;
				items[i] = JSON.stringify(parseEl);
				break;
			};
		}; 
		window.localStorage.clear();
		localStorage.setItem("items",JSON.stringify(items));
	};
	function toggleDone(domEl) {
		for (var i = 0; i < items.length; i++) {
			if (JSON.parse(items[i]).id == parseInt((domEl[0].id).match(/\d+$/)[0])) {
				var parseEl = JSON.parse(items[i]);
				parseEl.done = !parseEl.done;
				items[i] = JSON.stringify(parseEl);
				domEl.toggleClass('done');
				break;
			};
		}; 
		window.localStorage.clear();
		localStorage.setItem("items",JSON.stringify(items));
	};
   
});