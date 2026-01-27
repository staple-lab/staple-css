import { Container, Column, Card, Text, Row, Box } from "@staple-css/primitives/full";

export function SettingsPage() {
  return (
    <Container size="md">
      <Column gap={6}>
        <Column gap={2}>
          <Text as="h1" size={5} weight="bold">
            Settings
          </Text>
          <Text tone="muted">
            Manage your account settings and preferences.
          </Text>
        </Column>

        {/* Profile Section */}
        <Card pad={6} radius={3}>
          <Column gap={5}>
            <Column gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Profile
              </Text>
              <Text size={1} tone="muted">
                Your public profile information.
              </Text>
            </Column>

            <Column gap={4}>
              <Column gap={2}>
                <Text as="label" size={1} weight="medium">
                  Display Name
                </Text>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  defaultValue="Jane Smith"
                />
              </Column>

              <Column gap={2}>
                <Text as="label" size={1} weight="medium">
                  Email Address
                </Text>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  defaultValue="jane@example.com"
                />
              </Column>

              <Column gap={2}>
                <Text as="label" size={1} weight="medium">
                  Bio
                </Text>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell us about yourself"
                  defaultValue="Product designer based in San Francisco."
                />
              </Column>
            </Column>
          </Column>
        </Card>

        {/* Preferences Section */}
        <Card pad={6} radius={3}>
          <Column gap={5}>
            <Column gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Preferences
              </Text>
              <Text size={1} tone="muted">
                Customize your experience.
              </Text>
            </Column>

            <Column gap={4}>
              <Column gap={2}>
                <Text as="label" size={1} weight="medium">
                  Language
                </Text>
                <select className="form-input form-select" defaultValue="en">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </Column>

              <Column gap={2}>
                <Text as="label" size={1} weight="medium">
                  Timezone
                </Text>
                <select className="form-input form-select" defaultValue="pst">
                  <option value="pst">Pacific Time (PST)</option>
                  <option value="mst">Mountain Time (MST)</option>
                  <option value="cst">Central Time (CST)</option>
                  <option value="est">Eastern Time (EST)</option>
                </select>
              </Column>
            </Column>
          </Column>
        </Card>

        {/* Notifications Section */}
        <Card pad={6} radius={3}>
          <Column gap={5}>
            <Column gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Notifications
              </Text>
              <Text size={1} tone="muted">
                Choose what updates you receive.
              </Text>
            </Column>

            <Column gap={4}>
              <Row gap={3} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="medium">Email notifications</Text>
                  <Text size={1} tone="muted">
                    Receive updates via email
                  </Text>
                </Column>
                <input type="checkbox" className="form-checkbox" defaultChecked />
              </Row>

              <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />

              <Row gap={3} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="medium">Push notifications</Text>
                  <Text size={1} tone="muted">
                    Receive push notifications
                  </Text>
                </Column>
                <input type="checkbox" className="form-checkbox" defaultChecked />
              </Row>

              <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />

              <Row gap={3} align="center" justify="between">
                <Column gap={1}>
                  <Text weight="medium">Weekly digest</Text>
                  <Text size={1} tone="muted">
                    Weekly summary of activity
                  </Text>
                </Column>
                <input type="checkbox" className="form-checkbox" />
              </Row>
            </Column>
          </Column>
        </Card>

        {/* Danger Zone */}
        <Card pad={6} radius={3} tone="danger">
          <Column gap={4}>
            <Column gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Danger Zone
              </Text>
              <Text size={1} tone="muted">
                Irreversible actions.
              </Text>
            </Column>

            <Row gap={3} align="center" justify="between">
              <Column gap={1}>
                <Text weight="medium">Delete account</Text>
                <Text size={1} tone="muted">
                  Permanently delete your account and all data.
                </Text>
              </Column>
              <button className="btn btn-secondary" style={{ borderColor: "var(--st-color-danger)", color: "var(--st-color-danger)" }}>
                Delete Account
              </button>
            </Row>
          </Column>
        </Card>

        {/* Actions */}
        <Row gap={3} justify="end">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save Changes</button>
        </Row>
      </Column>
    </Container>
  );
}
