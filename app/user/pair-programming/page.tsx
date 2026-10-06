"use client";
import { MessageSquareText, Users } from "lucide-react";
import { Badge, Button, Card, Grid, Page } from "@/components/ui";

const rooms = [
  { id: "PS-204", title: "Two Sum walkthrough", host: "Ananya Rao", participants: 2 },
  { id: "DB-101", title: "SQL joins practice", host: "Rohit Sharma", participants: 1 },
  { id: "BT-210", title: "Binary trees", host: "Meera Nair", participants: 3 },
];

export default function PairProgrammingPage() {
  return (
    <Page title="Pair Programming" sub="Collaborative coding rooms for peer learning, explanation, and live review.">
      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          aria-label="Room ID"
          placeholder="Enter room ID"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
        />
        <Button variant="primary">Join room</Button>
        <Button variant="secondary">Create room</Button>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Open rooms</h2>
          <Grid>
            {rooms.map((room) => (
              <Card key={room.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">{room.title}</h3>
                  <Badge tone="green">{room.participants} online</Badge>
                </div>
                <p className="text-sm text-slate-500">Hosted by {room.host}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1"><Users size={12} /> {room.id}</span>
                  <Button variant="secondary">Join</Button>
                </div>
              </Card>
            ))}
          </Grid>
        </div>

        <Card className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Session overview</h2>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Room ID</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">PS-204</p>
          </div>
          <div className="space-y-3">
            {[
              "Participants: 2",
              "WebRTC signaling ready in service layer",
              "Shared editor and chat interfaces are mocked for the prototype",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl border border-slate-200 p-3 text-sm text-slate-600">
                <MessageSquareText size={16} className="mt-0.5 text-indigo-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}
