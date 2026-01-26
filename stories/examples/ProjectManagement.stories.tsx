import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '../../packages/primitives/src/Box'
import { Column } from '../../packages/primitives/src/Flex'
import { Row } from '../../packages/primitives/src/Flex'
import { Flex } from '../../packages/primitives/src/Flex'
import { Text } from '../../packages/primitives/src/Text'
import { useState } from 'react'

const meta = {
  title: 'Examples/Project Management',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const TaskCard = ({
  title,
  description,
  assignees,
  priority,
  tags,
  dueDate,
  comments,
}: {
  title: string
  description: string
  assignees: Array<{ name: string; avatar: string }>
  priority: 'low' | 'medium' | 'high'
  tags: string[]
  dueDate: string
  comments: number
}) => {
  const priorityColors = {
    low: '#16a34a',
    medium: '#ea580c',
    high: '#dc2626',
  }

  return (
    <Box
      pad={4}
      radius={2}
      shadow={1}
      style={{
        background: 'white',
        cursor: 'move',
        transition: 'all var(--st-duration-normal) var(--st-easing-out)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(2deg)'
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'rotate(0deg)'
        e.currentTarget.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      }}
    >
      <Column gap={3}>
        <Row gap={2} align="center" justify="space-between">
          <Text size={3} weight="semibold">
            {title}
          </Text>
          <Box
            pad={1}
            radius={1}
            style={{
              background: priorityColors[priority],
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {priority.toUpperCase()}
          </Box>
        </Row>

        <Text size={1} tone="muted">
          {description}
        </Text>

        <Row gap={1} style={{ flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Box
              key={tag}
              pad={1}
              radius={1}
              style={{
                background: '#f3f4f6',
                color: '#6b7280',
                fontSize: '0.75rem',
              }}
            >
              {tag}
            </Box>
          ))}
        </Row>

        <Row gap={3} align="center" justify="space-between">
          <Row gap={1} align="center">
            {assignees.map((assignee, i) => (
              <Box
                key={i}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: assignee.avatar,
                  marginLeft: i > 0 ? '-8px' : '0',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {assignee.name[0]}
              </Box>
            ))}
          </Row>

          <Row gap={3} align="center">
            <Row gap={1} align="center">
              <Text size={1}>💬</Text>
              <Text size={1} tone="muted">
                {comments}
              </Text>
            </Row>
            <Row gap={1} align="center">
              <Text size={1}>📅</Text>
              <Text size={1} tone="muted">
                {dueDate}
              </Text>
            </Row>
          </Row>
        </Row>
      </Column>
    </Box>
  )
}

const BoardColumn = ({
  title,
  count,
  color,
  children,
}: {
  title: string
  count: number
  color: string
  children: React.ReactNode
}) => (
  <Column
    gap={3}
    style={{
      flex: '1 1 300px',
      minWidth: '300px',
    }}
  >
    <Row gap={2} align="center">
      <Box
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: color,
        }}
      />
      <Text size={3} weight="semibold">
        {title}
      </Text>
      <Box
        pad={1}
        radius={1}
        style={{
          background: '#f3f4f6',
          color: '#6b7280',
          fontSize: '0.75rem',
          fontWeight: 600,
          minWidth: '24px',
          textAlign: 'center',
        }}
      >
        {count}
      </Box>
    </Row>
    <Column gap={3}>{children}</Column>
  </Column>
)

const ProjectStats = ({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: string
}) => (
  <Box
    pad={4}
    radius={2}
    shadow={1}
    style={{
      background: 'white',
      flex: '1 1 200px',
    }}
  >
    <Column gap={2}>
      <Text size={1} tone="muted">
        {label}
      </Text>
      <Row gap={2} align="center">
        <Text size={3}>{icon}</Text>
        <Text size={5} weight="bold">
          {value}
        </Text>
      </Row>
    </Column>
  </Box>
)

