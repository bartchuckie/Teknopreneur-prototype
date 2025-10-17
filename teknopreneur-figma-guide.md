# TeknoPreneur Platform: Complete Figma Design Guide

## Project Overview
**Platform Name:** TeknoPreneur: A Predictive Market Platform For Drug Reformists' Engineering Innovations and Handicrafts

**Platform Purpose:** Web-based e-commerce platform enabling drug reformists to showcase their handicraft products to customers, with integrated messaging and predictive analytics capabilities.

**User Types:** 
- Admin (product management, platform administration)
- Customers (browse, purchase, messaging)

## Design Principles & Aesthetic Guidelines

### Visual Identity
- **Style:** Clean, modern, accessible design following material design principles
- **Color Palette:** 
  - Primary: #2563EB (Blue) - Trust, reliability
  - Secondary: #059669 (Green) - Growth, positivity
  - Accent: #DC2626 (Red) - Action, urgency
  - Neutral: #6B7280 (Gray) - Balance
  - Background: #F9FAFB (Light Gray)
  - Text: #111827 (Dark Gray)

### Typography
- **Primary Font:** Inter or Poppins
- **Headings:** Bold weights (600-700)  
- **Body Text:** Regular weight (400)
- **Font Sizes:** 
  - H1: 36px
  - H2: 30px  
  - H3: 24px
  - Body: 16px
  - Small: 14px

### Spacing & Layout
- **Grid System:** 12-column grid with 24px gutters
- **Container Max Width:** 1200px
- **Padding:** 16px mobile, 24px desktop
- **Border Radius:** 8px for cards, 6px for buttons
- **Shadows:** Soft drop shadows (0px 4px 6px rgba(0, 0, 0, 0.1))

## Page Structure & Navigation

### Primary Navigation Bar
**Position:** Fixed top navigation
**Components:**
- Logo (TeknoPreneur)
- Home
- Products/Catalog
- Messages 
- Cart (with item count badge)
- Profile/Account
- Admin Panel (admin only)

**Icons to Use:**
- Home: House/home icon
- Products: Grid/catalog icon  
- Messages: Chat bubble icon
- Cart: Shopping cart icon
- Profile: User/person icon
- Admin: Dashboard/settings icon
- Search: Magnifying glass
- Notifications: Bell icon

## Detailed Page Specifications

### 1. Homepage

**Header Section:**
- Hero banner with platform introduction
- Call-to-action buttons: "Browse Products" and "Learn More"
- High-quality image showcasing handicrafts

**Featured Products Section:**
- Grid of 6-8 featured products
- Product cards with: image, title, price, "Add to Cart" button
- "View All Products" link

**About Section:**
- Brief description of the platform mission
- Statistics: Number of products, artisans, customers

**How It Works Section:**
- 3-step process visualization
- Icons and descriptions for each step

**Footer:**
- Links: About, Contact, Terms, Privacy
- Social media icons
- Copyright information

### 2. Product Catalog Page

**Filter Sidebar (Left):**
- Category filter (dropdown)
- Price range slider
- Product type checkboxes
- Reset filters button

**Product Grid (Main):**
- 3-4 columns on desktop, 2 on tablet, 1 on mobile
- Product cards containing:
  - Product image (hover effects)
  - Product title
  - Price
  - Brief description
  - "Add to Cart" button
  - "View Details" link

**Top Bar:**
- Search bar with autocomplete
- Sort dropdown (Price, Name, Newest)
- Grid/List view toggle
- Results count

**Pagination:**
- Previous/Next buttons
- Page numbers
- Items per page selector

### 3. Individual Product Page

**Product Gallery (Left):**
- Main product image
- Thumbnail gallery below
- Zoom functionality
- Image carousel controls

**Product Information (Right):**
- Product title
- Price (with any discounts)
- Product description
- Specifications/Materials
- Quantity selector
- "Add to Cart" button
- "Message Seller" button
- Social sharing buttons

**Additional Sections:**
- Related products carousel
- Product reviews (future feature)
- Shipping information

### 4. Shopping Cart Page

**Cart Items List:**
- Product image thumbnail
- Product name and details
- Quantity controls (+/- buttons)
- Individual price
- Remove item button
- Subtotal per item

**Order Summary Sidebar:**
- Subtotal
- Shipping (Pickup only message)
- Total
- "Proceed to Checkout" button
- "Continue Shopping" link

**Additional Features:**
- Promo code input field
- Save for later option
- Empty cart state with "Start Shopping" CTA

### 5. Checkout Page

**Customer Information:**
- Name, email, phone number
- Pickup location/instructions
- Special notes field

**Order Summary:**
- List of items being purchased
- Quantities and prices
- Total amount

**Payment Method:**
- Payment options (for future implementation)
- Terms and conditions checkbox
- "Place Order" button

### 6. Admin Dashboard

