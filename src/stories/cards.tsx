import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '@/components/ui/card'

export function CardsStory() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Cards</h2>
        <p className="text-sm text-subtle-foreground mt-1">Container surface. 1px border, dead flat — no shadow. Use only when a zone genuinely needs containment; default to open content.</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Active workflow</CardTitle>
            <CardDescription>Series A SAFE — Acme Inc. — eight invitees, two signed.</CardDescription>
          </CardHeader>
          <CardBody>
            <p className="text-base">Document body content. Actions live below.</p>
            <div className="flex items-center gap-2 mt-4">
              <Button>Resend</Button>
              <Button variant="secondary">Extend deadline</Button>
              <Button variant="ghost">Cancel</Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Empty state</CardTitle>
            <CardDescription>What it looks like with no actions.</CardDescription>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-muted-foreground">Just text in the body. Notice the spacing.</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-base">Card without a header. Just a body.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
