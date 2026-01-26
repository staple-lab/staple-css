import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Stack'
import { Row } from '../../packages/primitives/src/Inline'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/Music Player',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  albumArt: string
}

interface Playlist {
  id: string
  name: string
  trackCount: number
  coverArt: string
}

const tracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Wave',
    album: 'Night Sessions',
    duration: '4:32',
    albumArt: '#3b82f6',
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Lights',
    album: 'Synthwave Vol. 2',
    duration: '3:45',
    albumArt: '#8b5cf6',
  },
  {
    id: '3',
    title: 'Ocean Breeze',
    artist: 'Chill Vibes',
    album: 'Summer Relaxation',
    duration: '5:18',
    albumArt: '#10b981',
  },
  {
    id: '4',
    title: 'Urban Nights',
    artist: 'City Sounds',
    album: 'Metropolitan',
    duration: '4:05',
    albumArt: '#f59e0b',
  },
  {
    id: '5',
    title: 'Digital Love',
    artist: 'Cyber Hearts',
    album: 'Future Romance',
    duration: '3:52',
    albumArt: '#ec4899',
  },
]

const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Chill Vibes',
    trackCount: 24,
    coverArt: '#10b981',
  },
  {
    id: '2',
    name: 'Workout Mix',
    trackCount: 18,
    coverArt: '#ef4444',
  },
  {
    id: '3',
    name: 'Focus Music',
    trackCount: 32,
    coverArt: '#8b5cf6',
  },
  {
    id: '4',
    name: 'Road Trip',
    trackCount: 45,
    coverArt: '#f59e0b',
  },
]

const TrackItem = ({
  track,
  isPlaying,
  onClick,
}: {
  track: Track
  isPlaying: boolean
  onClick: () => void
}) => (
  <Box
    pad={3}
    style={{
      cursor: 'pointer',
      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
      background: isPlaying ? '#f0f9ff' : 'transparent',
      borderRadius: '8px',
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isPlaying) {
        e.currentTarget.style.background = '#f9fafb'
      }
    }}
    onMouseLeave={(e) => {
      if (!isPlaying) {
        e.currentTarget.style.background = 'transparent'
      }
    }}
  >
    <Row gap={3} align="center">
      <Box
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          background: track.albumArt,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.25rem',
        }}
      >
        {isPlaying ? '▶' : '🎵'}
      </Box>
      <Column gap={0} style={{ flex: '1 1 0', minWidth: 0 }}>
        <Text size={2} weight="semibold" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.title}
        </Text>
        <Text size={1} tone="muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.artist}
        </Text>
      </Column>
      <Text size={1} tone="muted">
        {track.duration}
      </Text>
      <Box
        pad={2}
        style={{
          cursor: 'pointer',
        }}
      >
        <Text size={2}>⋮</Text>
      </Box>
    </Row>
  </Box>
)

