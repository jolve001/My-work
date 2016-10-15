/////////////////////////////////////////////////////////////////////////////
//
// cookie stuff
//

function save_cookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000))
		var expires = "; expires="+date.toGMTString()
	}
	else expires = ""
	document.cookie = name+"="+value+expires+"; path=/"
}

function read_cookie(name) {
	var nameEQ = name + "="
	var ca = document.cookie.split(';')
	for(var i=0;i<ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length)
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length)
	}
	return null
}

function delete_cookie(name) {
	save_cookie(name, "", -1);
}

/////////////////////////////////////////////////////////////////////////////
//
// product stuff
//

var g_currency = '£';
var g_decimal = '.';
var g_thousand = ',';
var g_cookiedays = 365;
var g_havebasket = 0;
var g_discount = .10;
var g_products = new Array();

function add_product(guid, name, price){
	var item = new Array(guid, name, price);
	g_products[g_products.length] = item;
}

function get_qty(guid){
	var cookie = read_cookie(guid+'_qty');
	if ((cookie != null) && (cookie != '')){
		return parseInt(cookie);
	}else{
		return 0;
	}
}

function set_qty(guid, qty){
	if (qty < 0) qty = 0;
	if (!qty){
		delete_cookie(guid+'_qty');
	}else{
		save_cookie(guid+'_qty', parseInt(qty), g_cookiedays);
	}
}

function add_item(guid, qty){
	set_qty(guid, get_qty(guid) + parseInt(qty));
	update_basket();
}

function remove_item(guid){
	set_qty(guid, 0);
	update_basket();
}

function empty_basket(){
	for(var i=0; i<g_products.length; i++){
		var product = g_products[i];
		var guid = product[0];
		remove_item(guid);
	}
}

/////////////////////////////////////////////////////////////////////////////
//
// basket stuff
//

function build_basket(container_id, checkout_url){
	var cell, row;
	var elm_parent = document.getElementById(container_id);

	var elm_table = create_element(elm_parent, 'TABLE');
	elm_table.setAttribute('border', '1');
	elm_table.setAttribute('cellPadding', '4');
	elm_table.setAttribute('cellSpacing', '0');

	// we have to have a tbody for some reason
	var elm_tbody = create_element(elm_table, 'TBODY');

	// add header row
	row = create_element(elm_tbody, 'TR');
	cell = create_element_filled(row, 'TH', 'Product');
	cell = create_element_filled(row, 'TH', 'Price');
	cell = create_element_filled(row, 'TH', 'Quantity');
	cell = create_element_filled(row, 'TH', 'Delete');
        cell = create_element_filled(row, 'TH', 'discount');
	cell = create_element_filled(row, 'TH', 'Total');
        

	var sub_total = 0;

	// add product rows
	for(var i=0; i<g_products.length; i++){
		var product = g_products[i];

		var guid = product[0];
		var name = product[1];
		var price = product[2];
		var qty = get_qty(guid);

		var total = price*qty;
                sub_total += total;
                var discount = total * .10;

		row = create_element(elm_tbody, 'TR');
		row.style.display = 'none';
		row.id = 'basket_row_'+guid;

		cell = create_element_filled(row, 'TD', name);

		cell = create_element_filled(row, 'TD', format_price(price));
		cell.setAttribute('align', 'right');

		cell = create_element_filled(row, 'TD', 'QTY');
		cell.setAttribute('align', 'right');

		var input = document.createElement('INPUT');
		input.id = 'basket_input_'+guid;
		input.value = qty;
		input.size = 10;
		input.style.textAlign = 'right';
		input.onblur = update_qty;
		replace_contents(cell, input);

		cell = create_element(row, 'TD');
		var link = create_element_filled(cell, 'A', 'Remove');
		link.href = "Javascript:remove_item('"+guid+"');";

		cell = create_element_filled(row, 'TD', 'TOTAL');
		cell.setAttribute('align', 'right');
	}

	// add "empty" row
	row = create_element(elm_tbody, 'TR');
	row.style.display = 'none';
	row.id = 'basket_empty_row';
	cell = create_element(row, 'TD');
	cell.setAttribute('colSpan', '5');
	cell.setAttribute('align', 'center');
	create_element_filled(cell, 'I', 'Your basket is empty');

	// show totals
	row = create_element(elm_tbody, 'TR');

	cell = create_element_filled(row, 'TH', 'Total:');
	cell.setAttribute('colSpan', '4');
	cell.setAttribute('align', 'left');

	cell = create_element_filled(row, 'TD', format_price(sub_total));
	cell.setAttribute('align', 'right');
	cell.id = 'basket_subtotal';

	// checkout button
	row = create_element(elm_tbody, 'TR');
	row.id = 'basket_checkout';
	row.style.display = 'none';

	cell = create_element(row, 'TD');
	cell.setAttribute('colSpan', '5');
	cell.setAttribute('align', 'right');

	link = create_element_filled(cell, 'A', 'Checkout »');
	link.href = checkout_url;

	g_havebasket = 1;
	update_basket();
}

