describe('enviar nota', () => {
    it('acessar tela de pedidos', () => {
        cy.visit('https://app.expedy.com.br');
        cy.get('#companyCode').clear().type('303');
        cy.get('#login').clear().type('expedy');
        cy.get('#password').clear().type('expedy92#');
        cy.get('.ant-btn').click();
        cy.get(':nth-child(3) > [style="display: flex; width: 100%;"] > [style="display: flex; border-radius: 5px; background-color: transparent; width: 100%;"] > div').click();

        // até aqui pode ser em outra tela


        // primeiro preciso fazer um intercept antes de fazer um request (clicar no botão)
        cy.intercept('PUT', 'https://api.expedy.com.br/orders/invoice/marketplace').as('postEnviar');
        
        // clico no botão que faz o request
        
        
        // após isso faço um .wait no tipo do put para cypress conseguir pegar as informações
        cy.wait('@postEnviar').then((interception) => {
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