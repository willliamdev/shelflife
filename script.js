const pereciveis = {
  "Mercearia em Geral": 50,
  "Bacalhau Resfriado": 70,
  "Congelados Industrializados": 70,
  "Cortes Aves Resfriados": 50,
  "Cortes Bovino Resfriado": 50,
  "Cortes Frango Congelados Inatura": 60,
  "Cortes Suíno Resfriado": 70,
  "Defumados": 60,
  "Embutidos e Salsichas Resfriadas": 60,
  "Iogurtes e Laticínios em Geral": 60,
  "Leite Longa Vida": 60,
  "Leite Porto Real (Tipo A)": 40,
  "Linguiça Resfriada": 60,
  "Massa Fresca": 60,
  "Peixes Congelados": 60,
  "Queijos": 70,
  "Sorvetes": 70
}


document.addEventListener("DOMContentLoaded", () => {
  const selectTipoProduto = document.getElementById("tipoProduto");
  const tabelaPereciveisBody = document
    .getElementById("tabelaPereciveis")
    .getElementsByTagName("tbody")[0];

  for (const produto in pereciveis) {
  
    const option = document.createElement("option");
    option.value = produto;
    option.textContent = `${produto} ${pereciveis[produto]}%`;
    selectTipoProduto.appendChild(option);

  
    const row = tabelaPereciveisBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.textContent = produto;
    cell2.textContent = pereciveis[produto] + "%";
  }
});

function calcularShelfLife() {
  const dataFabricacaoStr = document.getElementById("dataFabricacao").value;
  const dataValidadeStr = document.getElementById("dataValidade").value;
  const tipoProduto = document.getElementById("tipoProduto").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!dataFabricacaoStr || !dataValidadeStr) {
    resultadoDiv.innerHTML =
      "Por favor, insira as datas de fabricação e validade.";
    resultadoDiv.style.color = "red";
    return;
  }

  const dataFabricacao = new Date(dataFabricacaoStr + "T00:00:00");
  const dataValidade = new Date(dataValidadeStr + "T00:00:00");
  const dataAtual = new Date();
  dataAtual.setHours(0, 0, 0, 0);

  if(dataFabricacao> dataAtual){
    resultadoDiv.innerHTML =
      "A data de fabricação de anteceder a data hoje: " + dataAtual.getDate();
    resultadoDiv.style.color = "red";
    return;
  }



  if (dataFabricacao >= dataValidade) {
    resultadoDiv.innerHTML =
      "A data de fabricação deve ser anterior à data de validade.";
    resultadoDiv.style.color = "red";
    return;
  }

  if (dataAtual > dataValidade) {
    resultadoDiv.innerHTML = "O produto já está vencido!";
    resultadoDiv.style.color = "red";
    return;
  }


  const diffTotalMs = dataValidade.getTime() - dataFabricacao.getTime();
  const shelfLifeTotalDias = diffTotalMs / (1000 * 60 * 60 * 24);


  const diffRestanteMs = dataValidade.getTime() - dataAtual.getTime();
  const diasRestantes = diffRestanteMs / (1000 * 60 * 60 * 24);


  let percentualVidaUtilRestante = 0;
  if (shelfLifeTotalDias > 0) {
    percentualVidaUtilRestante = (diasRestantes / shelfLifeTotalDias) * 100;
  }

  percentualVidaUtilRestante = Math.max(0, percentualVidaUtilRestante);


  const percentualEsperado = pereciveis[tipoProduto];
  let statusRecebimento = "";
  let statusColor = "";

  if (percentualVidaUtilRestante >= percentualEsperado) {
    statusRecebimento = "RECEBER";
    statusColor = "green";
  } else {
    statusRecebimento = "NÃO RECEBER";
    statusColor = "red";
  }

  resultadoDiv.innerHTML = `
    <p>Shelf Life Total: ${Math.round(shelfLifeTotalDias)} dias</p>
    <p>Dias Restantes: ${Math.round(diasRestantes)} dias</p>
    <p>% de Vida Útil Restante: <strong>${percentualVidaUtilRestante.toFixed(2)}%</strong></p>
    <p>Status: <strong style="color: ${statusColor}">${statusRecebimento}</strong></p>
`;
  resultadoDiv.style.color = "#333";
}
