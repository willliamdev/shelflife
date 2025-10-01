const categories = {
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
  "Queijos Dom Pedro": 50,
  "Sorvetes": 70
}

function dateDiff(dateA, dateB) {
  const dailyMs = 1000 * 60 * 60 * 24
  let dateDiff = dateA.getTime() - dateB.getTime()
  dateDiff = Math.abs(dateDiff / dailyMs)
  return dateDiff;
}

document.addEventListener("DOMContentLoaded", () => {
  const categoriesOptions = document.getElementById("category")
  
  for (const category in categories) {

    const option = document.createElement("option")
    option.value = category
    option.textContent = `${category} ${categories[category]}%`
    categoriesOptions.appendChild(option)

  }
})

function dateDiff(dateA, dateB) {
  const dailyMs = 1000 * 60 * 60 * 24
  let dateDiff = dateA.getTime() - dateB.getTime()
  dateDiff = Math.abs(dateDiff / dailyMs)
  return dateDiff;
}

function calcShelfLife() {
  const manufactureDateStr = document.getElementById("manufactureDate").value
  const sellByDateStr = document.getElementById("sellByDate").value
  const selectedCategory = document.getElementById("category").value
  const response = {}

  if (!manufactureDateStr || !sellByDateStr) {
    response.status = 'Erro'
    response.message = "Por favor, insira as datas de fabricação e validade"
    render(response)
    return
  }

  const manufactureDate = new Date(manufactureDateStr + "T00:00:00")
  const sellByDate = new Date(sellByDateStr + "T00:00:00")
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (manufactureDate > today) {
    response.status = 'Erro'
    response.message = "A data de fabricação deve anteceder a data hoje!!"
    render(response)
    return
  }

  if (manufactureDate >= sellByDate) {
    response.status = 'Erro'
    response.message = "A data de fabricação deve ser anterior à data de validade"

    render(response)
    return
  }

  if (today > sellByDate) {
    response.status = 'Erro'
    response.message = "O produto já está vencido!"
    render(response)
    return
  }

  const shelfLife = dateDiff(manufactureDate, sellByDate)
  const daysToUse = dateDiff(sellByDate, today)

  let percentualVidaUtilRestante = 0
  if (shelfLife > 0) {
    percentualVidaUtilRestante = (daysToUse / shelfLife) * 100
  }

  percentualVidaUtilRestante = Math.max(0, percentualVidaUtilRestante)
  response.percentage = percentualVidaUtilRestante.toFixed(1)
  response.minimumPercentage = categories[selectedCategory]

  if (response.percentage >= response.minimumPercentage) {
    response.status = 'Accepted'
    response.message = (`Ainda restam ${daysToUse} dias de ${shelfLife}`)
    render(response)
    return
  } else {
    response.status = 'Rejected'
    response.message = (`Restam apenas ${daysToUse} dias de ${shelfLife}<br><br>
      Mínimo de shelflife: ${response.minimumPercentage}%`)
    render(response)
  }
}

function render(response) {
  const result = document.getElementById("result")

  switch (response.status) {
    case 'Erro':
      response.title = "Oops!"
      response.bgColor = 'redBackground'
      response.percentageBar = 'hidden'
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

  result.innerHTML = `
    <div id="status" class="${response.bgColor}">
        <h3>${response.title}</h3>
        <span>${response.message}</span>
        
        <div class="percentage-bar-container" style="visibility: ${response.percentageBar}">
            <div class="${response.bgColor}" id="percentage-bar-fill" style="width: ${response.percentage}%">
                <p>${response.percentage}%</p>
            </div>
        </div>
    </div>
    `
}
