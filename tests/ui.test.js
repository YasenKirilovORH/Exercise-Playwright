const { test, expect } = require('@playwright/test');

test("Verify 'All Books' link is visible", async( {page} ) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.locator('//a[@href="/catalog"]');

    const isLinkVisible = await allBooksLink.isVisible();

    expect(isLinkVisible).toBe(true);
});

test("Verify 'Login' button is visible", async ( {page} ) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.locator('a[href="/login"]');

    const isButtonVisible = await loginButton.isVisible();

    expect(isButtonVisible).toBe(true);
});

test("Verify 'Register' button is visible", async ( {page} ) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const registerButton = await page.locator('//a[@href="/register"]');

    const isButtonVisible = await registerButton.isVisible();

    expect(isButtonVisible).toBe(true)
});

test("Verify 'All Books' button is visible after login", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksButton = await page.locator('a[href="/catalog"]');

    const allBooksIsVisible = await allBooksButton.isVisible();

    expect(allBooksIsVisible).toBe(true);
});

test("Verify 'My Books' button is visible after login", async ( {page} ) => {
   await page.goto('http://localhost:3000/login');
   await page.fill('input[name="email"]', 'peter@abv.bg');
   await page.fill('input[name="password"]', '123456');
   await page.click('input[type="submit"]');

   const myBooksButton = await page.locator('//a[@href="/profile"]');

   const myBooksButtonIsVisible = await myBooksButton.isVisible();

   expect(myBooksButtonIsVisible).toBe(true);
});

test("Verify user's email is visible after login", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const usersEmail = page.locator('a[href="/profile"]');

    const uersEmailIsVisible = await usersEmail.isVisible();

    expect(uersEmailIsVisible).toBe(true);
});