export const CompleteKanbanBoard: Story = {
  render: () => {
    const [view, setView] = useState<'board' | 'list'>('board')

    return (
      <Box style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Header */}
        <Box
          pad={5}
          style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <Column gap={4}>
            <Row gap={4} align="center" justify="space-between">
              <Column gap={2}>
                <Text size={5} weight="bold">
                  Product Redesign Q1 2024
                </Text>
                <Text size={2} tone="muted">
                  Design system and component library overhaul
                </Text>
              </Column>
              <Row gap={2}>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e5e7eb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f3f4f6'
                  }}
                  onClick={() => setView('board')}
                >
                  <Text size={2} weight={view === 'board' ? 'semibold' : 'normal'}>
                    📊 Board
                  </Text>
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#f3f4f6',
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e5e7eb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f3f4f6'
                  }}
                  onClick={() => setView('list')}
                >
                  <Text size={2} weight={view === 'list' ? 'semibold' : 'normal'}>
                    📝 List
                  </Text>
                </Box>
                <Box
                  pad={3}
                  radius={2}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563eb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#3b82f6'
                  }}
                >
                  <Text size={2} weight="semibold">
                    + New Task
                  </Text>
                </Box>
              </Row>
            </Row>

            {/* Project Stats */}
            <Row gap={3} style={{ flexWrap: 'wrap' }}>
              <ProjectStats label="Total Tasks" value="24" icon="📋" />
              <ProjectStats label="In Progress" value="8" icon="⚡" />
              <ProjectStats label="Completed" value="12" icon="✅" />
              <ProjectStats label="Team Members" value="6" icon="👥" />
            </Row>

            {/* Filters */}
            <Row gap={2} style={{ flexWrap: 'wrap' }}>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: '#f3f4f6',
                  cursor: 'pointer',
                }}
              >
                <Text size={1}>All Tasks</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                }}
              >
                <Text size={1}>My Tasks</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                }}
              >
                <Text size={1}>High Priority</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                }}
              >
                <Text size={1}>Due This Week</Text>
              </Box>
            </Row>
          </Column>
        </Box>

        {/* Kanban Board */}
        <Box pad={5}>
          <Row
            gap={4}
            style={{
              overflowX: 'auto',
              alignItems: 'flex-start',
            }}
          >
            <BoardColumn title="To Do" count={6} color="#6b7280">
              <TaskCard
                title="Create design tokens documentation"
                description="Document all color, spacing, and typography tokens"
                assignees={[
                  { name: 'Alice', avatar: '#3b82f6' },
                  { name: 'Bob', avatar: '#8b5cf6' },
                ]}
                priority="high"
                tags={['documentation', 'design']}
                dueDate="Mar 15"
                comments={3}
              />
              <TaskCard
                title="Design mobile navigation"
                description="Create responsive navigation patterns for mobile"
                assignees={[{ name: 'Carol', avatar: '#ec4899' }]}
                priority="medium"
                tags={['design', 'mobile']}
                dueDate="Mar 18"
                comments={5}
              />
              <TaskCard
                title="Research accessibility tools"
                description="Evaluate accessibility testing tools and frameworks"
                assignees={[{ name: 'David', avatar: '#10b981' }]}
                priority="low"
                tags={['research', 'a11y']}
                dueDate="Mar 20"
                comments={1}
              />
            </BoardColumn>

            <BoardColumn title="In Progress" count={8} color="#ea580c">
              <TaskCard
                title="Implement dark mode"
                description="Add dark theme support across all components"
                assignees={[
                  { name: 'Alice', avatar: '#3b82f6' },
                  { name: 'Eve', avatar: '#f59e0b' },
                ]}
                priority="high"
                tags={['development', 'theme']}
                dueDate="Mar 12"
                comments={12}
              />
              <TaskCard
                title="Build component gallery"
                description="Create interactive showcase for all primitives"
                assignees={[{ name: 'Bob', avatar: '#8b5cf6' }]}
                priority="medium"
                tags={['development', 'storybook']}
                dueDate="Mar 14"
                comments={8}
              />
              <TaskCard
                title="Write integration guides"
                description="Documentation for Next.js, Remix, and Vite"
                assignees={[{ name: 'Carol', avatar: '#ec4899' }]}
                priority="high"
                tags={['documentation', 'guides']}
                dueDate="Mar 16"
                comments={4}
              />
            </BoardColumn>

            <BoardColumn title="Review" count={4} color="#8b5cf6">
              <TaskCard
                title="Update type definitions"
                description="Add TypeScript types for all new components"
                assignees={[{ name: 'David', avatar: '#10b981' }]}
                priority="medium"
                tags={['typescript', 'types']}
                dueDate="Mar 10"
                comments={6}
              />
              <TaskCard
                title="Performance optimization"
                description="Reduce bundle size and improve load times"
                assignees={[
                  { name: 'Eve', avatar: '#f59e0b' },
                  { name: 'Alice', avatar: '#3b82f6' },
                ]}
                priority="high"
                tags={['performance', 'optimization']}
                dueDate="Mar 11"
                comments={9}
              />
            </BoardColumn>

            <BoardColumn title="Done" count={12} color="#16a34a">
              <TaskCard
                title="Setup CI/CD pipeline"
                description="Configure automated testing and deployment"
                assignees={[{ name: 'Bob', avatar: '#8b5cf6' }]}
                priority="high"
                tags={['devops', 'ci/cd']}
                dueDate="Mar 5"
                comments={15}
              />
              <TaskCard
                title="Create logo and branding"
                description="Design brand identity and visual assets"
                assignees={[{ name: 'Carol', avatar: '#ec4899' }]}
                priority="medium"
                tags={['design', 'branding']}
                dueDate="Mar 8"
                comments={7}
              />
              <TaskCard
                title="Initial token system"
                description="Define base color, space, and typography scales"
                assignees={[
                  { name: 'Alice', avatar: '#3b82f6' },
                  { name: 'David', avatar: '#10b981' },
                ]}
                priority="high"
                tags={['design', 'tokens']}
                dueDate="Mar 3"
                comments={22}
              />
            </BoardColumn>
          </Row>
        </Box>
      </Box>
    )
  },
}

