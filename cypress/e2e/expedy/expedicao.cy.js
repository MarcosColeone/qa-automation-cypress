describe('template spec', () => {
  
  before(() =>{
    cy.visit('https://expedy-hub-git-patch-removeoldfolders-expedy-source-s-team.vercel.app/expedicao');
    cy.get('#companyCode').clear().type('483')
    cy.get('#login').clear().type('expedy')
    cy.get('#password').clear().type('expedy92#')
    cy.get('.ant-btn').click()
  })
  describe('new test', () => {
    it('acessar expedição', () => {
        cy.get(':nth-child(4) > [style="display: flex; width: 100%;"] > [style="display: flex; border-radius: 5px; background-color: transparent; width: 100%;"] > div > [style="position: relative; left: 8px; padding: 10px 8px;"]').click();

            //faço intercept antes do request
        cy.intercept('GET', 'https://expedy-hub-git-patch-removeoldfolders-expedy-source-s-team.vercel.app/expedicao').as('getFornecedores');
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

})

