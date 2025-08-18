describe('produtos', () => {

  beforeEach(() => {
    cy.visit('https://expedy-hub-git-uc-newdispatchlistid-expedy-source-s-team.vercel.app/');
    
    cy.get('#companyCode').clear().type('3');
    cy.get('#login').clear().type('expedy');
    cy.get('#password').clear().type('expedy92#');
    cy.get('.ant-btn').click();

    cy.url().should('include', '/dashboard'); //confirmação do login

    cy.get(':nth-child(4) > [style="display: flex; width: 100%;"] > .styles_sidebar-hover__CnLTP > div > [style="position: relative; left: 8px; padding: 10px 8px;"] > svg').click();
    cy.get('[style="position: absolute; left: 70px; background-color: rgb(21, 28, 51); width: 200px; border-radius: 7px;"] > :nth-child(1) > span').click();
  });

  it('Verifica a resposta do request de produtos', () => {
    cy.intercept('GET', 'https://api.expedy.com.br/produto/all?status=true').as('getProdutos');

    cy.wait('@getProdutos').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('format', 'COM VARIAÇÃO');
    });
  });

});

/*  
  it('cy.request() - verify response using BDD syntax', () => {
    cy.request('https://app.expedy.com.br/_next/data/KegpIZ7MS0X1hEtHUKiFP/produtos.json')
    .then((response) => {
      expect(response).property('status').to.equal(200)
      expect(response).property('body').to.have.property('length').and.be.oneOf([500, 501])
      expect(response).to.include.keys('headers', 'duration')
    })
  })


  /*it('deve cadastrar um produto com sucesso', () => {
    cy.get(':nth-child(4) > [style="display: flex; width: 100%;"] > .styles_sidebar-hover__CnLTP > div > [style="position: relative; left: 8px; padding: 10px 8px;"] > svg').click();
    cy.get('[style="position: absolute; left: 70px; background-color: rgb(21, 28, 51); width: 200px; border-radius: 7px;"] > :nth-child(1) > span').click();
    cy.get('.ant-btn-icon-end > :nth-child(2)').click();
    cy.get('.ant-col-24 > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > #name').type('Descrição 1234_||');
    cy.get('.ant-btn').should('be.visible'); 
    cy.get(':nth-child(1) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > #reference').type('SKU_12-3');
    cy.get('#format').click();
    cy.get('[title="COM VARIACAO"] > .ant-select-item-option-content').click();
    cy.get('#price').type('12,00');
    cy.get('#height').type('12');
    cy.get('#width').type('12');
    cy.get('#length').type('12');
    cy.get('#weight').type('12');
    cy.get('#warranty').type('14');
    cy.get(':nth-child(2) > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click()
    cy.get('#nomeProdutoFornecedor').type('mira');
    cy.get('#skuProdutoFornecedor').type('SKU123')
    cy.get(':nth-child(2) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-search > #idFornecedor').click().type('XING LING')

    // cy.get('.ant-row > :nth-child(2) > .ant-btn > span').click();   AQUI CLICA NO BOTÃO PARA CADASTRO O PRODUTO
  });
});*/
