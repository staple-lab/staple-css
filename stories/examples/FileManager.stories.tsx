import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Flex'
import { Row } from '../../packages/primitives/src/Flex'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/File Manager',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface FileItem {
  id: string
  name: string
  type: 'folder' | 'file'
  icon: string
  size?: string
  modified: string
  shared?: boolean
  starred?: boolean
}

const files: FileItem[] = [
  {
    id: '1',
    name: 'Design Projects',
    type: 'folder',
    icon: '📁',
    modified: 'Today',
    starred: true,
  },
  {
    id: '2',
    name: 'Documents',
    type: 'folder',
    icon: '📁',
    modified: 'Yesterday',
  },
  {
    id: '3',
    name: 'Photos',
    type: 'folder',
    icon: '📁',
    modified: '2 days ago',
    shared: true,
  },
  {
    id: '4',
    name: 'presentation.pdf',
    type: 'file',
    icon: '📄',
    size: '2.4 MB',
    modified: 'Today',
    starred: true,
  },
  {
    id: '5',
    name: 'mockup-v3.fig',
    type: 'file',
    icon: '🎨',
    size: '856 KB',
    modified: 'Today',
  },
  {
    id: '6',
    name: 'meeting-notes.md',
    type: 'file',
    icon: '📝',
    size: '12 KB',
    modified: 'Yesterday',
  },
  {
    id: '7',
    name: 'screenshot.png',
    type: 'file',
    icon: '🖼️',
    size: '1.2 MB',
    modified: '2 days ago',
  },
  {
    id: '8',
    name: 'video-demo.mp4',
    type: 'file',
    icon: '🎬',
    size: '45.8 MB',
    modified: '3 days ago',
  },
]

const FileGridItem = ({
  file,
  isSelected,
  onClick,
}: {
  file: FileItem
  isSelected: boolean
  onClick: () => void
}) => (
  <Box
    pad={3}
    radius={2}
    style={{
      background: isSelected ? '#e0e7ff' : 'white',
      border: isSelected ? '2px solid #4f46e5' : '1px solid var(--st-color-border)',
      cursor: 'pointer',
      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
      position: 'relative',
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      }
    }}
    onMouseLeave={(e) => {
      if (!isSelected) {
        e.currentTarget.style.boxShadow = 'none'
      }
    }}
  >
    <Column gap={2} style={{ alignItems: 'center' }}>
      {file.starred && (
        <Box style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <Text size={2}>⭐</Text>
        </Box>
      )}
      {file.shared && (
        <Box style={{ position: 'absolute', top: '8px', left: '8px' }}>
          <Text size={2}>👥</Text>
        </Box>
      )}
      <Text size={6}>{file.icon}</Text>
      <Text
        size={1}
        weight="medium"
        align="center"
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {file.name}
      </Text>
      <Text size={0} tone="muted">
        {file.size || file.modified}
      </Text>
    </Column>
  </Box>
)

const FileListItem = ({
  file,
  isSelected,
  onClick,
}: {
  file: FileItem
  isSelected: boolean
  onClick: () => void
}) => (
  <Box
    pad={3}
    style={{
      background: isSelected ? '#e0e7ff' : 'transparent',
      cursor: 'pointer',
      transition: 'all var(--st-duration-fast) var(--st-easing-out)',
      borderBottom: '1px solid var(--st-color-border)',
    }}
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = '#f9fafb'
      }
    }}
    onMouseLeave={(e) => {
      if (!isSelected) {
        e.currentTarget.style.background = 'transparent'
      }
    }}
  >
    <Row gap={3} align="center">
      <Text size={3}>{file.icon}</Text>
      <Column gap={0} style={{ flex: '1 1 0', minWidth: 0 }}>
        <Text size={2} weight="medium" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {file.name}
        </Text>
      </Column>
      <Text size={1} tone="muted" style={{ width: '100px' }}>
        {file.size || '--'}
      </Text>
      <Text size={1} tone="muted" style={{ width: '120px' }}>
        {file.modified}
      </Text>
      <Row gap={2}>
        {file.starred && <Text size={2}>⭐</Text>}
        {file.shared && <Text size={2}>👥</Text>}
      </Row>
    </Row>
  </Box>
)

