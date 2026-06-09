import { MetricCard, MetricRow } from '@/components/ui/metric-card'
import { ScoreMeter } from '@/components/ui/score-meter'
import { SplitPane } from '@/components/ui/split-pane'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card'

export function MetricsStory() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Metrics &amp; Layout</h2>
        <p className="text-base text-subtle-foreground mt-1">
          MetricCard, MetricRow, ScoreMeter, and SplitPane.
        </p>
      </div>

      <Section label="Metric row — the ruled instrument strip">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          Metrics are open, not boxed (Hard Rule #3). MetricRow rules the strip above and below; the mono values read as one instrument cluster. Value color is reserved for genuinely semantic readings.
        </p>
        <MetricRow>
          <MetricCard label="Total documents" value="1,284" trend="up" description="+12% from last month" />
          <MetricCard label="Completion rate" value="94%" tone="success" trend="up" description="6 of 64 pending" />
          <MetricCard label="Avg. sign time" value="2.4 days" trend="down" description="Was 3.1 days" />
          <MetricCard label="Rejections" value="7" tone="danger" trend="flat" description="Same as last month" />
        </MetricRow>
      </Section>

      <Section label="Open metrics — no strip, no trend">
        <div className="flex items-start gap-12">
          <MetricCard label="Active invitees" value="342" />
          <MetricCard label="Credits remaining" value="2,480" description="of 10,000 total" />
          <MetricCard label="Stamp papers" value="18" description="Maharashtra desk" />
        </div>
      </Section>

      <Section label="Score meters — sizes and tones">
        <div className="flex items-end gap-8">
          <ScoreMeter value={92} label="Accuracy" tone="success" size="lg" />
          <ScoreMeter value={74} label="Coverage" tone="warning" size="md" />
          <ScoreMeter value={31} label="Recall" tone="danger" size="md" />
          <ScoreMeter value={88} label="Precision" tone="primary" size="sm" />
          <ScoreMeter value={100} label="Passed" tone="success" size="sm" />
        </div>
      </Section>

      <Section label="Split pane — resizable layout">
        <div className="h-[320px] border border-border rounded-md overflow-hidden">
          <SplitPane
            defaultWidth={300}
            minWidth={200}
            maxWidth={500}
            left={
              <div className="p-4 h-full bg-background">
                <Card>
                  <CardHeader><CardTitle>Left panel</CardTitle></CardHeader>
                  <CardBody>
                    <p className="text-base text-subtle-foreground">
                      Drag the divider to resize. This could be a chat thread, a file tree, or any sidebar content.
                    </p>
                  </CardBody>
                </Card>
              </div>
            }
            right={
              <div className="p-4 h-full bg-background">
                <Card>
                  <CardHeader><CardTitle>Right panel</CardTitle></CardHeader>
                  <CardBody>
                    <p className="text-base text-subtle-foreground">
                      Main content area. Expands and contracts as the divider moves. The layout stays stable because both panels handle overflow independently.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <MetricCard label="Latency" value="420ms" tone="success" />
                      <MetricCard label="Tokens" value="1,247" />
                    </div>
                  </CardBody>
                </Card>
              </div>
            }
          />
        </div>
      </Section>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">{label}</div>
      {children}
    </div>
  )
}
