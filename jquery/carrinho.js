var atualizaDados = function() {
	var carrinhos = $(".carrinho");
	carrinhos.each( function() {
		var carrinho = $(this);
		var items = carrinho.find(".item-total:visible");
		var total = 0;	
		for (var i=0; items.length > i; i++) {
			var valor = parseFloat($(items[i]).text());
			total += valor;
		};
		carrinho.find(".valor-total").text(total);
		carrinho.find(".quantidade-de-itens").text(items.length);


		var qtdItens = carrinho.find(".item-quantidade:visible");
		var qtdTotalItens = 0;
		for (var i = 0; i < qtdItens.length; i++) {
			var valor = parseFloat($(qtdItens[i]).text());
			qtdTotalItens += valor;
		};
		
	});
}

var removeItem = function(event) {
	event.preventDefault();
	var self = $(this);
	var carrinho = self.closest(".carrinho");
	var totalItem = parseFloat(carrinho.find(".qtd-unitario:visible").text());
	var valorTotal = parseFloat(carrinho.find(".valor-total").text());
	carrinho.find(".valor-total").text(valorTotal - totalItem);

	qtdProd = parseFloat(self.closest("tr").find(".item-quantidade:visible").text());
	self.closest("tr").find(".item-quantidade:visible").text(--qtdProd);
	if (qtdProd < 1) {
		self.closest("tr").hide();
	} else {
		var valor = self.closest("tr").find(".item-total");
		var valorFloat = parseFloat(valor.text());
		valor.text(valorFloat - totalItem);
	}
	atualizaDados();

};

var undo = function() {
	var carrinho = $(this).closest(".carrinho");
	carrinho.find("tr:visible").removeClass("recuperado");
	var trs = carrinho.find("tr:hidden");
	trs.show();
	trs.addClass("recuperado");
	atualizaDados();
}

var umaPropaganda = function() {
	var propagandas = ["O que acha de comprar uma motocicleta?",
           "O que acha de comprar uma lancha?",
           "O que acha de comprar uma bicicleta?",
           "O que acha de comprar uma carro?"];
	var posicao = Math.floor(propagandas.length * Math.random());
	var texto = propagandas[posicao];
	var tr = $("<tr>").addClass("propaganda").append($("<td>"));
	tr.find("td").attr("colspan", 6).text(texto);
	
	return tr;
}

var daDestaque = function() {
	$(this).addClass("hovering");

}

var tiraDestaque = function() {
	$(this).removeClass("hovering");
}

var aposInicializado = function () {
	$(".remove-item").click(removeItem);
	$(".undo").click(undo);

	$(".carrinho").each( function() {
		$(this).find("tr:nth-child(3n), tr:last").each(function() {
			umaPropaganda().insertAfter($(this));
		})
	})
	atualizaDados();


	$("tr").hover(daDestaque, tiraDestaque);



}
$(aposInicializado);