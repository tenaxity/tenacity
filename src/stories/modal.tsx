import { useState } from 'react'
import { Trash2, Send, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react'
import {
  Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose,
} from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import { FeaturedIcon } from '@/components/ui/featured-icon'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export function ModalStory() {
  const [submitting, setSubmitting] = useState(false)
  const [submittingOpen, setSubmittingOpen] = useState(false)

  const fakeSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmittingOpen(false)
    }, 2200)
  }

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Modal</h2>
        <p className="text-base text-subtle-foreground mt-1">
          Overlay dialog. Three sizes (sm / md / lg). Backdrop dims foreground; content is centered, sharp-cornered, with focus trap, ESC-to-close, and click-outside-to-close.
        </p>
      </div>

      <Section label="Confirm dialog (sm) — destructive action">
        <Modal>
          <ModalTrigger asChild>
            <Button variant="destructive"><Trash2 className="h-4 w-4" />Delete document</Button>
          </ModalTrigger>
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>Delete this document?</ModalTitle>
              <ModalDescription>
                This action is permanent. The document and its audit trail will be removed. This cannot be undone.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="ghost">Cancel</Button>
              </ModalClose>
              <ModalClose asChild>
                <Button variant="destructive">Delete</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Section>

      <Section label="With FeaturedIcon — semantic emphasis">
        <p className="text-xs text-subtle-foreground -mt-1 mb-2">
          For destructive / warning / success / info confirmations. Solid filled square at top of header signals semantic intent at a glance.
        </p>
        <div className="flex flex-wrap gap-2">
          <Modal>
            <ModalTrigger asChild>
              <Button variant="destructive">Delete with icon</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalHeader icon={<FeaturedIcon size="sm" tone="danger" icon={<Trash2 />} />}>
                <ModalTitle>Delete this document?</ModalTitle>
                <ModalDescription>
                  This action is permanent. The document and its audit trail will be removed. This cannot be undone.
                </ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <ModalClose asChild><Button variant="ghost">Cancel</Button></ModalClose>
                <ModalClose asChild><Button variant="destructive">Delete</Button></ModalClose>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary">Warning</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalHeader icon={<FeaturedIcon size="sm" tone="warning" icon={<AlertTriangle />} />}>
                <ModalTitle>Document expires in 3 days</ModalTitle>
                <ModalDescription>
                  Two invitees still need to sign. Extend the deadline by up to 14 days, or send a reminder.
                </ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <ModalClose asChild><Button variant="ghost">Dismiss</Button></ModalClose>
                <Button>Send reminder</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary">Success</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalHeader icon={<FeaturedIcon size="sm" tone="success" icon={<CheckCircle2 />} />}>
                <ModalTitle>Document signed</ModalTitle>
                <ModalDescription>
                  All eight invitees have completed signing. Series A SAFE — Acme Inc. is now legally executed.
                </ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <ModalClose asChild><Button variant="ghost">Close</Button></ModalClose>
                <Button>Download signed PDF</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary">Info / feature</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalHeader icon={<FeaturedIcon size="sm" tone="primary" icon={<Sparkles />} />}>
                <ModalTitle>Bulk signing now available</ModalTitle>
                <ModalDescription>
                  Send a single document to up to 50 invitees at once. They'll each receive an invitation and can sign in any order.
                </ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <ModalClose asChild><Button variant="ghost">Maybe later</Button></ModalClose>
                <Button>Try it</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </Section>

      <Section label="Form modal (md) — invite invitee">
        <Modal>
          <ModalTrigger asChild>
            <Button>Add invitee</Button>
          </ModalTrigger>
          <ModalContent size="md">
            <ModalHeader>
              <ModalTitle>Add invitee</ModalTitle>
              <ModalDescription>They'll receive an email with the document link and signing instructions.</ModalDescription>
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Full name</label>
                <Input placeholder="Karthik Iyer" autoFocus />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Email</label>
                <Input type="email" placeholder="karthik@company.com" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Role</label>
                <Select defaultValue="signer">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="signer">Signer</SelectItem>
                    <SelectItem value="approver">Approver</SelectItem>
                    <SelectItem value="cc">CC (informational)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="ghost">Cancel</Button>
              </ModalClose>
              <Button>Send invitation</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Section>

      <Section label="Submitting state — modal stays open with stamp loader">
        <p className="text-xs text-subtle-foreground mb-2">
          Click "Submit." Modal stays open showing the stamp loader for ~2s, then closes. Common pattern for actions that take real time.
        </p>
        <Modal open={submittingOpen} onOpenChange={setSubmittingOpen}>
          <ModalTrigger asChild>
            <Button><Send className="h-4 w-4" />Send for signing</Button>
          </ModalTrigger>
          <ModalContent size="sm">
            <ModalHeader>
              <ModalTitle>Send for signing?</ModalTitle>
              <ModalDescription>
                The document will be sent to all 8 invitees. They'll have 14 days to sign.
              </ModalDescription>
            </ModalHeader>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="ghost" disabled={submitting}>Cancel</Button>
              </ModalClose>
              <Button onClick={fakeSubmit} disabled={submitting}>
                {submitting ? <><Loader size="sm" tone="white" />Sending…</> : 'Send'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Section>

      <Section label="Large modal (lg) — for richer content">
        <Modal>
          <ModalTrigger asChild>
            <Button variant="secondary">Open document preview</Button>
          </ModalTrigger>
          <ModalContent size="lg">
            <ModalHeader>
              <ModalTitle>Series A SAFE — Acme Inc.</ModalTitle>
              <ModalDescription>Preview before sending to invitees.</ModalDescription>
            </ModalHeader>
            <ModalBody className="space-y-4">
              <p className="text-base">
                <strong>SIMPLE AGREEMENT FOR FUTURE EQUITY</strong> — This Simple Agreement for Future Equity ("SAFE") is made between Acme Inc. (the "Company") and the investor identified below. The Company acknowledges receipt of the Purchase Amount in exchange for the rights described herein.
              </p>
              <p className="text-base">
                <strong>1. Events</strong> — Upon a qualifying Equity Financing, the Investor shall receive the number of shares of Safe Preferred Stock as determined by the SAFE Price.
              </p>
              <p className="text-base">
                <strong>2. Termination</strong> — This SAFE will terminate upon either (i) the issuance of Safe Preferred Stock, (ii) payment of liquidity provisions, or (iii) dissolution.
              </p>
              <p className="text-base text-muted-foreground italic">— this is dummy text for demo —</p>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="ghost">Close</Button>
              </ModalClose>
              <Button variant="secondary">Download PDF</Button>
              <Button>Send for signing</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
