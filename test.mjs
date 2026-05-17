import { chromium } from 'playwright';

async function testPage() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    
    page.on('pageerror', err => {
        errors.push(err.message);
    });
    
    try {
        await page.goto('file:///workspace/product_14_business_funding_document_prep_kit/index.html');
        await page.waitForTimeout(1000);
        
        // Check page title
        const title = await page.title();
        console.log('Page Title:', title);
        
        // Check hero section
        const heroText = await page.textContent('.hero h1');
        console.log('Hero Text:', heroText);
        
        // Check pricing section exists
        const pricingCards = await page.$$('.pricing-card');
        console.log('Pricing Cards Found:', pricingCards.length);
        
        // Check FAQ accordion
        const faqItems = await page.$$('.faq-item');
        console.log('FAQ Items Found:', faqItems.length);
        
        // Test FAQ click
        await page.click('.faq-question');
        console.log('FAQ click works');
        
        // Check navigation
        const navLinks = await page.$$('nav a');
        console.log('Navigation Links:', navLinks.length);
        
        // Check content cards
        const contentCards = await page.$$('.content-card');
        console.log('Content Cards Found:', contentCards.length);
        
        if (errors.length > 0) {
            console.log('\nConsole Errors:', errors);
        } else {
            console.log('\nNo console errors detected');
        }
        
        console.log('\n✓ Page loaded successfully');
        
    } catch (e) {
        console.error('Test failed:', e.message);
    }
    
    await browser.close();
}

testPage();