export const TaskListView: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'assignee'>('priority')

    const tasks = [
      {
        title: 'Implement dark mode',
        description: 'Add dark theme support across all components',
        assignee: 'Alice Johnson',
        priority: 'high' as const,
        status: 'In Progress',
        dueDate: 'Mar 12',
        progress: 65,
      },
      {
        title: 'Create design tokens documentation',
        description: 'Document all color, spacing, and typography tokens',
        assignee: 'Bob Smith',
        priority: 'high' as const,
        status: 'To Do',
        dueDate: 'Mar 15',
        progress: 0,
      },
      {
        title: 'Update type definitions',
        description: 'Add TypeScript types for all new components',
        assignee: 'David Chen',
        priority: 'medium' as const,
        status: 'Review',
        dueDate: 'Mar 10',
        progress: 85,
      },
      {
        title: 'Design mobile navigation',
        description: 'Create responsive navigation patterns for mobile',
        assignee: 'Carol White',
        priority: 'medium' as const,
        status: 'To Do',
        dueDate: 'Mar 18',
        progress: 0,
      },
      {
        title: 'Research accessibility tools',
        description: 'Evaluate accessibility testing tools and frameworks',
        assignee: 'David Chen',
        priority: 'low' as const,
        status: 'To Do',
        dueDate: 'Mar 20',
        progress: 0,
      },
      {
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        assignee: 'Bob Smith',
        priority: 'high' as const,
        status: 'Done',
        dueDate: 'Mar 5',
        progress: 100,
      },
    ]

    const priorityColors = {
      low: '#16a34a',
      medium: '#ea580c',
      high: '#dc2626',
    }

    const statusColors = {
      'To Do': '#6b7280',
      'In Progress': '#ea580c',
      Review: '#8b5cf6',
      Done: '#16a34a',
    }

    return (
      <Box style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Header */}
        <Box
          pad={5}
          style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <Column gap={4}>
            <Row gap={4} align="center" justify="space-between">
              <Column gap={2}>
                <Text size={5} weight="bold">
                  Task List
                </Text>
                <Text size={2} tone="muted">
                  All tasks across projects
                </Text>
              </Column>
              <Box
                pad={3}
                radius={2}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2563eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3b82f6'
                }}
              >
                <Text size={2} weight="semibold">
                  + New Task
                </Text>
              </Box>
            </Row>

            {/* Sort Controls */}
            <Row gap={2} align="center">
              <Text size={2} tone="muted">
                Sort by:
              </Text>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: sortBy === 'priority' ? '#3b82f6' : '#f3f4f6',
                  color: sortBy === 'priority' ? 'white' : 'inherit',
                  cursor: 'pointer',
                }}
                onClick={() => setSortBy('priority')}
              >
                <Text size={1}>Priority</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: sortBy === 'dueDate' ? '#3b82f6' : '#f3f4f6',
                  color: sortBy === 'dueDate' ? 'white' : 'inherit',
                  cursor: 'pointer',
                }}
                onClick={() => setSortBy('dueDate')}
              >
                <Text size={1}>Due Date</Text>
              </Box>
              <Box
                pad={2}
                radius={2}
                style={{
                  background: sortBy === 'assignee' ? '#3b82f6' : '#f3f4f6',
                  color: sortBy === 'assignee' ? 'white' : 'inherit',
                  cursor: 'pointer',
                }}
                onClick={() => setSortBy('assignee')}
              >
                <Text size={1}>Assignee</Text>
              </Box>
            </Row>
          </Column>
        </Box>

        {/* Task List */}
        <Box pad={5}>
          <Column gap={2}>
            {/* Header Row */}
            <Row
              gap={4}
              align="center"
              style={{
                padding: 'var(--st-space-3)',
                borderBottom: '2px solid #e5e7eb',
              }}
            >
              <Box style={{ flex: '2 1 0' }}>
                <Text size={1} weight="semibold" tone="muted">
                  TASK
                </Text>
              </Box>
              <Box style={{ flex: '1 1 0' }}>
                <Text size={1} weight="semibold" tone="muted">
                  ASSIGNEE
                </Text>
              </Box>
              <Box style={{ width: '100px' }}>
                <Text size={1} weight="semibold" tone="muted">
                  PRIORITY
                </Text>
              </Box>
              <Box style={{ width: '120px' }}>
                <Text size={1} weight="semibold" tone="muted">
                  STATUS
                </Text>
              </Box>
              <Box style={{ width: '100px' }}>
                <Text size={1} weight="semibold" tone="muted">
                  DUE DATE
                </Text>
              </Box>
              <Box style={{ width: '120px' }}>
                <Text size={1} weight="semibold" tone="muted">
                  PROGRESS
                </Text>
              </Box>
            </Row>

            {/* Task Rows */}
            {tasks.map((task, i) => (
              <Box
                key={i}
                pad={3}
                radius={2}
                style={{
                  background: 'white',
                  cursor: 'pointer',
                  transition: 'all var(--st-duration-fast) var(--st-easing-out)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <Row gap={4} align="center">
                  <Box style={{ flex: '2 1 0' }}>
                    <Column gap={1}>
                      <Text size={2} weight="semibold">
                        {task.title}
                      </Text>
                      <Text size={1} tone="muted">
                        {task.description}
                      </Text>
                    </Column>
                  </Box>
                  <Box style={{ flex: '1 1 0' }}>
                    <Text size={2}>{task.assignee}</Text>
                  </Box>
                  <Box style={{ width: '100px' }}>
                    <Box
                      pad={1}
                      radius={1}
                      style={{
                        background: priorityColors[task.priority],
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {task.priority.toUpperCase()}
                    </Box>
                  </Box>
                  <Box style={{ width: '120px' }}>
                    <Box
                      pad={1}
                      radius={1}
                      style={{
                        background: statusColors[task.status as keyof typeof statusColors],
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {task.status}
                    </Box>
                  </Box>
                  <Box style={{ width: '100px' }}>
                    <Text size={2} tone="muted">
                      {task.dueDate}
                    </Text>
                  </Box>
                  <Box style={{ width: '120px' }}>
                    <Column gap={1}>
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
                            width: `${task.progress}%`,
                            background: '#3b82f6',
                            transition: 'width var(--st-duration-normal) var(--st-easing-out)',
                          }}
                        />
                      </Box>
                      <Text size={0} tone="muted">
                        {task.progress}%
                      </Text>
                    </Column>
                  </Box>
                </Row>
              </Box>
            ))}
          </Column>
        </Box>
      </Box>
    )
  },
}
