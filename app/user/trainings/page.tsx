import { CalendarDays, MapPin } from "lucide-react";
import { Badge, Button, Card, Page } from "@/components/ui";
import { trainings } from "@/lib/data/mock-data";

export default function TrainingsPage() {
  return (
    <Page title="Trainings" sub="Upcoming training programs, mentor sessions, and registration details.">
      <div className="space-y-3">
        {trainings.map((training) => (
          <Card key={training.id} className="flex flex-col gap-3 transition hover:shadow-md sm:flex-row sm:items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{training.title}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1"><CalendarDays size={14} /> {training.date}</span>
                <span className="inline-flex items-center gap-1"><MapPin size={14} /> {training.trainer}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={training.status === "Registered" ? "green" : training.status === "Available" ? "brand" : "orange"}>{training.status}</Badge>
              <span className="text-sm text-slate-500">{training.duration}</span>
            </div>
            <Button variant={training.status === "Registered" ? "secondary" : "primary"} className="sm:w-auto">
              {training.status === "Registered" ? "View details" : "Register"}
            </Button>
          </Card>
        ))}
      </div>
    </Page>
  );
}
