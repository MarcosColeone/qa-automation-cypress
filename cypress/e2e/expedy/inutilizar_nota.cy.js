describe('inutilizar', () => {
    it('acessar tela de produto', () => {
        cy.visit('https://app.expedy.com.br');
        cy.get('#companyCode').clear().type('3');
        cy.get('#login').clear().type('expedy');
        cy.get('#password').clear().type('expedy92#');
        cy.get('.ant-btn').click();
        cy.get(':nth-child(3) > [style="display: flex; width: 100%;"] > [style="display: flex; border-radius: 5px; background-color: transparent; width: 100%;"] > div').click();
        cy.get('[style="position: absolute; left: 70px; background-color: rgb(21, 28, 51); width: 200px; border-radius: 7px;"] > :nth-child(2)').click()
        cy.get('.ant-row-start > :nth-child(3)').click()
        cy.get('.ant-modal-body > .ant-form > :nth-child(1) > .ant-col-xs-24 > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click()
        cy.get('#\\33 9 > .ant-select-item-option-content', { timeout: 10000 }).should('be.visible').click()
        cy.get(':nth-child(1) > .ant-form-item > .ant-row > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-number > .ant-input-number-input-wrap > #serie').clear().type('1')
        cy.get('#numeroinicial').clear().type('1')
        cy.get('#numerofinal').clear().type('2')
        // até aqui pode ser em outra tela
        // primeiro preciso fazer um intercept antes de fazer um request (clicar no botão)
        cy.intercept('PUT', 'https://api.expedy.com.br/faturador/inutilizar?idDadosEmpresa=39').as('putInutilizar');
        // clico no botão que faz o request
        cy.get('.ant-row-end > .ant-btn-primary').click()
        // após isso faço um .wait no tipo do put para cypress conseguir pegar as informações
        cy.wait('@putInutilizar').then((interception) => {
            const responseBody = interception.response.body; //consigo percorrer nas informações para mostrar somente o que desejo armazenando
            const responseHeaders = interception.response.headers;
            
            // mostra o código de status
            console.log('Response status code:', interception.response.statusCode);
            
            // Logue o corpo da resposta (mensagem de erro)
            console.log('Response body:', responseBody);
            
            // Caso a resposta tenha algum erro adicional, logue os cabeçalhos
            console.log('Response headers:', responseHeaders);
            
            // Aqui, o status 400 está sendo retornado pela API, logue a mensagem
            if (responseBody.message) { //vai mostrar a mensagem que retorna do código (mesmo que mostra no preview do Network)
              console.error('Erro na requisição:', responseBody.message);
            }
        });
    })
})