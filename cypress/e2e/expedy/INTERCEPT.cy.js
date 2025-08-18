describe('new test', () => {
    it('acessar tela de produto', () => {
        cy.visit('https://app.expedy.com.br');
        cy.get('#companyCode').clear().type('3');
        cy.get('#login').clear().type('expedy');
        cy.get('#password').clear().type('expedy92#');
        cy.get('.ant-btn').click();
        cy.get(':nth-child(4) > [style="display: flex; width: 100%;"] > [style="display: flex; border-radius: 5px; background-color: transparent; width: 100%;"] > div > [style="position: relative; left: 8px; padding: 10px 8px;"]').click();

            //faço intercept antes do request
        cy.intercept('GET', 'https://api.expedy.com.br/produto/fornecedores?page=1&pageSize=10').as('getFornecedores');
            //faz o request
        cy.get('[style="position: absolute; left: 70px; background-color: rgb(21, 28, 51); width: 200px; border-radius: 7px;"] > :nth-child(3)').click();
            //aguarda o cypress obter as informações do request e mostro no console
        cy.wait('@getFornecedores').then((interception) => {
            console.log('Requisição interceptada:', interception);
        });


        //esse processo é pra quando ocorre tudo certo e retorna um GET
        //caso ocorra um erro no PUT por exemplo precisa mudar o tipo no interceptio ('putFornecedores')
        // e dar um console.log (no teste de inutilizar_nota tem)
    })
})