**Navigation Sidebar:**
- Dashboard overview
- Product management
- Order management  
- Messages
- Analytics/Reports
- Settings

**Dashboard Overview:**
- Key metrics cards:
  - Total products
  - Pending orders
  - Revenue this month
  - Unread messages
- Recent orders table
- Quick actions panel

**Analytics Section:**
- Sales charts (line and bar graphs)
- Top-selling products
- Customer demographics
- Predictive analytics widgets:
  - Demand forecasting chart
  - Inventory alerts
  - Sales predictions

### 7. Product Management (Admin)

**Product List View:**
- Data table with:
  - Product image
  - Name
  - Category
  - Price
  - Stock status
  - Actions (Edit, Delete, View)
- Search and filter options
- "Add New Product" button

**Add/Edit Product Form:**
- Product information fields:
  - Name, description, category
  - Price, stock quantity
  - Images upload area
  - Specifications
- Form validation
- Save/Cancel buttons

### 8. Order Management (Admin)

**Orders List:**
- Table with columns:
  - Order ID
  - Customer name
  - Date
  - Total amount
  - Status (Pending, Processing, Completed)
  - Actions

**Order Detail View:**
- Customer information
- Ordered items list
- Payment status
- Order timeline
- Update status buttons
- Print/Export options

### 9. Messaging System

**Conversations List (Left Panel):**
- Search conversations
- List of active conversations with:
  - Contact name/avatar
  - Last message preview
  - Timestamp
  - Unread indicator

**Chat Interface (Right Panel):**
- Message thread
- Message composition area
- Send button
- File attachment option
- Typing indicators
- Message status indicators

**Message Features:**
- Real-time messaging
- Message timestamps
- Read receipts
- File sharing capability

### 10. User Profile Pages

**Customer Profile:**
- Personal information form
- Order history
- Saved products/Wishlist
- Account settings
- Password change

**Admin Profile:**
- Admin information
- Platform settings
- User management (future)
- System preferences

## Component Library

### Buttons
- **Primary Button:** Blue background, white text, 8px border radius
- **Secondary Button:** White background, blue border and text
- **Danger Button:** Red background, white text
- **Icon Button:** Circular, minimal design

### Form Elements
- **Input Fields:** Clean borders, focus states, validation styling
- **Dropdowns:** Custom styled select elements
- **Checkboxes/Radio:** Custom styled with brand colors
- **File Upload:** Drag-and-drop area with browse option

### Cards
- **Product Card:** Image, title, price, actions
- **Dashboard Card:** Metrics display with icons
- **Message Card:** Conversation preview layout

### Modals & Overlays
- **Confirmation Dialogs:** Simple, centered modals
- **Product Quick View:** Larger modal with product details
- **Image Gallery:** Full-screen overlay for product images

## Responsive Design Guidelines

### Mobile (< 768px)
- Single column layouts
- Larger touch targets (44px minimum)
- Collapsible navigation (hamburger menu)
- Stack form elements vertically
- Optimize image sizes

### Tablet (768px - 1024px)
- 2-column product grids
- Side navigation becomes overlay
- Adjust spacing and font sizes
- Maintain usability for touch

### Desktop (> 1024px)
- Full layout with all elements visible
- Hover states for interactive elements
- Larger click targets
- Multi-column layouts

## Accessibility Considerations

### WCAG Compliance
- Color contrast ratios 4.5:1 minimum
- Alt text for all images
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators on interactive elements

### Inclusive Design
- Clear, readable fonts
- Sufficient white space
- Consistent navigation
- Error handling and validation
- Multiple ways to access content

## Interactive States

### Hover States
- Buttons: Slight color darkening
- Product cards: Subtle lift effect
- Links: Underline or color change

### Active/Focus States
- Clear focus indicators
- Form field highlighting
- Button press feedback

### Loading States
- Skeleton screens for content loading
- Spinner indicators for actions
- Progress bars for multi-step processes

## Icon Library

### Essential Icons
- Navigation: Home, catalog, cart, messages, profile
- Actions: Add, edit, delete, search, filter, sort
- Interface: Menu, close, back, forward, up, down
- E-commerce: Cart, heart (wishlist), share, payment
- Communication: Send, attach, phone, email

### Icon Guidelines
- Consistent stroke width (2px)
- 24px standard size
- Outlined style preferred
- High contrast for readability

## Implementation Notes

### Technical Considerations
- Optimize images for web (WebP format)
- Implement lazy loading for product images
- Use CSS Grid and Flexbox for layouts
- Consider performance for mobile users
- Progressive web app capabilities

### Future Enhancements
- Advanced search functionality
- Product reviews and ratings
- Wishlists and favorites
- Advanced analytics dashboard
- Multi-language support
- Push notifications

This comprehensive guide provides all the specifications needed to create a professional, user-friendly Figma prototype for the TeknoPreneur platform. Each section includes detailed requirements for layout, functionality, and visual design that align with modern UI/UX best practices.