export const CompleteFileManager: Story = {
  render: () => {
    const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set())
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name')

    const toggleFileSelection = (id: string) => {
      const newSelection = new Set(selectedFileIds)
      if (newSelection.has(id)) {
        newSelection.delete(id)
      } else {
        newSelection.add(id)
      }
      setSelectedFileIds(newSelection)
    }

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
          <Column gap={3}>
            <Row gap={4} align="center" justify="space-between">
              <Row gap={3} align="center">
                <Text size={4} weight="bold">
                  📂 Files
                </Text>
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#4f46e5',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={2} weight="semibold">
                    + Upload
                  </Text>
                </Box>
                <Box
                  pad={2}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                  }}
                >
                  <Text size={2}>+ New Folder</Text>
                </Box>
              </Row>
              <Row gap={3} align="center">
                <Box
                  style={{
                    width: '300px',
                    padding: '8px 12px',
                    background: '#f3f4f6',
                    borderRadius: '6px',
                  }}
                >
                  <Text size={2} tone="muted">
                    🔍 Search files...
                  </Text>
                </Box>
                <Row gap={1}>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: viewMode === 'grid' ? '#e0e7ff' : '#f3f4f6',
                      color: viewMode === 'grid' ? '#4f46e5' : 'inherit',
                      cursor: 'pointer',
                    }}
                    onClick={() => setViewMode('grid')}
                  >
                    <Text size={2}>▦</Text>
                  </Box>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: viewMode === 'list' ? '#e0e7ff' : '#f3f4f6',
                      color: viewMode === 'list' ? '#4f46e5' : 'inherit',
                      cursor: 'pointer',
                    }}
                    onClick={() => setViewMode('list')}
                  >
                    <Text size={2}>☰</Text>
                  </Box>
                </Row>
              </Row>
            </Row>

            {/* Breadcrumb */}
            <Row gap={2} align="center">
              <Text size={2} style={{ cursor: 'pointer' }}>
                Home
              </Text>
              <Text size={2} tone="muted">
                /
              </Text>
              <Text size={2} style={{ cursor: 'pointer' }}>
                My Files
              </Text>
            </Row>
          </Column>
        </Box>

        {/* Main Content */}
        <Row style={{ flex: '1 1 0', overflow: 'hidden' }}>
          {/* Sidebar */}
          <Box
            style={{
              width: '220px',
              background: '#f9fafb',
              borderRight: '1px solid var(--st-color-border)',
              overflow: 'auto',
            }}
          >
            <Column gap={1} pad={3}>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: 'white',
                  cursor: 'pointer',
                }}
              >
                <Row gap={2} align="center">
                  <Text size={2}>💾</Text>
                  <Column gap={0} style={{ flex: '1 1 0' }}>
                    <Text size={2} weight="semibold">
                      My Drive
                    </Text>
                    <Text size={0} tone="muted">
                      48.2 GB free
                    </Text>
                  </Column>
                </Row>
              </Box>

              <Box style={{ height: '1px', background: 'var(--st-color-border)', margin: '8px 0' }} />

              {[
                { icon: '🏠', label: 'Home', active: true },
                { icon: '⭐', label: 'Starred' },
                { icon: '👥', label: 'Shared with me' },
                { icon: '🕐', label: 'Recent' },
                { icon: '🗑️', label: 'Trash' },
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

              <Box style={{ height: '1px', background: 'var(--st-color-border)', margin: '8px 0' }} />

              <Box pad={3} radius={2} style={{ background: 'white' }}>
                <Column gap={2}>
                  <Text size={1} weight="semibold">
                    Storage
                  </Text>
                  <Box
                    style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        height: '100%',
                        width: '65%',
                        background: '#4f46e5',
                      }}
                    />
                  </Box>
                  <Text size={0} tone="muted">
                    32.8 GB of 50 GB used
                  </Text>
                  <Box
                    pad={2}
                    radius={2}
                    style={{
                      background: '#f3f4f6',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <Text size={1}>Upgrade</Text>
                  </Box>
                </Column>
              </Box>
            </Column>
          </Box>

          {/* Files Area */}
          <Column style={{ flex: '1 1 0' }}>
            {/* Toolbar */}
            <Box
              pad={3}
              style={{
                background: 'white',
                borderBottom: '1px solid var(--st-color-border)',
              }}
            >
              <Row gap={3} align="center" justify="space-between">
                <Row gap={2}>
                  {selectedFileIds.size > 0 ? (
                    <>
                      <Text size={2} weight="semibold">
                        {selectedFileIds.size} selected
                      </Text>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                          cursor: 'pointer',
                        }}
                      >
                        <Text size={2}>📤 Share</Text>
                      </Box>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                          cursor: 'pointer',
                        }}
                      >
                        <Text size={2}>📥 Download</Text>
                      </Box>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                          cursor: 'pointer',
                        }}
                      >
                        <Text size={2}>🗑️ Delete</Text>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Text size={2} tone="muted">
                        Sort by:
                      </Text>
                      {['name', 'date', 'size'].map((sort) => (
                        <Box
                          key={sort}
                          pad={2}
                          radius={2}
                          style={{
                            background: sortBy === sort ? '#e0e7ff' : '#f3f4f6',
                            color: sortBy === sort ? '#4f46e5' : 'inherit',
                            cursor: 'pointer',
                          }}
                          onClick={() => setSortBy(sort as typeof sortBy)}
                        >
                          <Text size={1}>
                            {sort.charAt(0).toUpperCase() + sort.slice(1)}
                          </Text>
                        </Box>
                      ))}
                    </>
                  )}
                </Row>
              </Row>
            </Box>

            {/* Files Content */}
            <Box
              pad={4}
              style={{
                flex: '1 1 0',
                overflow: 'auto',
                background: '#fafafa',
              }}
            >
              {viewMode === 'grid' ? (
                <Box
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 'var(--st-space-3)',
                  }}
                >
                  {files.map((file) => (
                    <FileGridItem
                      key={file.id}
                      file={file}
                      isSelected={selectedFileIds.has(file.id)}
                      onClick={() => toggleFileSelection(file.id)}
                    />
                  ))}
                </Box>
              ) : (
                <Box radius={2} style={{ background: 'white' }}>
                  <Column gap={0}>
                    {/* Header */}
                    <Box
                      pad={3}
                      style={{
                        borderBottom: '2px solid var(--st-color-border)',
                      }}
                    >
                      <Row gap={3} align="center">
                        <Text size={1} weight="semibold" tone="muted" style={{ width: '40px' }}>

                        </Text>
                        <Text size={1} weight="semibold" tone="muted" style={{ flex: '1 1 0' }}>
                          NAME
                        </Text>
                        <Text size={1} weight="semibold" tone="muted" style={{ width: '100px' }}>
                          SIZE
                        </Text>
                        <Text size={1} weight="semibold" tone="muted" style={{ width: '120px' }}>
                          MODIFIED
                        </Text>
                        <Text size={1} weight="semibold" tone="muted" style={{ width: '60px' }}>

                        </Text>
                      </Row>
                    </Box>
                    {files.map((file) => (
                      <FileListItem
                        key={file.id}
                        file={file}
                        isSelected={selectedFileIds.has(file.id)}
                        onClick={() => toggleFileSelection(file.id)}
                      />
                    ))}
                  </Column>
                </Box>
              )}
            </Box>
          </Column>

          {/* Right Sidebar - Details */}
          {selectedFileIds.size === 1 && (
            <Box
              style={{
                width: '280px',
                background: 'white',
                borderLeft: '1px solid var(--st-color-border)',
                overflow: 'auto',
              }}
            >
              {(() => {
                const selectedFile = files.find((f) => selectedFileIds.has(f.id))
                if (!selectedFile) return null

                return (
                  <Column gap={4} pad={4}>
                    <Column gap={3} style={{ alignItems: 'center' }}>
                      <Text size={6}>{selectedFile.icon}</Text>
                      <Text size={3} weight="bold" align="center">
                        {selectedFile.name}
                      </Text>
                    </Column>

                    <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

                    <Column gap={2}>
                      <Row gap={2} align="center" justify="space-between">
                        <Text size={1} tone="muted">
                          Type
                        </Text>
                        <Text size={2}>
                          {selectedFile.type === 'folder' ? 'Folder' : 'File'}
                        </Text>
                      </Row>
                      {selectedFile.size && (
                        <Row gap={2} align="center" justify="space-between">
                          <Text size={1} tone="muted">
                            Size
                          </Text>
                          <Text size={2}>{selectedFile.size}</Text>
                        </Row>
                      )}
                      <Row gap={2} align="center" justify="space-between">
                        <Text size={1} tone="muted">
                          Modified
                        </Text>
                        <Text size={2}>{selectedFile.modified}</Text>
                      </Row>
                      <Row gap={2} align="center" justify="space-between">
                        <Text size={1} tone="muted">
                          Owner
                        </Text>
                        <Text size={2}>You</Text>
                      </Row>
                    </Column>

                    <Box style={{ height: '1px', background: 'var(--st-color-border)' }} />

                    <Column gap={2}>
                      <Text size={2} weight="semibold">
                        Actions
                      </Text>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        <Text size={2}>📤 Share</Text>
                      </Box>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        <Text size={2}>📥 Download</Text>
                      </Box>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        <Text size={2}>✏️ Rename</Text>
                      </Box>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#f3f4f6',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        <Text size={2}>📋 Copy Link</Text>
                      </Box>
                      <Box
                        pad={2}
                        radius={2}
                        style={{
                          background: '#fee2e2',
                          color: '#dc2626',
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        <Text size={2}>🗑️ Delete</Text>
                      </Box>
                    </Column>
                  </Column>
                )
              })()}
            </Box>
          )}
        </Row>
      </Box>
    )
  },
}
