class QuoteGenerator {
    constructor() {
        // Add fallback quotes
        this.fallbackQuotes = [
            { text: "Be the change you wish to see in the world", author: "Mahatma Gandhi", category: "inspiration" },
            { text: "The only way to do great work is to love what you do", author: "Steve Jobs", category: "wisdom" }
        ];
        // Rest of the constructor remains same
        this.quotes = [];
        this.favorites = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
        this.currentQuote = null;
        this.loading = false;

        this.quoteText = document.getElementById('quote');
        this.authorText = document.getElementById('author');
        this.categoryText = document.getElementById('displayedCategory');
        this.categorySelect = document.getElementById('category');
        this.newQuoteBtn = document.getElementById('newQuote');
        this.favoriteBtn = document.getElementById('favorite');
        this.shareBtn = document.getElementById('share');
        this.favoritesList = document.getElementById('favoritesList');
        this.loadingElement = document.getElementById('loading');

        this.newQuoteBtn.addEventListener('click', () => this.getNewQuote());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        this.shareBtn.addEventListener('click', () => this.shareQuote());
        this.categorySelect.addEventListener('change', () => this.getNewQuote());

        this.getNewQuote();
    }

    async getNewQuote() {
        this.setLoading(true);
        const category = this.categorySelect.value;
        try {
            const url = category === 'all' 
                ? 'https://api.quotable.io/random'
                : `https://api.quotable.io/random?tags=${category}`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            this.currentQuote = {
                text: data.content,
                author: data.author,
                category: data.tags[0] || category
            };
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Use fallback quote when API fails
            this.currentQuote = this.fallbackQuotes[Math.floor(Math.random() * this.fallbackQuotes.length)];
        } finally {
            this.displayQuote();
            this.setLoading(false);
        }
    }
    // Rest of the class remains the same
}