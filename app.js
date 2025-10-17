// TeknoPreneur E-commerce Platform
// Main Application JavaScript

// Application State
let currentUser = 'customer'; // 'customer' or 'admin'
let currentPage = 'home';
let currentProduct = null;
let currentConversation = null;
let cart = [];
let searchTerm = '';
let selectedCategories = [];
let priceRange = 200;
let sortBy = 'name';
let currentAdminSection = 'dashboard';

// Interface Detection - ADD THIS
const isAdminInterface = document.title.includes('Admin') || window.location.pathname.includes('admin.html');
const isCustomerInterface = !isAdminInterface;
window.currentInterface = isAdminInterface ? 'admin' : 'customer';

// Sample Data
const products = [
    {
        id: 1,
        name: "Handwoven Bamboo Basket",
        price: 450.00,
        category: "Home Decor",
        image: '<img src="images/bamboo1.png" alt="Ceramic Clay Pot Set" />',
        description: "Beautiful handwoven bamboo basket perfect for storage or decoration. Crafted by skilled artisans using traditional techniques passed down through generations.",
        stock: 15,
      
    },
    {
        id: 2,
        name: "Ceramic Clay Pot Set",
        price: 89.99,
        category: "Pottery",
        image: '<img src="images/pot1.png" alt="Ceramic Clay Pot Set" />',
        description: "Set of 3 handcrafted ceramic pots with traditional designs. Perfect for cooking or decorative purposes. Each piece is unique and tells a story.",
        stock: 8,
        
    },
    {
        id: 3,
        name: "Silver Wire Jewelry",
        price: 35.50,
        category: "Jewelry",
        image: '<img src="images/jew1.png" alt="Ceramic Clay Pot Set" />',
        description: "Elegant silver wire bracelet with intricate patterns. Handcrafted with attention to detail and designed to last a lifetime.",
        stock: 22,
        
    },
    {
        id: 4,
        name: "Wooden Carved Figurine",
        price: 65.00,
        category: "Wood Crafts",
        image: '<img src="images/wooden1.png" alt="Ceramic Clay Pot Set" />',
        description: "Hand-carved wooden figurine representing traditional folklore. Made from sustainable wood sources with eco-friendly finishes.",
        stock: 12,
        
    },
    {
        id: 5,
        name: "Textile Wall Hanging",
        price: 78.50,
        category: "Textiles",
        image: '<img src="images/textile1.png" alt="Ceramic Clay Pot Set" />',
        description: "Colorful textile wall hanging with geometric patterns. Woven using traditional looms and natural dyes for vibrant, lasting colors.",
        stock: 9,
        
    },
    {
        id: 6,
        name: "Leather Hand Bag",
        price: 125.00,
        category: "Leather Work",
        image: '<img src="images/leather1.png" alt="Ceramic Clay Pot Set" />',
        description: "Premium leather handbag with hand-stitched details. Durable construction meets elegant design for everyday sophistication.",
        stock: 6,
      
    },
    {
        id: 7,
        name: "Metal Wind Chimes",
        price: 42.75,
        category: "Metal Crafts",
        image: '<img src="images/metal1.png" alt="Ceramic Clay Pot Set" />',
        description: "Handforged metal wind chimes with soothing tones. Each chime is carefully tuned to create harmonious melodies in the breeze.",
        stock: 18,
        
    },
    {
        id: 8,
        name: "Embroidered Pillow Covers",
        price: 28.99,
        category: "Textiles",
        image: '<img src="images/emb1.png" alt="Ceramic Clay Pot Set" />',
        description: "Set of decorative pillow covers with traditional embroidery. Hand-stitched patterns that bring cultural heritage to your home.",
        stock: 25,
       
    }
];

const categories = [
    "Home Decor", "Pottery", "Jewelry", "Wood Crafts", 
    "Textiles", "Leather Work", "Metal Crafts"
];

