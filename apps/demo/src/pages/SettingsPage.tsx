import { Container, Stack, Card, Text, Inline, Box } from "@staple-css/primitives";

export function SettingsPage() {
  return (
    <Container size="md">
      <Stack gap={6}>
        <Stack gap={2}>
          <Text as="h1" size={5} weight="bold">
            Settings
          </Text>
          <Text tone="muted">
            Manage your account settings and preferences.
          </Text>
        </Stack>

        {/* Profile Section */}
        <Card pad={6} radius={3}>
          <Stack gap={5}>
            <Stack gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Profile
              </Text>
              <Text size={1} tone="muted">
                Your public profile information.
              </Text>
            </Stack>

            <Stack gap={4}>
              <Stack gap={2}>
                <Text as="label" size={1} weight="medium">
                  Display Name
                </Text>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your name"
                  defaultValue="Jane Smith"
                />
              </Stack>

              <Stack gap={2}>
                <Text as="label" size={1} weight="medium">
                  Email Address
                </Text>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  defaultValue="jane@example.com"
                />
              </Stack>

              <Stack gap={2}>
                <Text as="label" size={1} weight="medium">
                  Bio
                </Text>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Tell us about yourself"
                  defaultValue="Product designer based in San Francisco."
                />
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Preferences Section */}
        <Card pad={6} radius={3}>
          <Stack gap={5}>
            <Stack gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Preferences
              </Text>
              <Text size={1} tone="muted">
                Customize your experience.
              </Text>
            </Stack>

            <Stack gap={4}>
              <Stack gap={2}>
                <Text as="label" size={1} weight="medium">
                  Language
                </Text>
                <select className="form-input form-select" defaultValue="en">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </Stack>

              <Stack gap={2}>
                <Text as="label" size={1} weight="medium">
                  Timezone
                </Text>
                <select className="form-input form-select" defaultValue="pst">
                  <option value="pst">Pacific Time (PST)</option>
                  <option value="mst">Mountain Time (MST)</option>
                  <option value="cst">Central Time (CST)</option>
                  <option value="est">Eastern Time (EST)</option>
                </select>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Notifications Section */}
        <Card pad={6} radius={3}>
          <Stack gap={5}>
            <Stack gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Notifications
              </Text>
              <Text size={1} tone="muted">
                Choose what updates you receive.
              </Text>
            </Stack>

            <Stack gap={4}>
              <Inline gap={3} align="center" justify="between">
                <Stack gap={1}>
                  <Text weight="medium">Email notifications</Text>
                  <Text size={1} tone="muted">
                    Receive updates via email
                  </Text>
                </Stack>
                <input type="checkbox" className="form-checkbox" defaultChecked />
              </Inline>

              <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />

              <Inline gap={3} align="center" justify="between">
                <Stack gap={1}>
                  <Text weight="medium">Push notifications</Text>
                  <Text size={1} tone="muted">
                    Receive push notifications
                  </Text>
                </Stack>
                <input type="checkbox" className="form-checkbox" defaultChecked />
              </Inline>

              <Box style={{ height: "1px", backgroundColor: "var(--st-color-border)" }} />

              <Inline gap={3} align="center" justify="between">
                <Stack gap={1}>
                  <Text weight="medium">Weekly digest</Text>
                  <Text size={1} tone="muted">
                    Weekly summary of activity
                  </Text>
                </Stack>
                <input type="checkbox" className="form-checkbox" />
              </Inline>
            </Stack>
          </Stack>
        </Card>

        {/* Danger Zone */}
        <Card pad={6} radius={3} tone="danger">
          <Stack gap={4}>
            <Stack gap={1}>
              <Text as="h2" size={3} weight="semibold">
                Danger Zone
              </Text>
              <Text size={1} tone="muted">
                Irreversible actions.
              </Text>
            </Stack>

            <Inline gap={3} align="center" justify="between">
              <Stack gap={1}>
                <Text weight="medium">Delete account</Text>
                <Text size={1} tone="muted">
                  Permanently delete your account and all data.
                </Text>
              </Stack>
              <button className="btn btn-secondary" style={{ borderColor: "var(--st-color-danger)", color: "var(--st-color-danger)" }}>
                Delete Account
              </button>
            </Inline>
          </Stack>
        </Card>

        {/* Actions */}
        <Inline gap={3} justify="end">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save Changes</button>
        </Inline>
      </Stack>
    </Container>
  );
}
