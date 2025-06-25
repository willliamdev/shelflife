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
function dateDiff(dateA, dateB) {
  const dailyMs = 1000 * 60 * 60 * 24
  let dateDiff = dateA.getTime() - dateB.getTime()
  dateDiff = Math.abs(dateDiff / dailyMs)
  return dateDiff;
}


document.addEventListener("DOMContentLoaded", () => {
  const selectTipoProduto = document.getElementById("tipoProduto")
  const tabelaPereciveisBody = document
    .getElementById("tabelaPereciveis")
    .getElementsByTagName("tbody")[0]

  for (const produto in pereciveis) {

    const option = document.createElement("option")
    option.value = produto
    option.textContent = `${produto} ${pereciveis[produto]}%`
    selectTipoProduto.appendChild(option)


    const row = tabelaPereciveisBody.insertRow()
    const cell1 = row.insertCell(0)
    const cell2 = row.insertCell(1)
    cell1.textContent = produto
    cell2.textContent = pereciveis[produto] + "%"
  }
})


function dateDiff(dateA, dateB) {
  const dailyMs = 1000 * 60 * 60 * 24
  let dateDiff = dateA.getTime() - dateB.getTime()
  dateDiff = Math.abs(dateDiff / dailyMs)
  return dateDiff;
}


function calcularShelfLife() {
  const dataFabricacaoStr = document.getElementById("dataFabricacao").value
  const dataValidadeStr = document.getElementById("dataValidade").value
  const tipoProduto = document.getElementById("tipoProduto").value

  const response = {}


  if (!dataFabricacaoStr || !dataValidadeStr) {
    response.status = 'Erro'
    response.message = "Por favor, insira as datas de fabricação e validade"
    render(response)
    return
  }

  const dataFabricacao = new Date(dataFabricacaoStr + "T00:00:00")
  const dataValidade = new Date(dataValidadeStr + "T00:00:00")
  const dataAtual = new Date()
  dataAtual.setHours(0, 0, 0, 0)

  if (dataFabricacao > dataAtual) {
    response.status = 'Erro'
    response.message = "A data de fabricação deve anteceder a data hoje!!"
    render(response)
    return
  }

  if (dataFabricacao >= dataValidade) {
    response.status = 'Erro'
    response.message = "A data de fabricação deve ser anterior à data de validade"

    render(response)
    return
  }

  if (dataAtual > dataValidade) {
    console.log("aaaaa")
    response.status = 'Erro'
    response.message = "O produto já está vencido!"
    render(response)
    return
  }

  const shelfLife = dateDiff(dataFabricacao, dataValidade)
  const daysToUse = dateDiff(dataValidade, dataAtual)

  let percentualVidaUtilRestante = 0
  if (shelfLife > 0) {
    percentualVidaUtilRestante = (daysToUse / shelfLife) * 100
  }

  percentualVidaUtilRestante = Math.max(0, percentualVidaUtilRestante)
  response.percentage = percentualVidaUtilRestante.toFixed(2)

  console.log(response)


  const minimumPercentage = pereciveis[tipoProduto]


  if (response.percentage >= minimumPercentage) {
    response.status = 'Accepted'
    response.message = `Restam ${daysToUse} dias de um total de ${shelfLife}`
    render(response)
    return
  } else {
    response.status = 'Rejected'
    response.message = `Restam ${daysToUse} dias de um total de ${shelfLife}`
    render(response)
  }
}



function render(response) {

  const resultadoDiv = document.getElementById("resultado")

  switch (response.status) {
    case 'Erro':
      response.title = "Oops!"
      response.bgColor = 'redBackground'
      response.percentageBar = 'hidden'
      console.log("a" + response.percentageBar)
      break

    case 'Rejected':
      response.title = "Não Receber"
      response.bgColor = 'redBackground'

      break
    case 'Accepted':
      response.title = "Receber"
      response.bgColor = 'greenBackground'

      break

    default:
      console.log("Log error:" + response.status)
      break
  }


  resultadoDiv.innerHTML = `
    <div id="status" class="${response.bgColor}">
      <h3>${response.title}</h3>
      <span>${response.message}</span>
    </div>

    <div class="percentage-bar-container" style="visibility: ${response.percentageBar}">
      <div class="${response.bgColor}" id="percentage-bar-fill" style="width: ${response.percentage}%">
        <p>${response.percentage}%</p>
      </div>
    </div>`
}