const orders = [
    {
        id: "ORD-001",
        customer: "John Smith",
        email: "john@email.com",
        date: "2024-10-10",
        total: 134.50,
        status: "Pending",
        items: [
            { productId: 1, quantity: 2, price: 45.00 },
            { productId: 2, quantity: 1, price: 89.99 }
        ]
    },
    {
        id: "ORD-002",
        customer: "Jane Doe",
        email: "jane@email.com",
        date: "2024-10-12",
        total: 71.00,
        status: "Completed",
        items: [
            { productId: 3, quantity: 2, price: 35.50 }
        ]
    },
    {
        id: "ORD-003",
        customer: "Bob Wilson",
        email: "bob@email.com",
        date: "2024-10-14",
        total: 193.50,
        status: "Processing",
        items: [
            { productId: 4, quantity: 1, price: 65.00 },
            { productId: 5, quantity: 1, price: 78.50 },
            { productId: 1, quantity: 1, price: 45.00 }
        ]
    }
];

const conversations = [
    {
        id: 1,
        participants: ["Customer", "TeknoChat"],
        lastMessage: "Thank you for your interest in the bamboo basket!",
        timestamp: "2024-10-14 15:30",
        messages: [
            {
                sender: "Customer",
                text: "Hi, is this basket available in larger sizes?",
                timestamp: "2024-10-14 14:30"
            },
            {
                sender: "TecknoChat",
                text: "Yes, I can make custom sizes. What dimensions do you need?",
                timestamp: "2024-10-14 15:15"
            },
            {
                sender: "Customer",
                text: "I need something about 50cm wide and 35cm tall for my laundry room.",
                timestamp: "2024-10-14 15:20"
            },
            {
                sender: "TecknoChat",
                text: "Perfect! I can make that size for $65. It will take about 2 weeks to complete.",
                timestamp: "2024-10-14 15:25"
            },
            {
                sender: "Customer",
                text: "That sounds great! How do we proceed?",
                timestamp: "2024-10-14 15:28"
            },
            {
                sender: "TecknoChat",
                text: "Thank you for your interest in the bamboo basket!",
                timestamp: "2024-10-14 15:30"
            }
        ]
    },
    
];

// Utility Functions
function formatPrice(price) {
    return `₱${price.toFixed(2)}`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function showSuccessMessage(message) {
    const successEl = document.getElementById('successMessage');
    const textEl = document.getElementById('successText');
    textEl.textContent = message;
    successEl.classList.remove('hidden');
    setTimeout(() => {
        successEl.classList.add('hidden');
    }, 3000);
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) { // Only update if badge exists
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// function updateCartBadge() {
//     const badge = document.getElementById('cartBadge');
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     badge.textContent = totalItems;
//     badge.style.display = totalItems > 0 ? 'block' : 'none';
// }

function showPage(pageId) {
    // Check if the page exists in the current interface
    const targetPage = document.getElementById(pageId);
    if (!targetPage) {
        console.warn(`Page ${pageId} not found in current interface`);
        return;
    }
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    targetPage.classList.remove('hidden');
    currentPage = pageId.replace('Page', '');
    
    // Update navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load page-specific content
    switch (currentPage) {
        case 'home':
            if (isCustomerInterface) loadFeaturedProducts();
            break;
        case 'products':
            if (isCustomerInterface) loadProductCatalog();
            break;
        case 'cart':
            if (isCustomerInterface) loadCartPage();
            break;
        case 'messages':
            loadMessagesPage();
            break;
        case 'profile':
            loadProfilePage();
            break;
        case 'admin':
            if (isAdminInterface) loadAdminPanel();
            break;
    }
}

// // Navigation Functions
// function showPage(pageId) {
//     // Hide all pages
//     document.querySelectorAll('.page').forEach(page => {
//         page.classList.add('hidden');
//     });
    
//     // Show selected page
//     document.getElementById(pageId).classList.remove('hidden');
//     currentPage = pageId.replace('Page', '');
    
//     // Update navigation links
//     document.querySelectorAll('.nav-link').forEach(link => {
//         link.classList.remove('active');
//     });
    
//     const activeLink = document.querySelector(`[data-page="${currentPage}"]`);
//     if (activeLink) {
//         activeLink.classList.add('active');
//     }
    
//     // Load page-specific content
//     switch (currentPage) {
//         case 'home':
//             loadFeaturedProducts();
//             break;
//         case 'products':
//             loadProductCatalog();
//             break;
//         case 'cart':
//             loadCartPage();
//             break;
//         case 'messages':
//             loadMessagesPage();
//             break;
//         case 'profile':
//             loadProfilePage();
//             break;
//         case 'admin':
//             loadAdminPanel();
//             break;
//     }
// }

// function switchUserType() {
//     const toggle = document.getElementById('userTypeToggle');
//     const label = document.getElementById('userTypeLabel');
//     const adminLink = document.getElementById('adminLink');
    
//     if (toggle.checked) {
//         currentUser = 'admin';
//         label.textContent = 'Admin';
//         adminLink.classList.remove('hidden');
//     } else {
//         currentUser = 'customer';
//         label.textContent = 'Customer';
//         adminLink.classList.add('hidden');
//         if (currentPage === 'admin') {
//             showPage('homePage');
//         }
//     }
// }

// Product Functions
function loadFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    const featuredProducts = products.slice(0, 6); // Show first 6 products
    
    grid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-body">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn--primary btn--sm" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn--secondary btn--sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadProductCatalog() {
    loadCategories();
    filterAndDisplayProducts();
    updateResultsCount();
}

function loadCategories() {
    const container = document.getElementById('categoryFilters');
    container.innerHTML = categories.map(category => `
        <label class="filter-checkbox">
            <input type="checkbox" value="${category}" onchange="toggleCategory('${category}')">
            <span>${category}</span>
        </label>
    `).join('');
}

function filterAndDisplayProducts() {
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price <= priceRange;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default: // name
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.image}
            </div>
            <div class="product-body">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn--outline btn--sm" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn--primary btn--sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    updateResultsCount(filteredProducts.length);
}

function updateResultsCount(count = null) {
    if (count === null) {
        const filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price <= priceRange;
            return matchesSearch && matchesCategory && matchesPrice;
        });
        count = filteredProducts.length;
    }
    
    document.getElementById('resultsCount').textContent = `${count} products found`;
}

