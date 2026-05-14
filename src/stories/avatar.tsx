import { Avatar } from '@/components/ui/avatar'

export function AvatarStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Avatar</h2>
        <p className="text-base text-subtle-foreground mt-1">Circular by design (one of the few shape exceptions). Initials fallback when image is missing.</p>
      </div>

      <Section label="Sizes (24 / 32 / 40 / 48 px)">
        <Row>
          <Avatar size="sm" initials="RG" />
          <Avatar size="md" initials="RG" />
          <Avatar size="lg" initials="RG" />
          <Avatar size="xl" initials="RG" />
        </Row>
      </Section>

      <Section label="Initials only — first + last initial">
        <Row>
          <Avatar initials="RG" />
          <Avatar initials="PS" />
          <Avatar initials="KI" />
          <Avatar initials="AN" />
          <Avatar initials="DR" />
        </Row>
      </Section>

      <Section label="With image (fallback to initials if image fails)">
        <Row>
          <Avatar src="https://i.pravatar.cc/100?img=12" initials="RG" alt="Ritik" size="lg" />
          <Avatar src="https://i.pravatar.cc/100?img=5"  initials="PS" alt="Priya" size="lg" />
          <Avatar src="https://i.pravatar.cc/100?img=33" initials="KI" alt="Karthik" size="lg" />
          <Avatar src="broken-url"                        initials="AN" alt="Anita (image will fail)" size="lg" />
        </Row>
        <p className="text-xs text-muted-foreground mt-2">The last one has a broken URL — falls back to initials automatically.</p>
      </Section>

      <Section label="With status dot">
        <Row>
          <Avatar size="lg" initials="RG" status="online" />
          <Avatar size="lg" initials="PS" status="away" />
          <Avatar size="lg" initials="KI" status="offline" />
        </Row>
      </Section>

      <Section label="In a listing-row context">
        <p className="text-xs text-subtle-foreground mb-2">How avatars typically appear next to invitee names in document rows.</p>
        <div className="space-y-2">
          {[
            { initials: 'PS', name: 'Priya Shankar', meta: 'Signed · 2 days ago' },
            { initials: 'KI', name: 'Karthik Iyer',  meta: 'Pending invite' },
            { initials: 'AN', name: 'Anita Narayanan', meta: 'Rejected · yesterday' },
          ].map(p => (
            <div key={p.initials} className="flex items-center gap-3 py-2">
              <Avatar size="md" initials={p.initials} />
              <div>
                <div className="text-base font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.meta}</div>
              </div>
            </div>
          ))}
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

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-end gap-3">{children}</div>
}
