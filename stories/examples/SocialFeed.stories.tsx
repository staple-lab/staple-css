import type { Meta, StoryObj } from '@storybook/react'
import { Box, Column, Row, Grid, Text } from '@staple-css/primitives'
import { useState } from 'react'

const meta = {
  title: 'Examples/Social Media Feed',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

// Post component
const Post = ({
  author,
  timeAgo,
  content,
  image,
  likes,
  comments,
  shares,
}: {
  author: { name: string; handle: string; avatar: string }
  timeAgo: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
}) => {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <Box
      pad={5}
      radius={2}
      shadow={1}
      style={{
        background: 'white',
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      <Column gap={4}>
        {/* Post header */}
        <Row gap={3}>
          <Box
            style={{
              width: '48px',
              height: '48px',
              background: author.avatar,
              backgroundSize: 'cover',
              borderRadius: '50%',
              flexShrink: 0,
            }}
          />
          <Column gap={0} style={{ flex: 1 }}>
            <Row justify="between" align="start">
              <Column gap={0}>
                <Text weight="bold">{author.name}</Text>
                <Text size={1} tone="muted">
                  @{author.handle} · {timeAgo}
                </Text>
              </Column>
              <Box
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'background var(--st-duration-fast)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Text>⋯</Text>
              </Box>
            </Row>
          </Column>
        </Row>

        {/* Post content */}
        <Text leading="relaxed">{content}</Text>

        {/* Post image */}
        {image && (
          <Box
            radius={2}
            style={{
              aspectRatio: 'video',
              background: image,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          />
        )}

        {/* Post actions */}
        <Row justify="between" align="center" style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
          <Row gap={6}>
            <Row
              gap={2}
              align="center"
              style={{ cursor: 'pointer' }}
              onClick={handleLike}
            >
              <Text
                size={3}
                style={{
                  transition: 'all var(--st-duration-normal) var(--st-easing-bounce)',
                  color: liked ? '#dc2626' : 'inherit',
                  transform: liked ? 'scale(1.2)' : 'scale(1)',
                }}
              >
                {liked ? '❤️' : '🤍'}
              </Text>
              <Text size={1} weight="medium" style={{ color: liked ? '#dc2626' : 'inherit' }}>
                {likeCount}
              </Text>
            </Row>

            <Row gap={2} align="center" style={{ cursor: 'pointer' }}>
              <Text size={3}>💬</Text>
              <Text size={1} weight="medium">
                {comments}
              </Text>
            </Row>

            <Row gap={2} align="center" style={{ cursor: 'pointer' }}>
              <Text size={3}>🔁</Text>
              <Text size={1} weight="medium">
                {shares}
              </Text>
            </Row>

            <Row gap={2} align="center" style={{ cursor: 'pointer' }}>
              <Text size={3}>📤</Text>
            </Row>
          </Row>
        </Row>
      </Column>
    </Box>
  )
}

// Story component
const Story = ({
  author,
  image,
  active = false,
}: {
  author: { name: string; avatar: string }
  image: string
  active?: boolean
}) => (
  <Box
    style={{
      cursor: 'pointer',
      position: 'relative',
    }}
  >
    <Box
      style={{
        width: '80px',
        height: '80px',
        background: image,
        backgroundSize: 'cover',
        borderRadius: '50%',
        border: active ? '3px solid #3b82f6' : '3px solid #e5e7eb',
        padding: '3px',
        transition: 'transform var(--st-duration-fast)',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    />
    <Text size={0} align="center" style={{ marginTop: '4px', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {author.name}
    </Text>
  </Box>
)

// Trending topic
const TrendingTopic = ({
  category,
  topic,
  posts,
}: {
  category: string
  topic: string
  posts: string
}) => (
  <Box
    pad={3}
    radius={2}
    style={{
      cursor: 'pointer',
      transition: 'background var(--st-duration-fast)',
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
  >
    <Column gap={1}>
      <Text size={0} tone="muted">
        {category}
      </Text>
      <Text weight="bold">{topic}</Text>
      <Text size={0} tone="muted">
        {posts} posts
      </Text>
    </Column>
  </Box>
)

// Complete social feed
export const CompleteFeed: Story = {
  render: () => {
    const stories = [
      { author: { name: 'You', avatar: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }, image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', active: false },
      { author: { name: 'Sarah', avatar: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }, image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', active: true },
      { author: { name: 'Mike', avatar: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }, image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', active: true },
      { author: { name: 'Emma', avatar: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }, image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', active: true },
      { author: { name: 'David', avatar: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }, image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', active: false },
    ]

    const posts = [
      {
        author: { name: 'Sarah Johnson', handle: 'sarahj', avatar: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        timeAgo: '2h',
        content: 'Just shipped our new design system! 🎨 Check out the interactive component library we built with React and TypeScript. Super excited to share this with the community!',
        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        likes: 342,
        comments: 28,
        shares: 12,
      },
      {
        author: { name: 'Michael Chen', handle: 'mchen', avatar: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        timeAgo: '4h',
        content: 'New blog post: "10 Performance Tips for React Apps" 🚀\n\nCovering code splitting, memoization, lazy loading, and more. Link in bio!',
        likes: 189,
        comments: 15,
        shares: 34,
      },
      {
        author: { name: 'Emma Davis', handle: 'emmad', avatar: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        timeAgo: '6h',
        content: 'Working on something exciting... Can\'t wait to show you all what we\'ve been building. Hint: It involves AI and design tools 👀',
        image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        likes: 521,
        comments: 67,
        shares: 23,
      },
    ]

    return (
      <Grid
        cols={{ base: 1, lg: '320px 1fr 380px' }}
        gap={0}
        style={{ minHeight: '100vh', background: '#f9fafb' }}
      >
        {/* Left sidebar */}
        <Box
          pad={5}
          style={{
            background: 'white',
            borderRight: '1px solid #e5e7eb',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          <Column gap={4}>
            <Text size={4} weight="bold">
              Social
            </Text>

            <Column gap={2}>
              {[
                { icon: '🏠', label: 'Home', active: true },
                { icon: '🔍', label: 'Explore', active: false },
                { icon: '🔔', label: 'Notifications', active: false },
                { icon: '✉️', label: 'Messages', active: false },
                { icon: '🔖', label: 'Bookmarks', active: false },
                { icon: '👤', label: 'Profile', active: false },
              ].map((item) => (
                <Row
                  key={item.label}
                  gap={3}
                  align="center"
                  pad={3}
                  radius={2}
                  style={{
                    cursor: 'pointer',
                    background: item.active ? '#dbeafe' : 'transparent',
                    transition: 'background var(--st-duration-fast)',
                  }}
                  onMouseEnter={(e) => {
                    if (!item.active) e.currentTarget.style.background = '#f9fafb'
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Text size={3}>{item.icon}</Text>
                  <Text weight={item.active ? 'bold' : 'medium'}>{item.label}</Text>
                </Row>
              ))}
            </Column>

            <button
              style={{
                padding: '12px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                width: '100%',
                transition: 'background var(--st-duration-fast)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
            >
              Post
            </button>
          </Column>
        </Box>

        {/* Main feed */}
        <Column gap={0} style={{ maxWidth: '700px', marginX: 'auto', width: '100%' }}>
          {/* Header */}
          <Box
            pad={4}
            style={{
              background: 'white',
              borderBottom: '1px solid #e5e7eb',
              position: 'sticky',
              top: 0,
              zIndex: 10,
            }}
          >
            <Text size={4} weight="bold">
              Home
            </Text>
          </Box>

          {/* Stories */}
          <Box
            pad={4}
            style={{
              background: 'white',
              borderBottom: '1px solid #e5e7eb',
              overflowX: 'auto',
            }}
          >
            <Row gap={3} style={{ minWidth: 'fit-content' }}>
              {stories.map((story, i) => (
                <Story key={i} {...story} />
              ))}
            </Row>
          </Box>

          {/* New post box */}
          <Box
            pad={5}
            style={{
              background: 'white',
              borderBottom: '1px solid #e5e7eb',
            }}
          >
            <Row gap={3}>
              <Box
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <Column gap={3} style={{ flex: 1 }}>
                <textarea
                  placeholder="What's happening?"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'none',
                    minHeight: '80px',
                    background: '#f9fafb',
                  }}
                />
                <Row justify="between" align="center">
                  <Row gap={2}>
                    {['🖼️', '📊', '😊', '📍'].map((icon) => (
                      <Box
                        key={icon}
                        pad={2}
                        radius={2}
                        style={{
                          cursor: 'pointer',
                          transition: 'background var(--st-duration-fast)',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Text size={3}>{icon}</Text>
                      </Box>
                    ))}
                  </Row>
                  <button
                    style={{
                      padding: '10px 24px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    Post
                  </button>
                </Row>
              </Column>
            </Row>
          </Box>

          {/* Posts */}
          <Column gap={0}>
            {posts.map((post, i) => (
              <Post key={i} {...post} />
            ))}
          </Column>
        </Column>

        {/* Right sidebar */}
        <Box
          pad={5}
          style={{
            background: 'white',
            borderLeft: '1px solid #e5e7eb',
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          <Column gap={5}>
            {/* Search */}
            <Box
              pad={3}
              radius={3}
              style={{
                background: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Text>🔍</Text>
              <input
                type="text"
                placeholder="Search"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                }}
              />
            </Box>

            {/* Trending */}
            <Box radius={2} style={{ border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <Column gap={0}>
                <Box pad={4} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <Text size={3} weight="bold">
                    Trending
                  </Text>
                </Box>
                <TrendingTopic
                  category="Technology"
                  topic="#React19"
                  posts="12.5K"
                />
                <TrendingTopic
                  category="Web Development"
                  topic="#TypeScript"
                  posts="8.3K"
                />
                <TrendingTopic
                  category="Design"
                  topic="#DesignSystems"
                  posts="5.7K"
                />
                <TrendingTopic
                  category="Programming"
                  topic="#JavaScript"
                  posts="15.2K"
                />
                <Box
                  pad={3}
                  style={{
                    cursor: 'pointer',
                    color: '#3b82f6',
                  }}
                >
                  <Text size={1} weight="medium">
                    Show more
                  </Text>
                </Box>
              </Column>
            </Box>

            {/* Who to follow */}
            <Box radius={2} style={{ border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <Column gap={0}>
                <Box pad={4} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <Text size={3} weight="bold">
                    Who to follow
                  </Text>
                </Box>
                {[
                  { name: 'Tech News Daily', handle: 'technews', followers: '2.5M' },
                  { name: 'Design Inspiration', handle: 'designinspo', followers: '1.2M' },
                  { name: 'Code Tips', handle: 'codetips', followers: '890K' },
                ].map((user) => (
                  <Box
                    key={user.handle}
                    pad={3}
                    style={{
                      borderBottom: '1px solid #f3f4f6',
                      cursor: 'pointer',
                      transition: 'background var(--st-duration-fast)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Row justify="between" align="center">
                      <Row gap={2} align="center">
                        <Box
                          style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                          }}
                        />
                        <Column gap={0}>
                          <Text size={1} weight="semibold">
                            {user.name}
                          </Text>
                          <Text size={0} tone="muted">
                            @{user.handle}
                          </Text>
                        </Column>
                      </Row>
                      <button
                        style={{
                          padding: '6px 16px',
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '12px',
                        }}
                      >
                        Follow
                      </button>
                    </Row>
                  </Box>
                ))}
                <Box
                  pad={3}
                  style={{
                    cursor: 'pointer',
                    color: '#3b82f6',
                  }}
                >
                  <Text size={1} weight="medium">
                    Show more
                  </Text>
                </Box>
              </Column>
            </Box>
          </Column>
        </Box>
      </Grid>
    )
  },
}

// Mobile view
export const MobileFeed: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => {
    const posts = [
      {
        author: { name: 'Sarah Johnson', handle: 'sarahj', avatar: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        timeAgo: '2h',
        content: 'Just shipped our new design system! 🎨',
        image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        likes: 342,
        comments: 28,
        shares: 12,
      },
      {
        author: { name: 'Michael Chen', handle: 'mchen', avatar: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        timeAgo: '4h',
        content: 'New blog post: "10 Performance Tips for React Apps" 🚀',
        likes: 189,
        comments: 15,
        shares: 34,
      },
    ]

    return (
      <Column gap={0} style={{ minHeight: '100vh', background: 'white' }}>
        {/* Mobile header */}
        <Box
          pad={4}
          style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <Row justify="between" align="center">
            <Box
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
              }}
            />
            <Text size={3} weight="bold">
              Home
            </Text>
            <Text size={3}>⚙️</Text>
          </Row>
        </Box>

        {/* Posts */}
        <Column gap={0}>
          {posts.map((post, i) => (
            <Post key={i} {...post} />
          ))}
        </Column>

        {/* Bottom navigation */}
        <Box
          pad={3}
          style={{
            background: 'white',
            borderTop: '1px solid #e5e7eb',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Row justify="around">
            {['🏠', '🔍', '➕', '🔔', '👤'].map((icon) => (
              <Box
                key={icon}
                pad={2}
                style={{ cursor: 'pointer' }}
              >
                <Text size={4}>{icon}</Text>
              </Box>
            ))}
          </Row>
        </Box>
      </Column>
    )
  },
}