function toggleCategory(category) {
    const index = selectedCategories.indexOf(category);
    if (index > -1) {
        selectedCategories.splice(index, 1);
    } else {
        selectedCategories.push(category);
    }
    filterAndDisplayProducts();
}

function clearFilters() {
    searchTerm = '';
    selectedCategories = [];
    priceRange = 200;
    
    document.getElementById('productSearch').value = '';
    document.getElementById('priceRange').value = 200;
    document.getElementById('maxPrice').textContent = '$200';
    document.querySelectorAll('#categoryFilters input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    filterAndDisplayProducts();
}

function viewProduct(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    document.getElementById('productDetail').innerHTML = `
        <div class="product-detail-image">
            ${currentProduct.image}
        </div>
        <div class="product-detail-info">
            <h1>${currentProduct.name}</h1>
            <div class="product-detail-price">${formatPrice(currentProduct.price)}</div>
            <div class="product-detail-description">
                ${currentProduct.description}
            </div>
            <div class="product-detail-meta">
                <div class="meta-item">
                    <span>Category:</span>
                    <span>${currentProduct.category}</span>
                </div>
                
                <div class="meta-item">
                    <span>Stock:</span>
                    <span>${currentProduct.stock} available</span>
                </div>
            </div>
            <div class="quantity-selector">
                <label for="quantityInput">Quantity:</label>
                <button class="btn btn--outline quantity-btn" onclick="changeQuantity(-1)">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number" id="quantityInput" class="form-control quantity-input" value="1" min="1" max="${currentProduct.stock}">
                <button class="btn btn--outline quantity-btn" onclick="changeQuantity(1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="product-actions">
                <button class="btn btn--primary btn--lg" onclick="addToCartWithQuantity(${currentProduct.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn--outline btn--lg" onclick="messageseller('${currentProduct.seller}')">
                    <i class="fas fa-comment"></i> Message Seller
                </button>
            </div>
        </div>
    `;
    
    showPage('productDetailPage');
}

function changeQuantity(delta) {
    const input = document.getElementById('quantityInput');
    const newValue = Math.max(1, Math.min(currentProduct.stock, parseInt(input.value) + delta));
    input.value = newValue;
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            price: product.price
        });
    }
    
    updateCartBadge();
    showSuccessMessage(`${product.name} added to cart!`);
}

function addToCartWithQuantity(productId) {
    const quantity = parseInt(document.getElementById('quantityInput').value);
    addToCart(productId, quantity);
}

