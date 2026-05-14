import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardBody } from '@/components/ui/card'

export function SkeletonStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Skeleton</h2>
        <p className="text-base text-subtle-foreground mt-1">
          Content placeholder while data loads. Gentle pulse, no shimmer. Preserves layout to prevent reflow.
        </p>
      </div>

      <Section label="Basic shapes">
        <div className="space-y-2 max-w-md">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </Section>

      <Section label="Avatar + text (list row pattern)">
        <div className="space-y-3 max-w-md">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Card placeholder">
        <Card>
          <CardBody className="space-y-3">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-4/6" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </div>
          </CardBody>
        </Card>
      </Section>

      <Section label="Table placeholder">
        <div className="border border-border rounded-md divide-y divide-border">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1.5 max-w-xs">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-3 w-16 ml-3" />
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
