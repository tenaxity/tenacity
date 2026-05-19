import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { ChatBubble } from '@/components/ui/chat-bubble'
import { ChatComposer } from '@/components/ui/chat-composer'
import { TypingIndicator } from '@/components/ui/typing-indicator'
import { StreamingText } from '@/components/ui/streaming-text'
import { ReferenceChip } from '@/components/ui/reference-chip'
import { Badge } from '@/components/ui/badge'

const SAMPLE_RESPONSE = 'Based on the SAFE agreement, the valuation cap is set at $10M with a 20% discount rate. The MFN clause in Section 3.1 gives investors the right to match more favorable terms offered in subsequent rounds.'

export function ChatStory() {
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [showStream, setShowStream] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSend = (v: string) => {
    setInput('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStreaming(true)
      setShowStream(true)
    }, 1200)
  }

  return (
    <div className="space-y-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Chat</h2>
        <p className="text-base text-subtle-foreground mt-1">
          ChatBubble, ChatComposer, TypingIndicator, StreamingText, and ReferenceChip.
        </p>
      </div>

      <Section label="Chat bubbles — all roles">
        <div className="space-y-3 max-w-lg">
          <ChatBubble role="system">
            You are a legal document analyst. Answer questions about the uploaded SAFE agreement.
          </ChatBubble>
          <ChatBubble role="user" avatar={<Avatar size="sm" initials="RG" />}>
            What's the valuation cap on this SAFE?
          </ChatBubble>
          <ChatBubble role="assistant" avatar={<Avatar size="sm" initials="AI" />}>
            The valuation cap is set at <strong>$10,000,000</strong>. This is specified in Section 1(c) of the agreement.
          </ChatBubble>
          <ChatBubble role="tool">
            <div className="flex items-center gap-2 mb-1">
              <Badge tone="neutral" variant="outline">tool_call</Badge>
              <span className="text-muted-foreground">search_document</span>
            </div>
            {'{"query": "valuation cap", "results": 3}'}
          </ChatBubble>
        </div>
      </Section>

      <Section label="Compact density">
        <div className="space-y-2 max-w-lg">
          <ChatBubble role="user" density="compact">Quick question — what's the discount rate?</ChatBubble>
          <ChatBubble role="assistant" density="compact">20% per Section 1(b).</ChatBubble>
        </div>
      </Section>

      <Section label="Reference chips">
        <div className="flex flex-wrap gap-2">
          <ReferenceChip number={1} title="SAFE Agreement, Section 1(c)" href="#" />
          <ReferenceChip number={2} title="Board Resolution — Apr 2026" href="#" />
          <ReferenceChip number={3} title="Cap Table Snapshot" href="#" />
        </div>
      </Section>

      <Section label="Typing indicator">
        <TypingIndicator />
        <div className="mt-2">
          <TypingIndicator label="Searching documents" />
        </div>
      </Section>

      <Section label="Streaming text">
        <div className="border border-border rounded-md p-4 bg-background max-w-lg">
          {showStream ? (
            <StreamingText
              text={SAMPLE_RESPONSE}
              speed={16}
              onComplete={() => setStreaming(false)}
            />
          ) : (
            <span className="text-muted-foreground">Click Send below to see the streaming demo.</span>
          )}
        </div>
      </Section>

      <Section label="Composer">
        <div className="max-w-lg space-y-3">
          <ChatComposer
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSend={handleSend}
            loading={loading}
            onStop={() => setLoading(false)}
          />
          <ChatComposer
            value=""
            disabled
            placeholder="Disabled state"
          />
        </div>
      </Section>

      {loading && (
        <Section label="Live: waiting for response">
          <TypingIndicator label="Analyzing document" />
        </Section>
      )}
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
