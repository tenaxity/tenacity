import { Badge } from '@/components/ui/badge'

export function BadgesStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Badges</h2>
        <p className="text-sm text-subtle-foreground mt-1">
          Three variants × five tones. Solid is the default — filled gravity over pastel calm.
        </p>
      </div>

      <Variant label="Solid · default · committed" variant="solid" />
      <Variant label="Soft · ambient · settled"     variant="soft" />
      <Variant label="Outline · structural · categorical" variant="outline" />
    </div>
  )
}

function Variant({ label, variant }: { label: string; variant: 'solid' | 'soft' | 'outline' }) {
  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wider text-subtle-foreground font-semibold">{label}</div>
      <div className="flex flex-wrap gap-2">
        <Badge tone="neutral" variant={variant}>Neutral</Badge>
        <Badge tone="primary" variant={variant}>Primary</Badge>
        <Badge tone="success" variant={variant}>Success</Badge>
        <Badge tone="warning" variant={variant}>Warning</Badge>
        <Badge tone="danger"  variant={variant}>Danger</Badge>
      </div>
    </div>
  )
}
