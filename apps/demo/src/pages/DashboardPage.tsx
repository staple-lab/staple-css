import { Container, Column, Card, Text, Row, Grid, Box } from "@staple-css/primitives/full";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

function StatCard({ label, value, change, positive }: StatCardProps) {
  return (
    <Card pad={5} radius={3}>
      <Column gap={2}>
        <Text size={1} tone="muted" weight="medium">
          {label}
        </Text>
        <Row gap={2} align="baseline">
          <span className="stat-value">{value}</span>
          <span className={`stat-change ${positive ? "positive" : "negative"}`}>
            {positive ? "+" : ""}{change}
          </span>
        </Row>
      </Column>
    </Card>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

function ActivityItem({ title, description, time }: ActivityItemProps) {
  return (
    <Row gap={3} align="start">
      <Box pad={1}>
        <div className="activity-dot" />
      </Box>
      <Column gap={1} style={{ flex: 1 }}>
        <Row justify="between" align="start">
          <Text weight="medium">{title}</Text>
          <Text size={0} tone="muted">{time}</Text>
        </Row>
        <Text size={1} tone="muted">{description}</Text>
      </Column>
    </Row>
  );
}

export function DashboardPage() {
  return (
    <Container size="xl">
      <Column gap={6}>
        <Column gap={2}>
          <Text as="h1" size={5} weight="bold">
            Dashboard
          </Text>
          <Text tone="muted">
            Welcome back! Here's an overview of your account.
          </Text>
        </Column>

        {/* Stats Grid */}
        <Grid cols={4} gap={4}>
          <StatCard
            label="Total Revenue"
            value="$45,231"
            change="12%"
            positive={true}
          />
          <StatCard
            label="Active Users"
            value="2,345"
            change="8%"
            positive={true}
          />
          <StatCard
            label="Conversion Rate"
            value="3.2%"
            change="0.4%"
            positive={false}
          />
          <StatCard
            label="Avg. Session"
            value="4m 32s"
            change="18%"
            positive={true}
          />
        </Grid>

        {/* Main Content */}
        <Grid cols={3} gap={6}>
          {/* Recent Activity */}
          <Box style={{ gridColumn: "span 2" }}>
            <Card pad={6} radius={3}>
              <Column gap={5}>
                <Row justify="between" align="center">
                  <Text as="h2" size={3} weight="semibold">
                    Recent Activity
                  </Text>
                  <button className="btn btn-secondary">View All</button>
                </Row>

                <Column gap={4}>
                  <ActivityItem
                    title="New user registration"
                    description="john@example.com signed up for a free trial"
                    time="2 min ago"
                  />
                  <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />
                  <ActivityItem
                    title="Payment received"
                    description="$299 from Acme Corp for Pro plan"
                    time="1 hour ago"
                  />
                  <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />
                  <ActivityItem
                    title="Support ticket resolved"
                    description="Ticket #1234 marked as resolved"
                    time="3 hours ago"
                  />
                  <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />
                  <ActivityItem
                    title="Feature request"
                    description="New feature suggestion from user feedback"
                    time="5 hours ago"
                  />
                  <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />
                  <ActivityItem
                    title="System update"
                    description="Deployed version 2.4.1 to production"
                    time="Yesterday"
                  />
                </Column>
              </Column>
            </Card>
          </Box>

          {/* Sidebar */}
          <Column gap={4}>
            {/* Quick Actions */}
            <Card pad={5} radius={3}>
              <Column gap={4}>
                <Text as="h3" size={2} weight="semibold">
                  Quick Actions
                </Text>
                <Column gap={2}>
                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Create New Project
                  </button>
                  <button className="btn btn-secondary" style={{ width: "100%" }}>
                    Invite Team Member
                  </button>
                  <button className="btn btn-secondary" style={{ width: "100%" }}>
                    View Reports
                  </button>
                </Column>
              </Column>
            </Card>

            {/* Alerts */}
            <Card pad={5} radius={3} tone="warn">
              <Column gap={2}>
                <Text weight="semibold">Action Required</Text>
                <Text size={1}>
                  Your subscription will expire in 5 days. Please update your payment method.
                </Text>
                <Box pad={2}>
                  <button className="btn btn-secondary" style={{ width: "100%" }}>
                    Update Payment
                  </button>
                </Box>
              </Column>
            </Card>

            {/* Team */}
            <Card pad={5} radius={3}>
              <Column gap={4}>
                <Row justify="between" align="center">
                  <Text as="h3" size={2} weight="semibold">
                    Team
                  </Text>
                  <Text size={0} tone="primary" weight="medium">
                    5 members
                  </Text>
                </Row>
                <Column gap={3}>
                  {["Alice Johnson", "Bob Smith", "Carol White", "David Brown", "Eve Wilson"].map(
                    (name) => (
                      <Row key={name} gap={3} align="center">
                        <Box
                          radius={4}
                          style={{
                            width: "32px",
                            height: "32px",
                            backgroundColor: "var(--st-color-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text size={0} className="avatar-text">
                            {name.split(" ").map((n) => n[0]).join("")}
                          </Text>
                        </Box>
                        <Text size={1}>{name}</Text>
                      </Row>
                    )
                  )}
                </Column>
              </Column>
            </Card>
          </Column>
        </Grid>

        {/* Projects */}
        <Column gap={4}>
          <Row justify="between" align="center">
            <Text as="h2" size={4} weight="semibold">
              Projects
            </Text>
            <button className="btn btn-primary">New Project</button>
          </Row>

          <Grid cols={3} gap={4}>
            {[
              { name: "Website Redesign", status: "In Progress", progress: 65 },
              { name: "Mobile App", status: "Planning", progress: 20 },
              { name: "API Integration", status: "Review", progress: 90 },
              { name: "Documentation", status: "In Progress", progress: 45 },
              { name: "Analytics Dashboard", status: "Completed", progress: 100 },
              { name: "User Research", status: "Planning", progress: 10 },
            ].map((project) => (
              <Card key={project.name} pad={5} radius={3}>
                <Column gap={3}>
                  <Row justify="between" align="start">
                    <Text weight="semibold">{project.name}</Text>
                    <Text
                      size={0}
                      tone={
                        project.status === "Completed"
                          ? "success"
                          : project.status === "Review"
                          ? "warn"
                          : "muted"
                      }
                      weight="medium"
                    >
                      {project.status}
                    </Text>
                  </Row>
                  <Box
                    radius={4}
                    style={{
                      height: "4px",
                      backgroundColor: "var(--st-color-border)",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      style={{
                        height: "100%",
                        width: `${project.progress}%`,
                        backgroundColor:
                          project.progress === 100
                            ? "var(--st-color-success)"
                            : "var(--st-color-primary)",
                        transition: "width var(--st-duration-normal) var(--st-easing-default)",
                      }}
                    />
                  </Box>
                  <Text size={0} tone="muted">
                    {project.progress}% complete
                  </Text>
                </Column>
              </Card>
            ))}
          </Grid>
        </Column>
      </Column>
    </Container>
  );
}
