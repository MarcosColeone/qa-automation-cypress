describe('Produtos', () => {

  beforeEach(() => {
    cy.session('login', () => { // Cria sessão de login uma vez, e reaproveita em todos os testes
      cy.visit('https://app.expedy.com.br/dashboard');
      cy.get('#companyCode').clear().type('3');
      cy.get('#login').clear().type('expedy');
      cy.get('#password').clear().type('expedy92#');
      cy.get('.ant-btn').click();
      cy.url().should('include', '/dashboard');
    });

    // Sempre entra direto na tela de produtos
    cy.visit('https://app.expedy.com.br/produtos');

    // Garante que a tabela de produtos carregou antes de prosseguir
    cy.get('.ant-table', { timeout: 15000 }).should('be.visible');
  });

  it('Verifica a resposta do request de produtos', () => {
    cy.intercept('GET', '**/produto/all?status=true').as('getProdutos');
    cy.wait('@getProdutos').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it('Deve cadastrar um produto com sucesso', () => {
    
    cy.contains('button', 'Cadastrar', { timeout: 10000 }).click(); // Espera botão de cadastrar ficar visível

    //  Informações Gerais
    cy.get(':nth-child(2) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-search').click();
    cy.contains('.ant-select-item-option-content', 'COM VARIACAO').click();

    cy.get('.ant-col-24 > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > #name').type('Produto Teste');
    cy.get(':nth-child(1) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > #reference').type('PRODUTO123');
    cy.get('#price').type('12,00');
    cy.get('#height').type('12');
    cy.get('#width').type('12');
    cy.get('#length').type('12');
    cy.get('#weight').type('12');
    cy.get('#warranty').type('14');
    
    //  Informações do Fornecedor
    cy.get(':nth-child(2) > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-expand-icon').click();
    cy.get('#nomeProdutoFornecedor').type('Produto Fornecedor Teste');
    cy.get('#skuProdutoFornecedor').type('SKU123');
    cy.get(':nth-child(2) > .ant-collapse > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box > :nth-child(2) > :nth-child(2) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-search').click();
    
    //  Informações fiscais 
    cy.get(':nth-child(3) > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-expand-icon').click();
    cy.get('.ant-row-center > :nth-child(1) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-search').click();
    cy.get('[style="height: 288px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('#tributacao_ncm').type('12345678');
    cy.get('#tributacao_cest').type('1234567'); 
    cy.get('.ant-collapse-content-box > .ant-row-center > :nth-child(4) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-search').click();    //  Informações do deposito
    cy.get('[title="T - Produção de terceiros"] > .ant-select-item-option-content').click();

    cy.get('.ant-row > :nth-child(2) > .ant-btn > span').click(); // Botão de cadastrar produto

    cy.get('.ant-modal-content', { timeout: 5000 }).then($modal => {  // Verifica se o modal de SKU duplicado apareceu
      if ($modal.length) {
        cy.contains('button', 'Criar produto').click();
      }
    });

    cy.contains('.ant-message-notice-content', 'Produto criado com sucesso, você será redirecionado para a página do produto.', { timeout: 10000 }).should('be.visible'); // Verifica mensagem de sucesso

  });

});








