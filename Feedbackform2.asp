﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- #BeginEditable "doctitle" -->
<title></title>
<!-- #EndEditable -->
<link href="styles/style2.css" rel="stylesheet" type="text/css">
<style type="text/css">
.style1 {
	left: 7px;
	top: 0px;
}
.style2 {
	font-size: x-large;
	color: #FF0000;
}
.style3 {
	color: #FF0000;
}
</style>
</head>

<body>

<form id="form1" runat="server">

<!-- Begin Container -->
<div id="container" class="style1" style="left: 7px; top: 0px">
	<!-- Begin Masthead -->
	<div id="masthead">
		<img src="assest/america-globe.jpg" height="66" width="95" alt="" /><p>
		<span class="style2">Lodge Creek Global Service </span>
		<span class="style3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; office (757) 
		971-3137<br />
		fax (757) 971-0345<br />
		toll-free (800) 971-8000</p>
	</div>
	<!-- End Masthead -->
	<!-- Begin Navigation -->
	<div id="navigation">
		<ul>
			<li><a href="home.html">Home</a></li>
			<li><a href="about.html">About</a></li>
			<li></li>
			<li><a href="products.html">Products</a></li>
			<li><a href="services.html">Services</a></li>
			<li></li>
			<li><a href="Feedbackform.html">Feed Back</a></li>
			<li><a href="contact.html">Contact</a></li>
		</ul>
	</div>
	<!-- End Navigation -->
	<!-- Begin Page Content -->
	<div id="page_content">
		<!-- Begin Left Column -->
		<div id="column_l">
			<!-- #BeginEditable "content" -->
			<h2>Lodge Creek Global Service</h2>
			<p>
			<asp:GridView id="GridView1" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" AutoGenerateDeleteButton="True" AutoGenerateEditButton="True" AutoGenerateSelectButton="True" CellPadding="4" DataSourceID="AccessDataSource1" EditIndex="1" ForeColor="#333333" GridLines="None" PageIndex="1" SelectedIndex="0" ShowFooter="True">
				<PagerSettings Visible="False" />
				<RowStyle BackColor="#EFF3FB" />
				<Columns>
					<asp:commandfield ShowSelectButton="True">
					</asp:commandfield>
					<asp:boundfield DataField="ID" HeaderText="ID" InsertVisible="False" ReadOnly="True" SortExpression="ID">
					</asp:boundfield>
					<asp:boundfield DataField="name" HeaderText="name" SortExpression="name">
					</asp:boundfield>
					<asp:boundfield DataField="title" HeaderText="title" SortExpression="title">
					</asp:boundfield>
					<asp:boundfield DataField="company" HeaderText="company" SortExpression="company">
					</asp:boundfield>
					<asp:boundfield DataField="address" HeaderText="address" SortExpression="address">
					</asp:boundfield>
					<asp:boundfield DataField="fax" HeaderText="fax" SortExpression="fax">
					</asp:boundfield>
					<asp:boundfield DataField="email" HeaderText="email" SortExpression="email">
					</asp:boundfield>
				</Columns>
				<FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
				<PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
				<SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
				<HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
				<EditRowStyle BackColor="#2461BF" />
				<AlternatingRowStyle BackColor="White" />
			</asp:GridView>
			<asp:AccessDataSource ID="AccessDataSource1" runat="server" DataFile="C:\Users\network admin\Desktop\CIS5610dropshipping website\database2.mdb" SelectCommand="SELECT [ID], [name], [title], [company], [address], [fax], [email] FROM [surveu]">
			</asp:AccessDataSource>
			</p>
			<p>&nbsp;</p>
			<!-- #EndEditable --></div>
	</div>
			</div>
<div id="footer">
		<p><a href="home.html">Home</a> | <a href="about.html">About</a> |&nbsp;
		<a href="contact.html">Contact</a> |
		<a href="Feedbackform.asp">Feed back form on product</a> |
		<a href="websitefeedbackform.html">Feed back form quality of the website</a> | <a href="products.html">Products</a> 
		|<a href="services.html">Services</a> |
		<a href="site_map.html">Site Map</a></p>
		<p>Copyright © 2010 Lodge Creek Global Buisness Service. All Rights Reserved.</p>
	</div>
</form>
</body>

</html>
