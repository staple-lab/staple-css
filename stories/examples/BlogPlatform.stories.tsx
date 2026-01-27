import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Grid, Container, Text, Card } from '@staple-css/primitives/full'
import { useState } from 'react'

const meta = {
  title: 'Examples/Blog Platform',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Blog post card
const BlogPostCard = ({
  title,
  excerpt,
  author,
  date,
  readTime,
  tags,
  featured = false
}: {
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  tags: string[]
  featured?: boolean
}) => (
  <Box
    radius={2}
    shadow={featured ? 2 : 1}
    style={{
      background: 'white',
      cursor: 'pointer',
      transition: 'all var(--st-duration-normal) var(--st-easing-out)',
      border: featured ? '2px solid #3b82f6' : 'none',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = featured
        ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        : '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    }}
  >
    <Box
      aspectRatio="video"
      style={{
        background: `linear-gradient(135deg,
          ${featured ? '#3b82f6' : '#e5e7eb'} 0%,
          ${featured ? '#1d4ed8' : '#d1d5db'} 100%)`,
        borderRadius: '8px 8px 0 0',
      }}
    />

    <Column gap={3} pad={5}>
      {featured && (
        <Box
          pad={1}
          radius={1}
          style={{
            display: 'inline-block',
            background: '#dbeafe',
            color: '#1d4ed8',
            fontSize: '12px',
            fontWeight: 'bold',
            alignSelf: 'flex-start',
          }}
        >
          FEATURED
        </Box>
      )}

      <Column gap={2}>
        <Text size={featured ? 5 : 4} weight="bold">
          {title}
        </Text>
        <Text tone="muted" leading="relaxed">
          {excerpt}
        </Text>
      </Column>

      <Row gap={2} wrap="wrap">
        {tags.map((tag) => (
          <Box
            key={tag}
            pad={1}
            radius={1}
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all var(--st-duration-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f9fafb'
            }}
          >
            <Text size={0}>#{tag}</Text>
          </Box>
        ))}
      </Row>

      <Row justify="between" align="center" style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
        <Row gap={2} align="center">
          <Box
            style={{
              width: '32px',
              height: '32px',
              background: '#3b82f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {author.charAt(0)}
          </Box>
          <Column gap={0}>
            <Text size={1} weight="semibold">
              {author}
            </Text>
            <Text size={0} tone="muted">
              {date}
            </Text>
          </Column>
        </Row>

        <Text size={0} tone="muted">
          {readTime} read
        </Text>
      </Row>
    </Column>
  </Box>
)

// Header
const BlogHeader = () => (
  <Box
    pad={5}
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
        <Row gap={8} align="center">
          <Text size={4} weight="bold" style={{ cursor: 'pointer' }}>
            DevBlog
          </Text>
          <Row gap={5} align="center">
            {['Articles', 'Tutorials', 'Guides', 'About'].map((item) => (
              <Text
                key={item}
                weight="medium"
                style={{
                  cursor: 'pointer',
                  transition: 'color var(--st-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
              >
                {item}
              </Text>
            ))}
          </Row>
        </Row>

        <Row gap={3} align="center">
          <Box
            pad={3}
            radius={2}
            style={{
              background: '#f9fafb',
              cursor: 'pointer',
              transition: 'background var(--st-duration-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
          >
            <Text>🔍</Text>
          </Box>
          <button
            style={{
              padding: '10px 20px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'background var(--st-duration-fast)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
          >
            Write
          </button>
        </Row>
      </Row>
    </Container>
  </Box>
)

// Hero section
const BlogHero = () => (
  <Box
    pad={8}
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    }}
  >
    <Container size="lg">
      <Column gap={4} align="center">
        <Text as="h1" size={6} weight="bold" align="center">
          Stories and insights from developers
        </Text>
        <Text size={3} align="center" style={{ maxWidth: '600px' }}>
          Latest articles about software engineering, design, and technology.
        </Text>
        <Box
          style={{
            width: '100%',
            maxWidth: '500px',
            position: 'relative',
          }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            style={{
              width: '100%',
              padding: '14px 48px 14px 20px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            }}
          />
          <Box
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '24px',
            }}
          >
            🔍
          </Box>
        </Box>
      </Column>
    </Container>
  </Box>
)

// Sidebar
const Sidebar = () => (
  <Column gap={5}>
    {/* Categories */}
    <Box pad={4} radius={2} shadow={1} style={{ background: 'white' }}>
      <Column gap={3}>
        <Text size={3} weight="bold">
          Categories
        </Text>
        <Column gap={2}>
          {[
            { name: 'JavaScript', count: 42 },
            { name: 'React', count: 38 },
            { name: 'TypeScript', count: 29 },
            { name: 'CSS', count: 24 },
            { name: 'Node.js', count: 21 },
            { name: 'Design', count: 18 },
          ].map((cat) => (
            <Row
              key={cat.name}
              justify="between"
              align="center"
              pad={2}
              radius={2}
              style={{
                cursor: 'pointer',
                transition: 'background var(--st-duration-fast)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Text weight="medium">{cat.name}</Text>
              <Text size={0} tone="muted">
                {cat.count}
              </Text>
            </Row>
          ))}
        </Column>
      </Column>
    </Box>

    {/* Popular posts */}
    <Box pad={4} radius={2} shadow={1} style={{ background: 'white' }}>
      <Column gap={3}>
        <Text size={3} weight="bold">
          Popular Posts
        </Text>
        <Column gap={3}>
          {[
            { title: 'Getting Started with React Hooks', views: '12.5K' },
            { title: 'CSS Grid Layout Complete Guide', views: '9.8K' },
            { title: 'TypeScript Best Practices', views: '8.2K' },
          ].map((post, i) => (
            <Row
              key={i}
              gap={3}
              style={{
                cursor: 'pointer',
                paddingBottom: '12px',
                borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              <Text size={3} weight="bold" tone="muted">
                {i + 1}
              </Text>
              <Column gap={1} style={{ flex: 1 }}>
                <Text size={1} weight="semibold">
                  {post.title}
                </Text>
                <Text size={0} tone="muted">
                  {post.views} views
                </Text>
              </Column>
            </Row>
          ))}
        </Column>
      </Column>
    </Box>

    {/* Newsletter */}
    <Box pad={5} radius={2} shadow={1} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <Column gap={3}>
        <Text size={3} weight="bold">
          Weekly Newsletter
        </Text>
        <Text size={1}>
          Get the latest articles delivered to your inbox every week.
        </Text>
        <input
          type="email"
          placeholder="Your email"
          style={{
            padding: '10px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
        <button
          style={{
            padding: '10px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform var(--st-duration-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Subscribe
        </button>
      </Column>
    </Box>
  </Column>
)

// Complete blog platform
export const CompleteBlog: Story = {
  render: () => {
    const posts = [
      {
        title: 'Building Modern Web Applications with React 19',
        excerpt: 'Explore the latest features in React 19 and learn how to build performant, scalable applications.',
        author: 'Sarah Johnson',
        date: 'Jan 25, 2025',
        readTime: '8 min',
        tags: ['react', 'javascript', 'web-dev'],
        featured: true,
      },
      {
        title: 'Mastering TypeScript Generics',
        excerpt: 'A comprehensive guide to understanding and using generics in TypeScript for type-safe code.',
        author: 'Michael Chen',
        date: 'Jan 24, 2025',
        readTime: '12 min',
        tags: ['typescript', 'programming'],
        featured: false,
      },
      {
        title: 'CSS Grid vs Flexbox: When to Use What',
        excerpt: 'Learn the key differences between CSS Grid and Flexbox and when to use each for optimal layouts.',
        author: 'Emma Davis',
        date: 'Jan 23, 2025',
        readTime: '6 min',
        tags: ['css', 'design', 'web-dev'],
        featured: false,
      },
      {
        title: 'Node.js Performance Optimization Techniques',
        excerpt: 'Boost your Node.js application performance with these proven optimization strategies.',
        author: 'David Kumar',
        date: 'Jan 22, 2025',
        readTime: '10 min',
        tags: ['nodejs', 'backend', 'performance'],
        featured: false,
      },
      {
        title: 'Design Systems: Building Consistent UIs at Scale',
        excerpt: 'How to create and maintain a design system that scales across large organizations.',
        author: 'Lisa Anderson',
        date: 'Jan 21, 2025',
        readTime: '15 min',
        tags: ['design', 'ui-ux', 'systems'],
        featured: false,
      },
      {
        title: 'Getting Started with Docker for Developers',
        excerpt: 'A beginner-friendly introduction to Docker and containerization for modern development.',
        author: 'James Wilson',
        date: 'Jan 20, 2025',
        readTime: '9 min',
        tags: ['docker', 'devops', 'tutorial'],
        featured: false,
      },
    ]

    return (
      <Column gap={0} style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <BlogHeader />
        <BlogHero />

        <Container size="7xl">
          <Box pad={6}>
            <Grid cols={{ base: 1, lg: '3fr 1fr' }} gap={6}>
              {/* Main content */}
              <Column gap={6}>
                <Column gap={4}>
                  <Text size={5} weight="bold">
                    Latest Articles
                  </Text>

                  <Column gap={5}>
                    {posts.map((post, i) => (
                      <BlogPostCard key={i} {...post} />
                    ))}
                  </Column>

                  {/* Load more */}
                  <Box style={{ textAlign: 'center', padding: '20px' }}>
                    <button
                      style={{
                        padding: '12px 32px',
                        background: 'white',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all var(--st-duration-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f9fafb'
                        e.currentTarget.style.borderColor = '#3b82f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white'
                        e.currentTarget.style.borderColor = '#e5e7eb'
                      }}
                    >
                      Load More Articles
                    </button>
                  </Box>
                </Column>
              </Column>

              {/* Sidebar */}
              <Box style={{ position: 'sticky', top: '100px', alignSelf: 'flex-start' }}>
                <Sidebar />
              </Box>
            </Grid>
          </Box>
        </Container>
      </Column>
    )
  },
}

// Article reading page
export const ArticlePage: Story = {
  render: () => (
    <Column gap={0} style={{ minHeight: '100vh', background: 'white' }}>
      <BlogHeader />

      <Container size="prose">
        <Column gap={6} pad={6}>
          {/* Article header */}
          <Column gap={4}>
            <Row gap={2}>
              {['React', 'Tutorial', 'JavaScript'].map((tag) => (
                <Box
                  key={tag}
                  pad={1}
                  radius={1}
                  style={{
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {tag.toUpperCase()}
                </Box>
              ))}
            </Row>

            <Text as="h1" size={6} weight="bold">
              Building Modern Web Applications with React 19
            </Text>

            <Row justify="between" align="center">
              <Row gap={3} align="center">
                <Box
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  S
                </Box>
                <Column gap={0}>
                  <Text weight="semibold">Sarah Johnson</Text>
                  <Text size={1} tone="muted">
                    Published on Jan 25, 2025 • 8 min read
                  </Text>
                </Column>
              </Row>

              <Row gap={2}>
                {['🔖', '❤️', '💬'].map((icon) => (
                  <Box
                    key={icon}
                    pad={2}
                    radius={2}
                    style={{
                      background: '#f9fafb',
                      cursor: 'pointer',
                      transition: 'all var(--st-duration-fast)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#f9fafb'}
                  >
                    <Text size={3}>{icon}</Text>
                  </Box>
                ))}
              </Row>
            </Row>
          </Column>

          {/* Featured image */}
          <Box
            aspectRatio="video"
            radius={3}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            }}
          />

          {/* Article content */}
          <Column gap={5}>
            <Text as="p" leading="relaxed">
              React 19 introduces powerful new features that make building modern web applications
              easier and more efficient than ever before. In this comprehensive guide, we'll explore
              these features and show you how to leverage them in your projects.
            </Text>

            <Text as="h2" size={4} weight="bold">
              What's New in React 19
            </Text>

            <Text as="p" leading="relaxed">
              The latest version of React brings several game-changing features that improve both
              developer experience and application performance. Let's dive into the most important
              updates you need to know about.
            </Text>

            <Box
              pad={4}
              radius={2}
              style={{
                background: '#f9fafb',
                borderLeft: '4px solid #3b82f6',
              }}
            >
              <Text size={2} leading="relaxed">
                <strong>Key Takeaway:</strong> React 19 focuses on making React faster, more
                intuitive, and better suited for modern web development patterns.
              </Text>
            </Box>

            <Text as="h3" size={3} weight="semibold">
              1. Server Components
            </Text>

            <Text as="p" leading="relaxed">
              Server Components allow you to render parts of your application on the server,
              reducing bundle size and improving initial page load times. This is particularly
              useful for data-heavy applications where you want to fetch data server-side.
            </Text>

            <Box
              pad={3}
              radius={2}
              style={{
                background: '#1f2937',
                color: '#f9fafb',
                overflow: 'auto',
              }}
            >
              <Column gap={1}>
                <Text mono size={1}>
                  // app/page.tsx (Server Component)
                </Text>
                <Text mono size={1}>
                  export default async function HomePage() {'{'}
                </Text>
                <Text mono size={1}>
                  {'  '}const data = await fetchData();
                </Text>
                <Text mono size={1}>
                  {'  '}return &lt;div&gt;{'{data.title}'}&lt;/div&gt;;
                </Text>
                <Text mono size={1}>
                  {'}'}
                </Text>
              </Column>
            </Box>

            <Text as="h3" size={3} weight="semibold">
              2. Improved Suspense
            </Text>

            <Text as="p" leading="relaxed">
              The Suspense component has been enhanced with better streaming and error handling
              capabilities. This makes it easier to build applications with complex loading states
              and progressive enhancement.
            </Text>

            <Text as="h2" size={4} weight="bold">
              Best Practices
            </Text>

            <Column gap={2}>
              {[
                'Use Server Components for data fetching',
                'Implement proper error boundaries',
                'Optimize images with next/image',
                'Leverage automatic code splitting',
                'Use TypeScript for type safety',
              ].map((practice, i) => (
                <Row key={i} gap={2} align="start">
                  <Text weight="bold" style={{ color: '#3b82f6' }}>
                    ✓
                  </Text>
                  <Text leading="relaxed">{practice}</Text>
                </Row>
              ))}
            </Column>

            <Text as="h2" size={4} weight="bold">
              Conclusion
            </Text>

            <Text as="p" leading="relaxed">
              React 19 represents a significant step forward for the framework. By adopting these
              new features and following best practices, you can build faster, more maintainable
              applications that provide an excellent user experience.
            </Text>
          </Column>

          {/* Article footer */}
          <Box
            pad={5}
            radius={2}
            style={{
              background: '#f9fafb',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            <Row justify="between" align="center">
              <Text weight="semibold">Found this helpful?</Text>
              <Row gap={2}>
                <button
                  style={{
                    padding: '10px 20px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  ❤️ Like
                </button>
                <button
                  style={{
                    padding: '10px 20px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  💬 Comment
                </button>
                <button
                  style={{
                    padding: '10px 20px',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  🔗 Share
                </button>
              </Row>
            </Row>
          </Box>

          {/* Author bio */}
          <Box pad={5} radius={2} shadow={1}>
            <Row gap={4}>
              <Box
                style={{
                  width: '80px',
                  height: '80px',
                  background: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}
              >
                S
              </Box>
              <Column gap={2} style={{ flex: 1 }}>
                <Text size={3} weight="bold">
                  Sarah Johnson
                </Text>
                <Text leading="relaxed" tone="muted">
                  Senior Frontend Engineer with 8 years of experience building web applications.
                  Passionate about React, TypeScript, and developer education.
                </Text>
                <Row gap={2}>
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
                    }}
                  >
                    Follow
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      background: 'transparent',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '14px',
                    }}
                  >
                    More Articles
                  </button>
                </Row>
              </Column>
            </Row>
          </Box>
        </Column>
      </Container>
    </Column>
  ),
}