// Cart Functions
function loadCartPage() {
    const container = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Add some products to your cart to get started!</p>
                <button class="btn btn--primary" onclick="showPage('productsPage')">
                    <i class="fas fa-store"></i> Browse Products
                </button>
            </div>
        `;
        return;
    }
    
    const cartItems = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...item, product };
    });
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    container.innerHTML = `
        <div class="cart-items">
            ${cartItems.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${item.product.image}
                    </div>
                    <div class="cart-item-info">
                        <h3>${item.product.name}</h3>
                        <div class="cart-item-meta">${item.product.category}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="btn btn--outline btn--sm" onclick="updateCartQuantity(${item.productId}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="btn btn--outline btn--sm" onclick="updateCartQuantity(${item.productId}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn--outline btn--sm" onclick="removeFromCart(${item.productId})" style="margin-left: var(--space-8); color: var(--color-error);">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="cart-item-price">
                        ${formatPrice(item.price * item.quantity)}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (8%):</span>
                <span>${formatPrice(tax)}</span>
            </div>
            <div class="summary-row total">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
            </div>
            <button class="btn btn--primary btn--full-width btn--lg" onclick="proceedToCheckout()">
                <i class="fas fa-credit-card"></i> Proceed to Checkout
            </button>
        </div>
    `;
}

function updateCartQuantity(productId, delta) {
    const item = cart.find(item => item.productId === productId);
    if (!item) return;
    
    item.quantity += delta;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartBadge();
        loadCartPage();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    updateCartBadge();
    loadCartPage();
    showSuccessMessage('Item removed from cart');
}

function proceedToCheckout() {
    loadCheckoutPage();
    showPage('checkoutPage');
}

// Checkout Functions
function loadCheckoutPage() {
    const cartItems = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...item, product };
    });
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    document.getElementById('checkoutSummary').innerHTML = `
        <h2>Order Summary</h2>
        <div class="order-items">
            ${cartItems.map(item => `
                <div class="summary-row">
                    <span>${item.product.name} x ${item.quantity}</span>
                    <span>${formatPrice(item.price * item.quantity)}</span>
                </div>
            `).join('')}
        </div>
        <hr style="margin: var(--space-16) 0;">
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (8%):</span>
            <span>${formatPrice(tax)}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>${formatPrice(total)}</span>
        </div>
        <button class="btn btn--primary btn--full-width btn--lg" onclick="placeOrder()">
            <i class="fas fa-check"></i> Place Order
        </button>
    `;
}

function placeOrder() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    
    // Basic form validation
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    const pickup = document.getElementById('pickupLocation').value;
    
    if (!name || !email || !phone || !pickup) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Create new order
    const newOrder = {
        id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        customer: name,
        email: email,
        phone: phone,
        pickupLocation: pickup,
        date: new Date().toISOString().split('T')[0],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08,
        status: "Pending",
        items: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
    
    orders.push(newOrder);
    
    // Clear cart
    cart = [];
    updateCartBadge();
    
    showSuccessMessage('Order placed successfully! Order ID: ' + newOrder.id);
    
    // Redirect to profile to show order
    setTimeout(() => {
        showPage('profilePage');
    }, 2000);
}

// Messages Functions
function loadMessagesPage() {
    loadConversationsList();
    if (currentConversation) {
        loadChatMessages(currentConversation);
    }
}

function loadConversationsList() {
    const container = document.getElementById('conversationsList');
    
    container.innerHTML = conversations.map(conv => `
        <div class="conversation-item ${currentConversation === conv.id ? 'active' : ''}" onclick="selectConversation(${conv.id})">
            <div class="conversation-name">${conv.participants.find(p => p !== 'Customer')}</div>
            <div class="conversation-last-message">${conv.lastMessage}</div>
            <div class="conversation-time">${formatDate(conv.timestamp.split(' ')[0])}</div>
        </div>
    `).join('');
}

function selectConversation(conversationId) {
    currentConversation = conversationId;
    loadConversationsList();
    loadChatMessages(conversationId);
    
    document.getElementById('chatInput').classList.remove('hidden');
}

function loadChatMessages(conversationId) {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    const chatHeader = document.getElementById('chatHeader');
    const chatMessages = document.getElementById('chatMessages');
    
    const otherParticipant = conversation.participants.find(p => p !== 'Customer');
    
    chatHeader.innerHTML = `
        <div class="chat-info">
            <h3>${otherParticipant}</h3>
            <p>Active conversation</p>
        </div>
    `;
    
    chatMessages.innerHTML = conversation.messages.map(message => `
        <div class="message ${message.sender === 'Customer' ? 'sent' : 'received'}">
            <div class="message-content">
                <div class="message-text">${message.text}</div>
                <div class="message-time">${message.timestamp}</div>
            </div>
        </div>
    `).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (!text || !currentConversation) return;
    
    const conversation = conversations.find(c => c.id === currentConversation);
    if (!conversation) return;
    
    const newMessage = {
        sender: 'Customer',
        text: text,
        timestamp: new Date().toLocaleString()
    };
    
    conversation.messages.push(newMessage);
    conversation.lastMessage = text;
    conversation.timestamp = newMessage.timestamp;
    
    input.value = '';
    loadChatMessages(currentConversation);
    loadConversationsList();
    
    showSuccessMessage('Message sent!');
}

function messageseller(sellerName) {
    // Find or create conversation with seller
    let conversation = conversations.find(c => c.participants.includes(sellerName));
    
    if (!conversation) {
        conversation = {
            id: conversations.length + 1,
            participants: ['Customer', sellerName],
            lastMessage: 'New conversation',
            timestamp: new Date().toLocaleString(),
            messages: []
        };
        conversations.push(conversation);
    }
    
    currentConversation = conversation.id;
    showPage('messagesPage');
}

// Profile Functions
function loadProfilePage() {
    const container = document.getElementById('profileContent');
    
    if (currentUser === 'admin') {
        container.innerHTML = `
            <div class="profile-section">
                <h2>Admin Profile</h2>
                <div class="profile-info">
                    <p><strong>Role:</strong> Platform Administrator</p>
                    <p><strong>Access Level:</strong> Full System Access</p>
                    <p><strong>Last Login:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <div class="profile-section">
                <h3>Quick Actions</h3>
                <div class="quick-actions">
                    <button class="btn btn--primary" onclick="showPage('adminPage')">
                        <i class="fas fa-cogs"></i> Go to Admin Panel
                    </button>
                </div>
            </div>
        `;
    } else {
        const customerOrders = orders.filter(order => order.customer === 'John Smith'); // Mock customer
        
        container.innerHTML = `
            <div class="profile-section">
                <h2>Customer Profile</h2>
                <div class="profile-info">
                    <p><strong>Name:</strong> John Smith</p>
                    <p><strong>Email:</strong> john@email.com</p>
                    <p><strong>Phone:</strong> (555) 123-4567</p>
                    <p><strong>Member Since:</strong> October 2024</p>
                </div>
            </div>
            <div class="profile-section">
                <h3>Order History</h3>
                ${customerOrders.length > 0 ? `
                    <div class="orders-list">
                        ${customerOrders.map(order => `
                            <div class="order-item">
                                <div class="order-header">
                                    <strong>${order.id}</strong>
                                    <span class="status status--${order.status.toLowerCase()}">${order.status}</span>
                                </div>
                                <div class="order-details">
                                    <p>Date: ${formatDate(order.date)}</p>
                                    <p>Total: ${formatPrice(order.total)}</p>
                                    <p>Items: ${order.items.length} item(s)</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <p>No orders yet. <a href="#" onclick="showPage('productsPage')">Start shopping!</a></p>
                `}
            </div>
        `;
    }
}

// Admin Functions
function loadAdminPanel() {
    loadAdminDashboard();
}

function switchAdminSection(section) {
    currentAdminSection = section;
    
    // Update navigation
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-admin-section="${section}"]`).classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const sectionElement = document.getElementById(`admin${section.charAt(0).toUpperCase() + section.slice(1)}`);
    sectionElement.classList.remove('hidden');
    
    // Load section content
    switch (section) {
        case 'dashboard':
            loadAdminDashboard();
            break;
        case 'products':
            loadAdminProducts();
            break;
        case 'orders':
            loadAdminOrders();
            break;
        case 'messages':
            loadAdminMessages();
            break;
        case 'analytics':
            loadAdminAnalytics();
            break;
    }
}

function loadAdminDashboard() {
    const container = document.getElementById('adminDashboard');
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;
    const totalProducts = products.length;
    const totalMessages = conversations.reduce((sum, conv) => sum + conv.messages.length, 0);
    
    container.innerHTML = `
        <div class="admin-header">
            <h1>Dashboard Overview</h1>
            <p>Welcome to the TeknoPreneur admin panel</p>
        </div>
        
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <div class="dashboard-card-icon blue">
                    <i class="fas fa-dollar-sign"></i>
                </div>
                <h3>${formatPrice(totalRevenue)}</h3>
                <p>Total Revenue</p>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-icon green">
                    <i class="fas fa-box"></i>
                </div>
                <h3>${totalProducts}</h3>
                <p>Total Products</p>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-icon orange">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <h3>${pendingOrders}</h3>
                <p>Pending Orders</p>
            </div>
            <div class="dashboard-card">
                <div class="dashboard-card-icon purple">
                    <i class="fas fa-comments"></i>
                </div>
                <h3>${totalMessages}</h3>
                <p>Total Messages</p>
            </div>
        </div>
        
        <div class="recent-activity">
            <h2>Recent Orders</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.slice(-5).reverse().map(order => `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.customer}</td>
                            <td>${formatDate(order.date)}</td>
                            <td>${formatPrice(order.total)}</td>
                            <td><span class="status status--${getStatusClass(order.status)}">${order.status}</span></td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn--outline btn--sm" onclick="viewOrder('${order.id}')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn--primary btn--sm" onclick="updateOrderStatus('${order.id}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="chart-container">
            <h2>Sales Analytics</h2>
            <canvas id="salesChart"></canvas>
        </div>
    `;
    
    // Create chart
    setTimeout(() => {
        createSalesChart();
    }, 100);
}

function createSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [{
                label: 'Monthly Revenue',
                data: [1200, 1900, 3000, 2500, 2200, 3200, 2800, 3500, 4200, 5250],
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Revenue Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'completed': return 'success';
        case 'pending': return 'warning';
        case 'processing': return 'info';
        case 'cancelled': return 'error';
        default: return 'info';
    }
}

function loadAdminProducts() {
    const container = document.getElementById('adminProducts');
    
    container.innerHTML = `
        <div class="admin-header">
            <h1>Product Management</h1>
            <button class="btn btn--primary" onclick="addNewProduct()">
                <i class="fas fa-plus"></i> Add New Product
            </button>
        </div>
        
        <div class="admin-content">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.category}</td>
                            <td>${formatPrice(product.price)}</td>
                            <td>${product.stock}</td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn--outline btn--sm" onclick="editProduct(${product.id})">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="btn btn--outline btn--sm" onclick="deleteProduct(${product.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function loadAdminOrders() {
    const container = document.getElementById('adminOrders');
    
    container.innerHTML = `
        <div class="admin-header">
            <h1>Order Management</h1>
        </div>
        
        <div class="admin-content">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr>
                            <td>${order.id}</td>
                            <td>${order.customer}</td>
                            <td>${order.email}</td>
                            <td>${formatDate(order.date)}</td>
                            <td>${formatPrice(order.total)}</td>
                            <td><span class="status status--${getStatusClass(order.status)}">${order.status}</span></td>
                            <td>
                                <div class="table-actions">
                                    <button class="btn btn--outline btn--sm" onclick="viewOrder('${order.id}')">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button class="btn btn--primary btn--sm" onclick="updateOrderStatus('${order.id}')">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function loadAdminMessages() {
    const container = document.getElementById('adminMessages');
    
    container.innerHTML = `
        <div class="admin-header">
            <h1>Message Management</h1>
        </div>
        
        <div class="admin-content">
            <div class="conversations-overview">
                ${conversations.map(conv => `
                    <div class="conversation-card">
                        <h3>Conversation with ${conv.participants.join(' & ')}</h3>
                        <p><strong>Last Message:</strong> ${conv.lastMessage}</p>
                        <p><strong>Date:</strong> ${formatDate(conv.timestamp.split(' ')[0])}</p>
                        <p><strong>Messages:</strong> ${conv.messages.length}</p>
                        <button class="btn btn--outline btn--sm" onclick="viewConversationDetails(${conv.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function loadAdminAnalytics() {
    const container = document.getElementById('adminAnalytics');
    
    container.innerHTML = `
        <div class="admin-header">
            <h1>Analytics & Reports</h1>
        </div>
        
        <div class="admin-content">
            <div class="analytics-grid">
                <div class="chart-container">
                    <h3>Category Distribution</h3>
                    <canvas id="categoryChart"></canvas>
                </div>
                
                <div class="chart-container">
                    <h3>Order Status Distribution</h3>
                    <canvas id="statusChart"></canvas>
                </div>
                
                <div class="analytics-stats">
                    <h3>Key Metrics</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <h4>Average Order Value</h4>
                            <p>${formatPrice(orders.reduce((sum, order) => sum + order.total, 0) / orders.length)}</p>
                        </div>
                        <div class="stat-item">
                            <h4>Top Selling Category</h4>
                            <p>Textiles</p>
                        </div>
                        <div class="stat-item">
                            <h4>Total Customers</h4>
                            <p>89</p>
                        </div>
                        <div class="stat-item">
                            <h4>Conversion Rate</h4>
                            <p>12.5%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        createCategoryChart();
        createStatusChart();
    }, 100);
}

function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const categoryCounts = {};
    products.forEach(product => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categoryCounts),
            datasets: [{
                data: Object.values(categoryCounts),
                backgroundColor: [
                    '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', 
                    '#5D878F', '#DB4545', '#D2BA4C'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    const statusCounts = {};
    orders.forEach(order => {
        statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                label: 'Order Count',
                data: Object.values(statusCounts),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Mock admin functions
function addNewProduct() {
    alert('Add new product functionality would be implemented here');
}

function editProduct(productId) {
    alert(`Edit product ${productId} functionality would be implemented here`);
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        showSuccessMessage('Product deleted successfully');
    }
}

function viewOrder(orderId) {
    alert(`View order ${orderId} details would be implemented here`);
}

function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
    const currentIndex = statuses.indexOf(order.status);
    const newIndex = (currentIndex + 1) % statuses.length;
    
    order.status = statuses[newIndex];
    showSuccessMessage(`Order ${orderId} status updated to ${order.status}`);
    
    // Reload current admin section
    switchAdminSection(currentAdminSection);
}

function viewConversationDetails(conversationId) {
    alert(`View conversation ${conversationId} details would be implemented here`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1500);
    
    // Initialize app
    showPage('homePage');
    updateCartBadge();
    
    // Navigation event listeners
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page + 'Page');
        });
    });
    
    // User type toggle
    //document.getElementById('userTypeToggle').addEventListener('change', switchUserType);
    // Initialize interface
if (isAdminInterface) {
    showPage('adminPage');
} else {
    showPage('homePage');
}
    
    // Mobile menu toggle
    document.getElementById('navToggle').addEventListener('click', function() {
        document.getElementById('navMenu').classList.toggle('active');
    });
    
    // Product search
    document.getElementById('productSearch')?.addEventListener('input', function() {
        searchTerm = this.value;
        filterAndDisplayProducts();
    });
    
    // Price range filter
    document.getElementById('priceRange')?.addEventListener('input', function() {
        priceRange = parseInt(this.value);
        document.getElementById('maxPrice').textContent = formatPrice(priceRange);
        filterAndDisplayProducts();
    });
    
    // Sort select
    document.getElementById('sortSelect')?.addEventListener('change', function() {
        sortBy = this.value;
        filterAndDisplayProducts();
    });
    
    // Clear filters button
    document.getElementById('clearFilters')?.addEventListener('click', clearFilters);
    
    // Back to products button
    document.getElementById('backToProducts')?.addEventListener('click', function() {
        showPage('productsPage');
    });
    
    // Message send button
    document.getElementById('sendMessageBtn')?.addEventListener('click', sendMessage);
    
    // Message input enter key
    document.getElementById('messageInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Admin navigation
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-admin-section');
            switchAdminSection(section);
        });
    });
    
    // Modal close
    document.getElementById('closeModal')?.addEventListener('click', function() {
        document.getElementById('productModal').classList.add('hidden');
    });
    
    // Close modal when clicking outside
    document.getElementById('productModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
        }
    });
});

// Initialize featured products buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-page]') || e.target.closest('[data-page]')) {
        const button = e.target.matches('[data-page]') ? e.target : e.target.closest('[data-page]');
        const page = button.getAttribute('data-page');
        showPage(page + 'Page');
    }
});

// Export functions for global access
window.TeknoPreneur = {
    showPage,
    viewProduct,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    messageSeller: messageseller,
    switchAdminSection,
    selectConversation
};