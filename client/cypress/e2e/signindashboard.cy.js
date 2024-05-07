describe('SignIn and DashboardOverview', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001');
    });

    it('should display validation error when fields are empty', () => {
        cy.get('button[type="submit"]').click();
        cy.get('p').should('contain', 'Username and password are required.');
    });

    it('should display validation error for invalid credentials', () => {
        cy.get('input[name="username"]').type('invaliduser');
        cy.get('input[name="password"]').type('invalidpassword');
        cy.get('button[type="submit"]').click();
        cy.get('p').should('contain', 'Invalid username or password.');
    });

    it('should sign in successfully with valid credentials', () => {
        cy.get('input[name="username"]').type('hello');
        cy.get('input[name="password"]').type('test');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('should navigate to sign up page when clicking on the link', () => {
        cy.get('a').contains("Don't have an account? Sign Up").click();
        cy.url().should('include', '/sign-up');
    });

    describe('DashboardOverview', () => {
        beforeEach(() => {
            // Sign in with valid credentials before each test case
            cy.visit('http://localhost:3001');
            cy.get('input[name="username"]').type('hello');
            cy.get('input[name="password"]').type('test');
            cy.get('button[type="submit"]').click();

            // Wait for the dashboard page to load
            cy.url().should('include', '/dashboard');
        });

        it('should display the dashboard metrics correctly', () => {
            // Wait for the metrics to be visible
            cy.get('.metrics div', { timeout: 10000 }).should('be.visible');

            // Assert the presence and content of the metrics
            cy.get('.metrics div').should('have.length', 4);
            cy.get('.metrics div').eq(0).should('contain', 'Total Income');
            cy.get('.metrics div').eq(1).should('contain', 'Total Budgeted Amount');
            cy.get('.metrics div').eq(2).should('contain', 'Total Expenses');
            cy.get('.metrics div').eq(3).should('contain', 'Remaining Income');
        });

        it('should display the income form and allow adding income', () => {
            // Wait for the income form to be visible
            cy.get('.income-form', { timeout: 10000 }).should('be.visible');

            // Fill in the income form and submit
            const incomeAmount = '1000';
            cy.get('#Amount').type(incomeAmount);
            cy.get('button[type="submit"]').click();

            // Wait for the income to be added to the list
            cy.get('.income-list li', { timeout: 10000 }).should('contain', `Amount: ${incomeAmount}`);
        });

        it('should display the pie chart with the correct data', () => {
            // Wait for the pie chart to be visible
            cy.get('.recharts-wrapper', { timeout: 10000 }).should('be.visible');

            // Assert the presence of the pie chart slices
            cy.get('.recharts-pie-sector').should('have.length.at.least', 1);

            // Assert the tooltips on hover
            cy.get('.recharts-pie-sector')
                .first()
                .trigger('mouseover')
                .then(() => {
                    cy.get('.recharts-tooltip-wrapper').should('be.visible');
                    cy.get('.recharts-tooltip-item').should('contain', 'Amount:');
                });
        });
    });
});