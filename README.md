# Calcuradora de ShelfLife
Uma aplicação web simples em **JavaScript, HTML e CSS** para calcular a **vida útil restante** de produtos com base na **data de fabricação**, **data de validade** e em **categorias de produtos** com percentuais mínimos de shelf life.


<a href="https://willliamdev.github.io/shelflife/"  target="_blank" >
  <img width="1574" height="796" alt="preview" src="https://github.com/user-attachments/assets/dca88f5b-053a-416f-9b61-426f4b3381c6" />
</a>

---

<p align="center">
  <a href="https://willliamdev.github.io/shelflife/" target="_blank">
    <img src="https://img.shields.io/badge/⚡ Testar%20Agora-00C853?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Testar Agora"/>
  </a>
</p>


## 🚀 Funcionalidades

- Seleção de categoria de produto (ex: queijos, cortes de aves, sorvetes etc.).
- Cálculo do percentual de vida útil restante (%).
- Validação de datas:
  - A data de fabricação deve ser anterior à data de validade.
  - O produto não pode estar vencido.
  - A data de fabricação não pode ser futura.
- Exibição do resultado:
  - **Receber**: produto dentro do prazo e acima do percentual mínimo.
  - **Não Receber**: produto dentro do prazo, mas abaixo do percentual mínimo.
  - **Erro**: quando há inconsistências de datas.
- Barra de progresso mostrando a porcentagem de vida útil restante.

## 📂 Estrutura do Projeto

```text
.
├── index.html        # Página principal
├── style.css         # Estilos
├── script.js         # Lógica de cálculo de shelf life
└── README.md         # Este arquivo
````
## 📌 Melhorias Futuras

* Permitir cadastro dinâmico de categorias e percentuais.
* Exportar relatórios (CSV, PDF).
* Integração com banco de dados para histórico.