export const CompleteMusicPlayer: Story = {
  render: () => {
    const [currentTrackId, setCurrentTrackId] = useState<string>('1')
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(70)
    const [progress, setProgress] = useState(45)

    const currentTrack = tracks.find((t) => t.id === currentTrackId) || tracks[0]

    return (
      <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          pad={4}
          style={{
            background: 'white',
            borderBottom: '1px solid var(--st-color-border)',
          }}
        >
          <Row gap={4} align="center" justify="space-between">
            <Row gap={3} align="center">
              <Text size={4} weight="bold">
                🎵 Music
              </Text>
            </Row>
            <Row gap={3} align="center">
              <Box
                style={{
                  width: '300px',
                  padding: '8px 12px',
                  background: '#f3f4f6',
                  borderRadius: '20px',
                }}
              >
                <Text size={2} tone="muted">
                  🔍 Search songs, artists, albums...
                </Text>
              </Box>
              <Box
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                ME
              </Box>
            </Row>
          </Row>
        </Box>

        {/* Main Content */}
        <Row style={{ flex: '1 1 0', overflow: 'hidden' }}>
          {/* Sidebar */}
          <Box
            style={{
              width: '240px',
              background: '#f9fafb',
              borderRight: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={1} pad={3}>
              {[
                { icon: '🏠', label: 'Home', active: true },
                { icon: '🔍', label: 'Search' },
                { icon: '📚', label: 'Your Library' },
              ].map((item) => (
                <Box
                  key={item.label}
                  pad={2}
                  radius={2}
                  style={{
                    background: item.active ? 'white' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onMouseEnter={(e) => {
                    if (!item.active) {
                      e.currentTarget.style.background = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <Row gap={2} align="center">
                    <Text size={2}>{item.icon}</Text>
                    <Text size={2} weight={item.active ? 'semibold' : 'normal'}>
                      {item.label}
                    </Text>
                  </Row>
                </Box>
              ))}

              <Box style={{ height: '1px', background: 'var(--st-color-border)', margin: '12px 0' }} />

              {[
                { icon: '➕', label: 'Create Playlist' },
                { icon: '❤️', label: 'Liked Songs' },
              ].map((item) => (
                <Box
                  key={item.label}
                  pad={2}
                  radius={2}
                  style={{
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Row gap={2} align="center">
                    <Text size={2}>{item.icon}</Text>
                    <Text size={2}>{item.label}</Text>
                  </Row>
                </Box>
              ))}

              <Box style={{ height: '1px', background: 'var(--st-color-border)', margin: '12px 0' }} />

              <Text size={1} weight="semibold" tone="muted" style={{ padding: '8px' }}>
                PLAYLISTS
              </Text>
              {playlists.map((playlist) => (
                <Box
                  key={playlist.id}
                  pad={2}
                  radius={2}
                  style={{
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Row gap={2} align="center">
                    <Box
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '4px',
                        background: playlist.coverArt,
                      }}
                    />
                    <Column gap={0}>
                      <Text size={1}>{playlist.name}</Text>
                      <Text size={0} tone="muted">
                        {playlist.trackCount} songs
                      </Text>
                    </Column>
                  </Row>
                </Box>
              ))}
            </Column>
          </Box>

          {/* Main Area */}
          <Column style={{ flex: '1 1 0' }}>
            {/* Hero Section */}
            <Box
              pad={6}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              <Row gap={5} align="end">
                <Box
                  shadow={2}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '12px',
                    background: currentTrack.albumArt,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                  }}
                >
                  🎵
                </Box>
                <Column gap={3} style={{ flex: '1 1 0' }}>
                  <Text size={1} weight="semibold" style={{ opacity: 0.9 }}>
                    PLAYLIST
                  </Text>
                  <Text
                    size={6}
                    weight="bold"
                    style={{
                      fontSize: '3rem',
                      lineHeight: 1.2,
                    }}
                  >
                    Now Playing
                  </Text>
                  <Row gap={2} align="center">
                    <Text size={2} style={{ opacity: 0.9 }}>
                      {tracks.length} songs
                    </Text>
                    <Text size={2} style={{ opacity: 0.7 }}>
                      •
                    </Text>
                    <Text size={2} style={{ opacity: 0.9 }}>
                      2h 15m
                    </Text>
                  </Row>
                </Column>
              </Row>
            </Box>

            {/* Controls Bar */}
            <Box
              pad={4}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--st-color-border)',
              }}
            >
              <Row gap={4} align="center">
                <Box
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#16a34a',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={2}>🔀 Shuffle</Text>
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={2}>🔁 Repeat</Text>
                </Box>
              </Row>
            </Box>

            {/* Track List */}
            <Box
              pad={4}
              style={{
                flex: '1 1 0',
                overflow: 'auto',
              }}
            >
              <Column gap={1}>
                {tracks.map((track) => (
                  <TrackItem
                    key={track.id}
                    track={track}
                    isPlaying={track.id === currentTrackId && isPlaying}
                    onClick={() => {
                      setCurrentTrackId(track.id)
                      setIsPlaying(true)
                    }}
                  />
                ))}
              </Column>
            </Box>
          </Column>

          {/* Right Sidebar - Queue */}
          <Box
            style={{
              width: '300px',
              background: 'white',
              borderLeft: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={0}>
              <Box pad={4} style={{ borderBottom: '1px solid var(--st-color-border)' }}>
                <Text size={3} weight="bold">
                  Queue
                </Text>
              </Box>
              <Column gap={0} pad={3}>
                <Text size={1} weight="semibold" tone="muted" style={{ padding: '8px' }}>
                  NOW PLAYING
                </Text>
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#f0f9ff',
                  }}
                >
                  <Row gap={2} align="center">
                    <Box
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '6px',
                        background: currentTrack.albumArt,
                      }}
                    />
                    <Column gap={0} style={{ flex: '1 1 0', minWidth: 0 }}>
                      <Text size={1} weight="semibold" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentTrack.title}
                      </Text>
                      <Text size={0} tone="muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {currentTrack.artist}
                      </Text>
                    </Column>
                  </Row>
                </Box>

                <Text size={1} weight="semibold" tone="muted" style={{ padding: '8px', marginTop: '16px' }}>
                  NEXT IN QUEUE
                </Text>
                {tracks.slice(1).map((track) => (
                  <Box
                    key={track.id}
                    pad={2}
                    radius={2}
                    style={{
                      cursor: 'pointer',
                      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <Row gap={2} align="center">
                      <Box
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          background: track.albumArt,
                        }}
                      />
                      <Column gap={0} style={{ flex: '1 1 0', minWidth: 0 }}>
                        <Text size={1} style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {track.title}
                        </Text>
                        <Text size={0} tone="muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {track.artist}
                        </Text>
                      </Column>
                    </Row>
                  </Box>
                ))}
              </Column>
            </Column>
          </Box>
        </Row>

        {/* Bottom Player */}
        <Box
          pad={4}
          style={{
            background: 'white',
            borderTop: '1px solid var(--st-color-border)',
          }}
        >
          <Column gap={3}>
            <Row gap={4} align="center">
              <Box
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  background: currentTrack.albumArt,
                  flexShrink: 0,
                }}
              />
              <Column gap={0} style={{ flex: '1 1 0', minWidth: 0 }}>
                <Text size={2} weight="semibold" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.title}
                </Text>
                <Text size={1} tone="muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.artist}
                </Text>
              </Column>
              <Box style={{ cursor: 'pointer' }}>
                <Text size={3}>❤️</Text>
              </Box>
            </Row>

            <Column gap={2}>
              <Row gap={4} align="center" justify="center">
                <Box style={{ cursor: 'pointer' }}>
                  <Text size={3}>🔀</Text>
                </Box>
                <Box style={{ cursor: 'pointer' }}>
                  <Text size={3}>⏮</Text>
                </Box>
                <Box
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#3b82f6',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </Box>
                <Box style={{ cursor: 'pointer' }}>
                  <Text size={3}>⏭</Text>
                </Box>
                <Box style={{ cursor: 'pointer' }}>
                  <Text size={3}>🔁</Text>
                </Box>
              </Row>

              <Row gap={3} align="center">
                <Text size={1} tone="muted">
                  2:05
                </Text>
                <Box
                  style={{
                    flex: '1 1 0',
                    height: '6px',
                    background: '#e5e7eb',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: '#3b82f6',
                      transition: 'width var(--st-duration-fast) var(--st-easing-out)',
                    }}
                  />
                </Box>
                <Text size={1} tone="muted">
                  {currentTrack.duration}
                </Text>
              </Row>
            </Column>

            <Row gap={3} align="center" justify="end">
              <Text size={2}>🔊</Text>
              <Box
                style={{
                  width: '120px',
                  height: '6px',
                  background: '#e5e7eb',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <Box
                  style={{
                    height: '100%',
                    width: `${volume}%`,
                    background: '#3b82f6',
                  }}
                />
              </Box>
            </Row>
          </Column>
        </Box>
      </Box>
    )
  },
}
