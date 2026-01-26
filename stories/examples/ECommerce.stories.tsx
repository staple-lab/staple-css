import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Flex, Grid, Container, Text, Card } from '@staple-css/primitives'
import { useState } from 'react'

const meta = {
  title: 'Examples/E-Commerce Site',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Product card component
const ProductCard = ({ name, price, image, badge }: {
  name: string
  price: string
  image: string
  badge?: string
}) => (
  <Box
    radius={2}
    shadow={1}
    style={{
      background: 'white',
      cursor: 'pointer',
      transition: 'all var(--st-duration-normal) var(--st-easing-out)',
      position: 'relative',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    }}
  >
    {badge && (
      <Box
        pad={2}
        radius={2}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#dc2626',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
        {badge}
      </Box>
    )}

    <Box
      aspectRatio="square"
      radius={2}
      style={{
        background: image,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />

    <Column gap={2} pad={4}>
      <Text size={2} weight="semibold">
        {name}
      </Text>
      <Row justify="between" align="center">
        <Text size={3} weight="bold">
          {price}
        </Text>
        <button
          style={{
            padding: '8px 16px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'background var(--st-duration-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
        >
          Add to Cart
        </button>
      </Row>
    </Column>
  </Box>
)

// Header component
const Header = ({ cartCount }: { cartCount: number }) => (
  <Box
    pad={4}
    style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}
  >
    <Container size="7xl">
      <Row justify="between" align="center">
        <Text size={4} weight="bold" style={{ cursor: 'pointer' }}>
          ShopLogo
        </Text>

        <Row gap={6} align="center" style={{ display: 'none', '@media (min-width: 768px)': { display: 'flex' } }}>
          <Text weight="medium" style={{ cursor: 'pointer' }}>
            Products
          </Text>
          <Text weight="medium" style={{ cursor: 'pointer' }}>
            Categories
          </Text>
          <Text weight="medium" style={{ cursor: 'pointer' }}>
            About
          </Text>
          <Text weight="medium" style={{ cursor: 'pointer' }}>
            Contact
          </Text>
        </Row>

        <Row gap={3} align="center">
          <Box
            style={{
              padding: '8px 12px',
              background: '#f9fafb',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background var(--st-duration-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
          >
            <Text>🔍</Text>
          </Box>

          <Box
            style={{
              padding: '8px 12px',
              background: '#f9fafb',
              borderRadius: '6px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background var(--st-duration-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
          >
            <Text>🛒</Text>
            {cartCount > 0 && (
              <Box
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '20px',
                  height: '20px',
                  background: '#dc2626',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {cartCount}
              </Box>
            )}
          </Box>
        </Row>
      </Row>
    </Container>
  </Box>
)

// Hero section
const Hero = () => (
  <Box
    pad={8}
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    }}
  >
    <Container size="xl">
      <Row gap={6} align="center">
        <Column gap={4} style={{ flex: 1 }}>
          <Text as="h1" size={6} weight="bold">
            Summer Collection 2025
          </Text>
          <Text size={3} leading="relaxed">
            Discover our latest arrivals and refresh your wardrobe with premium quality pieces at unbeatable prices.
          </Text>
          <Row gap={3}>
            <button
              style={{
                padding: '14px 28px',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'transform var(--st-duration-fast) var(--st-easing-out)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Shop Now
            </button>
            <button
              style={{
                padding: '14px 28px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'all var(--st-duration-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.color = '#667eea'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'white'
              }}
            >
              View Lookbook
            </button>
          </Row>
        </Column>

        <Box
          style={{
            flex: 1,
            height: '400px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text size={6}>📸</Text>
        </Box>
      </Row>
    </Container>
  </Box>
)

// Category badges
const Categories = () => (
  <Container size="7xl">
    <Box pad={5}>
      <Flex wrap="wrap" gap={2} justify="center">
        {['All', 'Shirts', 'Pants', 'Shoes', 'Accessories', 'Sale'].map((cat, i) => (
          <button
            key={cat}
            style={{
              padding: '10px 20px',
              background: i === 0 ? '#3b82f6' : 'white',
              color: i === 0 ? 'white' : '#1f2937',
              border: '1px solid #e5e7eb',
              borderRadius: '24px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all var(--st-duration-fast)',
            }}
            onMouseEnter={(e) => {
              if (i !== 0) {
                e.currentTarget.style.background = '#f9fafb'
              }
            }}
            onMouseLeave={(e) => {
              if (i !== 0) {
                e.currentTarget.style.background = 'white'
              }
            }}
          >
            {cat}
          </button>
        ))}
      </Flex>
    </Box>
  </Container>
)

// Newsletter section
const Newsletter = () => (
  <Box
    pad={8}
    style={{
      background: '#f9fafb',
      borderTop: '1px solid #e5e7eb',
      borderBottom: '1px solid #e5e7eb',
    }}
  >
    <Container size="md">
      <Column gap={4} align="center">
        <Text size={5} weight="bold" align="center">
          Join Our Newsletter
        </Text>
        <Text size={2} tone="muted" align="center">
          Get exclusive offers, style tips, and early access to new arrivals.
        </Text>

        <Row gap={2} style={{ width: '100%', maxWidth: '500px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '16px',
            }}
          />
          <button
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background var(--st-duration-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
          >
            Subscribe
          </button>
        </Row>

        <Text size={0} tone="muted">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </Text>
      </Column>
    </Container>
  </Box>
)

// Footer
const Footer = () => (
  <Box pad={6} style={{ background: '#1f2937', color: 'white' }}>
    <Container size="7xl">
      <Grid cols={{ base: 1, sm: 2, md: 4 }} gap={6}>
        <Column gap={3}>
          <Text size={3} weight="bold">
            Shop
          </Text>
          <Column gap={2}>
            {['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'].map((item) => (
              <Text
                key={item}
                size={1}
                style={{
                  color: '#9ca3af',
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                {item}
              </Text>
            ))}
          </Column>
        </Column>

        <Column gap={3}>
          <Text size={3} weight="bold">
            Customer Service
          </Text>
          <Column gap={2}>
            {['Contact Us', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
              <Text
                key={item}
                size={1}
                style={{
                  color: '#9ca3af',
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                {item}
              </Text>
            ))}
          </Column>
        </Column>

        <Column gap={3}>
          <Text size={3} weight="bold">
            Company
          </Text>
          <Column gap={2}>
            {['About Us', 'Careers', 'Press', 'Sustainability'].map((item) => (
              <Text
                key={item}
                size={1}
                style={{
                  color: '#9ca3af',
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                {item}
              </Text>
            ))}
          </Column>
        </Column>

        <Column gap={3}>
          <Text size={3} weight="bold">
            Follow Us
          </Text>
          <Row gap={3}>
            {['📘', '📷', '🐦', '📌'].map((icon) => (
              <Box
                key={icon}
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#374151',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background var(--st-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4b5563'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#374151'}
              >
                <Text>{icon}</Text>
              </Box>
            ))}
          </Row>
        </Column>
      </Grid>

      <Box
        pad={4}
        marginTop={6}
        style={{
          borderTop: '1px solid #374151',
          textAlign: 'center',
        }}
      >
        <Text size={1} style={{ color: '#9ca3af' }}>
          © 2025 ShopLogo. All rights reserved. Built with staple-css.
        </Text>
      </Box>
    </Container>
  </Box>
)

// Complete store
export const CompleteStore: Story = {
  render: () => {
    const [cartCount, setCartCount] = useState(0)

    const products = [
      { name: 'Classic White Tee', price: '$29.99', image: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)', badge: 'New' },
      { name: 'Denim Jacket', price: '$89.99', image: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)' },
      { name: 'Leather Boots', price: '$149.99', image: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)' },
      { name: 'Summer Dress', price: '$59.99', image: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', badge: 'Sale' },
      { name: 'Canvas Sneakers', price: '$69.99', image: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' },
      { name: 'Wool Sweater', price: '$79.99', image: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' },
      { name: 'Silk Scarf', price: '$39.99', image: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', badge: 'New' },
      { name: 'Cargo Pants', price: '$64.99', image: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)' },
    ]

    return (
      <Column gap={0} style={{ minHeight: '100vh', background: 'white' }}>
        <Header cartCount={cartCount} />
        <Hero />
        <Categories />

        {/* Products grid */}
        <Container size="7xl">
          <Box pad={5}>
            <Column gap={6}>
              <Row justify="between" align="center">
                <Column gap={1}>
                  <Text size={5} weight="bold">
                    Featured Products
                  </Text>
                  <Text tone="muted">
                    Handpicked items just for you
                  </Text>
                </Column>

                <select
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                >
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </Row>

              <Grid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
                {products.map((product) => (
                  <ProductCard key={product.name} {...product} />
                ))}
              </Grid>
            </Column>
          </Box>
        </Container>

        <Newsletter />
        <Footer />
      </Column>
    )
  },
}

// Product detail page
export const ProductDetailPage: Story = {
  render: () => {
    const [selectedSize, setSelectedSize] = useState('M')
    const [quantity, setQuantity] = useState(1)

    return (
      <Column gap={0} style={{ minHeight: '100vh', background: 'white' }}>
        <Header cartCount={2} />

        <Container size="7xl">
          <Box pad={6}>
            <Grid cols={{ base: 1, lg: 2 }} gap={8}>
              {/* Product images */}
              <Column gap={3}>
                <Box
                  aspectRatio="square"
                  radius={3}
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
                  }}
                />

                <Row gap={2}>
                  {[1, 2, 3, 4].map((i) => (
                    <Box
                      key={i}
                      aspectRatio="square"
                      radius={2}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
                        cursor: 'pointer',
                        border: '2px solid transparent',
                        transition: 'border-color var(--st-duration-fast)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    />
                  ))}
                </Row>
              </Column>

              {/* Product info */}
              <Column gap={6}>
                <Column gap={2}>
                  <Text size={6} weight="bold">
                    Premium Denim Jacket
                  </Text>
                  <Row gap={2} align="baseline">
                    <Text size={5} weight="bold">
                      $89.99
                    </Text>
                    <Text size={3} tone="muted" style={{ textDecoration: 'line-through' }}>
                      $129.99
                    </Text>
                    <Box
                      pad={1}
                      radius={1}
                      style={{ background: '#fef2f2', color: '#dc2626', fontSize: '14px', fontWeight: 'bold' }}
                    >
                      30% OFF
                    </Box>
                  </Row>

                  <Row gap={2} align="center">
                    <Text>⭐⭐⭐⭐⭐</Text>
                    <Text size={1} tone="muted">
                      (127 reviews)
                    </Text>
                  </Row>
                </Column>

                <Text leading="relaxed">
                  Classic denim jacket crafted from premium Japanese selvage denim.
                  Features authentic copper rivets, button closure, and adjustable waist tabs.
                  Perfect for layering in any season.
                </Text>

                <Column gap={3}>
                  <Column gap={2}>
                    <Text weight="semibold">Select Size</Text>
                    <Row gap={2}>
                      {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          style={{
                            padding: '10px 16px',
                            background: selectedSize === size ? '#3b82f6' : 'white',
                            color: selectedSize === size ? 'white' : '#1f2937',
                            border: '2px solid',
                            borderColor: selectedSize === size ? '#3b82f6' : '#e5e7eb',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all var(--st-duration-fast)',
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </Row>
                  </Column>

                  <Column gap={2}>
                    <Text weight="semibold">Quantity</Text>
                    <Row gap={2} align="center">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '20px',
                        }}
                      >
                        -
                      </button>
                      <Box
                        pad={3}
                        radius={2}
                        style={{
                          minWidth: '60px',
                          textAlign: 'center',
                          border: '1px solid #e5e7eb',
                        }}
                      >
                        <Text weight="bold">{quantity}</Text>
                      </Box>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '20px',
                        }}
                      >
                        +
                      </button>
                    </Row>
                  </Column>
                </Column>

                <Column gap={2}>
                  <button
                    style={{
                      padding: '16px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      transition: 'background var(--st-duration-fast)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                  >
                    Add to Cart
                  </button>

                  <button
                    style={{
                      padding: '16px',
                      background: 'transparent',
                      color: '#3b82f6',
                      border: '2px solid #3b82f6',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      transition: 'all var(--st-duration-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#3b82f6'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#3b82f6'
                    }}
                  >
                    Buy Now
                  </button>
                </Column>

                <Column gap={2}>
                  <Row gap={2}>
                    <Text>🚚</Text>
                    <Text size={1}>Free shipping on orders over $50</Text>
                  </Row>
                  <Row gap={2}>
                    <Text>↩️</Text>
                    <Text size={1}>30-day return policy</Text>
                  </Row>
                  <Row gap={2}>
                    <Text>✓</Text>
                    <Text size={1}>In stock and ready to ship</Text>
                  </Row>
                </Column>
              </Column>
            </Grid>
          </Box>
        </Container>

        <Footer />
      </Column>
    )
  },
}