test("Login with valid credentials", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await expect(page.locator('//a[@href="/catalog"]')).toBeVisible();

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test("Submit 'Login form' with empty input fields", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await page.click('input[type="submit"]');

    await page.locator('//a[@href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test("Submit 'Login form' with empty email field", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.locator('//a[@href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test("Submit 'Login form' with empty password field", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.locator('//a[@href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test("Register with valid credentials", async ( {page} ) => {
    let random = Math.floor(Math.random() * 1000);

    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', `yasen${random}@abv.bg`);
    await page.fill('input[name="password"]', 'a1a2a3');
    await page.fill('input[name="confirm-pass"]', 'a1a2a3');
    await page.click('#register-form input[type="submit"]');

    
    await expect(page.locator('//a[@href="/catalog"]')).toBeVisible();
    

    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test("Submit 'Register form' with empty input fields", async ( {page} ) => {
    await page.goto('http://localhost:3000/register');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.locator('//a[@href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Submit 'Register form' with empty email field", async ( {page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="password"]', 'a1a2a3');
    await page.fill('input[name="confirm-pass"]', 'a1a2a3');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.locator('//a[@href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Submit 'Register form' with empty password field", async ( {page} ) => {
    let random = Math.floor(Math.random() * 1000);

    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', `ivan${random}@gmail.com`);
    await page.fill('input[name="confirm-pass"]', "12345678");

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.locator('a[href="/register"');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Submit 'Register form' with empty confirm password field", async ( {page} ) => {
    let random = Math.floor(Math.random() * 1000);

    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', `ivan${random}@gmail.com`);
    await page.fill('input[name="password"]', "12345678");

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.locator('a[href="/register"');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Submit 'Register form' with mismatching passwords", async ( {page} ) => {
    let random = Math.floor(Math.random() * 1000);

    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', `something${random}@gmail.com`);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '654321');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    });

    await page.click('input[type="submit"]');

    await page.locator('//a[@href="/register"');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test("Add book with correct data", async ( {page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'Some description');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test("Add book with empty title field", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#description', 'Some description 2');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.locator('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test("Add book with empty description field", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Some New Title');
    await page.fill('#image', '/test/test.jpg');
    await page.selectOption('#type', 'Romance');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('#create-form input[type="submit"]');

    await page.locator('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test("Add book with empty image field", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    Promise.all([
        await page.click('input[type="submit"]'),
        await page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/create"]');

    await page.waitForSelector('#create-form');

    await page.fill('#title', 'Some New Title22');
    await page.selectOption('#type', 'Romance');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.click('#create-form input[type="submit"]');

    await page.locator('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test("Login and verify that all books are displayed", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const bookElements = await page.$$('.other-books-list li');

    expect(bookElements.length).toBeGreaterThan(0);
});

test("Login and verify that no books are displayed and error is present when there are no books", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.waitForSelector('.dashboard');

    const noBooksMessage = await page.textContent('.no-books');

    expect(noBooksMessage).toBe('No books in database!');
});

test("Login and navigate to Details page", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('//a[@href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a[href="/details/f6f54fcd-0469-470b-8ffa-a33ae6c7a524"]');

    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('To Kill a Mockingbird');
});

test("Check if a guest can see the 'Details' button", async ( {page} ) => {
    await page.goto('http://localhost:3000');
    await page.click('//a[@href="/catalog"]');

    await page.waitForSelector('.otherBooks');
    
    await page.click('.otherBooks a[href="/details/f6f54fcd-0469-470b-8ffa-a33ae6c7a524"]');

    await page.waitForSelector('.book-information');

    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('To Kill a Mockingbird');
});

test("Check if all info is displayed correctly for a book", async ( {page} ) => {
    await page.goto('http://localhost:3000');
    await page.click('//a[@href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a[href="/details/f6f54fcd-0469-470b-8ffa-a33ae6c7a524"]');

    await page.waitForSelector('.book-information');

    const bookClassType = await page.textContent('.book-information .type');
    const bookDescription = await page.textContent('.book-description p');
    const bookImage = await page.locator('.book-information p.img');
    const heartImage = await page.locator('.book-information .likes .hearts');
    const likesText = await page.textContent('.book-information #total-likes');

    expect(bookClassType).toBe('Type: Classic');
    expect(bookDescription).toBe('The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.');
    await expect(bookImage).toBeVisible();
    await expect(heartImage).toBeVisible();
    expect(likesText).toBe('Likes: 0');
});

test("Verify if Edit and Delete buttons are visible for creator", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/profile"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a.button');

    const editButton = await page.textContent('.book-information .actions a.button');
    const deleteButton = await page.textContent('.book-information .actions a[href="javascript:void(0)"]');
    expect(editButton).toBe('Edit');
    expect(deleteButton).toBe('Delete');
});

test("Verify if Edit and Delete buttons are not visible for non-creator", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a[href="/details/2949b54d-b163-4a00-b65c-41fb8b641561"]');

    const isEditButtonVisible = await page.locator('.book-information .actions a[href^="/edit"]').isVisible();
    const isDeleteButtonVisible = await page.locator('.book-information .actions a[href="javascript:void(0)"]').isVisible();

    expect(isEditButtonVisible).toBeFalsy();
    expect(isDeleteButtonVisible).toBeFalsy();
});

test("Verify if Like button is not visible for creator", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a[href="/details/2949b54d-b163-4a00-b65c-41fb8b641561"]');

    const isLikeButtonVisible = await page.locator('.book-information .actions a.button', { hasText: "Like" }).isVisible();

    expect(isLikeButtonVisible).toBeFalsy();
});

test("Verify if Like button is visible for non-creator", async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    await page.click('a[href="/catalog"]');

    await page.waitForSelector('.otherBooks');

    await page.click('.otherBooks a[href="/details/2949b54d-b163-4a00-b65c-41fb8b641561"]');

    await page.waitForSelector('.book-information .actions a.button', { hasText: "Like", timeout: 5000 });

    const isLikeButtonVisible = await page.locator('.book-information .actions a.button', { hasText: "Like" }).isVisible();

    await expect(isLikeButtonVisible).toBeTruthy();
});

test('Verify that Logout button is visible', async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    const logoutButton = await page.locator('#user a[href="javascript:void(0)"]');
    const isLogoutButtonVisible = await logoutButton.isVisible();

    expect(isLogoutButtonVisible).toBeTruthy();
});

test('Verify redirection of Logout link after user logout', async ( {page} ) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'john@abv.bg');
    await page.fill('input[name="password"]', '123456');
    
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);

    const logoutLink = await page.locator('#user a[href="javascript:void(0)"]');
    await logoutLink.click();

    const redirectedURL = page.url();

    expect(redirectedURL).toBe('http://localhost:3000/catalog');
});