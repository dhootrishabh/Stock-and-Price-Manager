

  var config = {
    apiKey: "AIzaSyAeONk-f2Yi4bkcLLbdBNm-FAD6wjVw8l0",
    authDomain: "stock-manager-89d20.firebaseapp.com",
    databaseURL: "https://stock-manager-89d20.firebaseio.com",
    projectId: "stock-manager-89d20",
    storageBucket: "stock-manager-89d20.appspot.com",
    messagingSenderId: "1055440467629"
  };
  firebase.initializeApp(config);


	var databaseRef=firebase.database();
	function show(){
			
			var i=1;
			var product=document.getElementById("prod").value;
			var all=document.getElementById("allprod").checked;
			var discount=document.getElementById("discount").value;
			var gst=document.getElementById("gstid").value;
			var qty=document.getElementById("qty").value;
			var table=document.getElementById("table");
			var rateTable=document.getElementById("rateTable");
			if(discount==""){
				discount=0;
			}
			if(gst==""){
				gst=0;
			}
			if(qty==""){
				qty=0;
			}
		if(!all){

			var priceRef=databaseRef.ref('/prod/'+product+'/Price');
			priceRef.on('value',function(snapshot){
					var price=snapshot.val();
					if(price==null){
						alert("Invalid Product");
					}
					else{
						discounted=price-(price*discount/100);
						rate=discounted+(discounted*gst/100);
						var net=rate*qty;
						var row=table.insertRow(i);
						row.insertCell(0).innerHTML=product;
						row.insertCell(1).innerHTML="Rs. "+price;
						row.insertCell(2).innerHTML=discount+" %";
						row.insertCell(3).innerHTML=gst+" %";
						row.insertCell(4).innerHTML="Rs. "+rate;
						row.insertCell(5).innerHTML=qty;
						row.insertCell(6).innerHTML="Rs. "+net;

						var rateRow=rateTable.insertRow(i);
						rateRow.insertCell(0).innerHTML=product;
						rateRow.insertCell(1).innerHTML="Rs. "+rate;
						rateRow.insertCell(2).innerHTML=qty;
						rateRow.insertCell(3).innerHTML="Rs. "+net;
						i=i+1;
					}
			});
		}
		else{
			i=1;
			var prodRef=databaseRef.ref('/prod');
			prodRef.on('child_added',function(snapshot){
				a=snapshot.key;
					var priceRef=databaseRef.ref('/prod/'+a+'/Price');
					priceRef.once('value',function(snapshot){
						var price=snapshot.val();
						discounted=price-(price*discount/100);
						rate=discounted+(discounted*gst/100);
						var net=rate*qty;
						var row=table.insertRow(i);
						row.insertCell(0).innerHTML=a;
						row.insertCell(1).innerHTML="Rs. "+price;
						row.insertCell(2).innerHTML=discount+" %";
						row.insertCell(3).innerHTML=gst+" %";
						row.insertCell(4).innerHTML="Rs. "+rate;
						row.insertCell(5).innerHTML=qty;
						row.insertCell(6).innerHTML="Rs. "+net;

						var rateRow=rateTable.insertRow(i);
						rateRow.insertCell(0).innerHTML=a;
						rateRow.insertCell(1).innerHTML="Rs. "+rate;
						rateRow.insertCell(2).innerHTML=qty;
						rateRow.insertCell(3).innerHTML="Rs. "+net;
						i=i+1;
					});
			});
		}
	}

function printCon(el){
	var restore=document.body.innerHTML
	var print=document.getElementById(el).innerHTML;
	document.body.innerHTML=print;
	window.print();
	document.body.innerHTML=restore;
}

//Stock Display
	function showStock(){
			var product=document.getElementById("prod").value;
			var all=document.getElementById("allprod").checked;
			var table=document.getElementById("table");
		if(!all){

			var stockRef=databaseRef.ref('/prod/'+product+'/Stock');
			stockRef.on('value',function(snapshot){
					var stock=snapshot.val();
					if(stock==""){
						stock=0;
					}
				var row=table.insertRow(1);
				row.insertCell(0).innerHTML=product;
				row.insertCell(1).innerHTML=stock;
			});
		}
		else{
			var prodStockRef=databaseRef.ref('/prod');
			prodStockRef.on('child_added',function(snapshot){
				a=snapshot.key;
					var stockRef=databaseRef.ref('/prod/'+a+'/Stock');
					stockRef.on('value',function(snapshot){
						var stock=snapshot.val();
						if(stock==""){
							stock=0;
						}
						var row=table.insertRow(1);
						row.insertCell(0).innerHTML=a;
						row.insertCell(1).innerHTML=stock;
					});

			});
		}
	}
//New Product
	function enter(){
		var product=document.getElementById("newProduct").value;
		if(product==""){
			alert("Enter a valid Product Name");
		}
		else{
			var price=document.getElementById("cost").value;
			var stock=document.getElementById("stock").value;
			var productRef=databaseRef.ref('/prod/'+product);
			productRef.set({
				Price: price,
				Stock: stock
			});
		}
	}

function updatePrice(){
		var product=document.getElementById("updatePriceProduct").value;
		if(product==""){
			alert("Enter a valid Product Name");
		}
		else{
			var price=document.getElementById("updatedCost").value;
			var productRef=databaseRef.ref('/prod/'+product);
			productRef.update({
				Price: price
			});
		}

	}

function updateStock(){
	var item=document.getElementById("updateStockProduct").value;
	if(item==""){
		alert("Enter a valid Product Name");
	}
	else{
		var change=document.getElementById("stockChange").value;
		change=parseInt(change);
		var choice=document.getElementsByName("opt");
		var productRef=databaseRef.ref('/prod/'+item+'/Stock');
		productRef.once('value',function(snapshot){
			var data=snapshot.val();
			data=parseInt(data);
			if(choice[0].checked){
				stock=data+change;
			}
			else{
				if((data-change)<0){
					alert("Negative Stock. This operation is not allowed");
				}
				else{
					stock=data-change;
				}
			}
			stock=stock.toString();
			var stockChangeRef=databaseRef.ref('/prod/'+item);
			stockChangeRef.update({
				Stock: stock
			});
		});
	}
}

	function add(){
		document.getElementById("updateStock").style.display="none";
		document.getElementById("updatePrice").style.display="none";
		document.getElementById("new").style.display="block";
	}

	function upStock(){
		document.getElementById("new").style.display="none";
		document.getElementById("updatePrice").style.display="none";
		document.getElementById("updateStock").style.display="block";
	}

	function upPrice(){
		document.getElementById("new").style.display="none";
		document.getElementById("updateStock").style.display="none";
		document.getElementById("updatePrice").style.display="block";
	}