function update_basket(){
	if (!g_havebasket) return;

	var sub_total = 0;

	// update product rows
	for(var i=0; i<g_products.length; i++){
		var product = g_products[i];

		var guid = product[0];
		var name = product[1];
		var price = product[2];
		var qty = get_qty(guid);

		var total = price*qty;
		sub_total += total;

		var row = document.getElementById('basket_row_'+guid);
		row.style.display = (qty > 0)?'':'none';

		// update qty
		var input = document.getElementById('basket_input_'+guid);
		input.value = qty;		

		// update total
		replace_contents(row.childNodes[4], document.createTextNode(format_price(total)));

	}

	var row = document.getElementById('basket_empty_row');
	row.style.display = (sub_total > 0)?'none':'';

	var cell = document.getElementById('basket_subtotal');
	replace_contents(cell, document.createTextNode(format_price(sub_total)));

	var row = document.getElementById('basket_checkout');
	row.style.display = (sub_total > 0)?'':'none';
}

function update_qty(){
	if (!g_havebasket) return;

	for(var i=0; i<g_products.length; i++){
		var product = g_products[i];

		var guid = product[0];

		var row = document.getElementById('basket_row_'+guid);
		var cell = row.childNodes[2];
		var input = cell.childNodes[0];

		set_qty(guid, input.value);
	}

	update_basket();
}

function insert_basket_contents(node_name){
	var qty = 0;
	var node = document.getElementById(node_name);

	for(var i=0; i<g_products.length; i++){
		var product = g_products[i];
		var guid = product[0];
		qty += get_qty(guid);
	}

	if (qty){
		if (qty == 1){
			s = "Your basket contains 1 item.";
		}else{
			s = "Your basket contains "+qty+" items.";
		}
	}else{
		s = "Your basket is empty.";
	}

	replace_contents(node, document.createTextNode(s));
}

function get_order_copy(){

	var sub_total = 0;
	var items = 0;
	var buffer = '';

	// update product rows
	for(var i=0; i<g_products.length; i++){
		var product = g_products[i];

		var guid = product[0];
		var name = product[1];
		var price = product[2];
		var qty = get_qty(guid);
		items += qty;

		var total = price*qty;
		sub_total += total;

		if (qty > 0){
			buffer += name+" ("+guid+") x"+qty+" @ "+format_price(price)+" = "+format_price(total)+"\n";
		}
	}
	buffer += "\nTotal: ("+items+" items) "+format_price(sub_total)+"\n";

	return buffer;
}

/////////////////////////////////////////////////////////////////////////////
//
// DOM helper stuff
//

function create_element(parent, type){
	var elm = document.createElement(type);
	parent.appendChild(elm);
	return elm;
}

function create_element_filled(parent, type, contents){
	var elm = document.createElement(type);
	parent.appendChild(elm);
	elm.appendChild(document.createTextNode(contents));
	return elm;
}

function replace_contents(node, newnode){
	if (node.childNodes.length > 0){
		node.replaceChild(newnode, node.childNodes[0]);
	}else{
		node.appendChild(newnode);
	}
}

/////////////////////////////////////////////////////////////////////////////
//
// format stuff
//

function format_price(price){
	var s = new String(Math.round(price*100));
	var pence = s.substr(s.length-2);
	var pounds = s.substr(0, s.length-2);
	pounds = commaify(pounds);

	if (pence.length == 0) pence = '00';
	if (pence.length == 1) pence = '0'+pence;
	if (pounds.length == 0) pounds = '0';

	return g_currency + pounds + g_decimal + pence;
}

function commaify(s){
	if (s.length <= 3) return s;
	var out = s.substr(s.length-3);
	s = s.substr(0, s.length-3);
	while(s.length > 0){
		out = s.substr(s.length-3) + g_thousand + out;
		if (s.length > 3){
			s = s.substr(0, s.length-3);
		}else{
			s = '';
		}
	}
	return out;
}