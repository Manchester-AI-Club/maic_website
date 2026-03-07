"use client";

import { useState } from "react";
import Nav from "../Nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, ExternalLink } from "lucide-react";

// Sample Data

interface Announcement {
  id: number;
  title: string;
  url: string;
  url_text: string;
  desc: string;
}

const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "Placeholder Announcement 1",
    url: "https://example.com",
    url_text: "Apply Now!",
    desc: "Applications are now open for our new project. Click the link below to apply.",
  },
  {
    id: 2,
    title: "Placeholder Announcement 2",
    url: "https://example.com",
    url_text: "Register Here",
    desc: "Tickets are now available for our upcoming event. Click the link below to purchase.",
  },
  {
    id: 3,
    title: "Placeholder Announcement 3",
    url: "https://example.com",
    url_text: "Save Your Spot",
    desc: "Tickets are now available for our upcoming event. Click the link below to purchase.",
  },
  {
    id: 4,
    title: "Placeholder Announcement 4",
    url: "NULL",
    url_text: "NULL",
    desc: "Example of an announcement without a link.",
  },
];

// Empty Form State

const emptyForm = (): Omit<Announcement, "id"> => ({
  title: "",
  url: "",
  url_text: "",
  desc: "",
});

// Main Component

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(SAMPLE_ANNOUNCEMENTS);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Announcement, "id">>(emptyForm());

  // Helpers

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setForm({
      title: announcement.title,
      url: announcement.url,
      url_text: announcement.url_text,
      desc: announcement.desc,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;

    if (editingId !== null) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
    } else {
      const newId = Math.max(0, ...announcements.map((a) => a.id)) + 1;
      setAnnouncements((prev) => [...prev, { id: newId, ...form }]);
    }

    setDialogOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Render

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Nav />
      <main className="min-h-screen flex-1 flex flex-col px-8 md:px-16 lg:px-24 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-kode font-bold text-2xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white from-10% to-[#791E94] to-80% bg-clip-text text-transparent">
            Announcements 
          </h1>
          <Button
            onClick={openNew}
            className="flex items-center gap-2 bg-[#791E94] hover:bg-[#9a26bc] text-white border-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Announcement
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60 font-semibold">Title</TableHead>
                <TableHead className="text-white/60 font-semibold">Description</TableHead>
                <TableHead className="text-white/60 font-semibold">Link</TableHead>
                <TableHead className="text-white/60 font-semibold w-16 text-center">
                  Delete
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-white/40 py-12"
                  >
                    No announcements yet. Create one to get started.
                  </TableCell>
                </TableRow>
              )}
              {announcements.map((a) => (
                <TableRow
                  key={a.id}
                  onClick={() => openEdit(a)}
                  className="border-white/10 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <TableCell className="text-white font-medium max-w-[200px] truncate">
                    {a.title}
                  </TableCell>
                  <TableCell className="text-white/70 max-w-xs truncate">
                    {a.desc}
                  </TableCell>
                  <TableCell>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[#b44fd4] hover:text-[#d07de8] transition-colors text-sm"
                    >
                      {a.url_text}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(a.id, e)}
                      className="text-white/40 hover:text-red-400 hover:bg-red-400/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#111] border border-white/10 text-white sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-semibold">
              {editingId !== null ? "Edit Announcement" : "New Announcement"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="title" className="text-white/70">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Announcement title"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#791E94]"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="desc" className="text-white/70">
                Description
              </Label>
              <Textarea
                id="desc"
                name="desc"
                value={form.desc}
                onChange={handleChange}
                placeholder="Short description of the announcement"
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#791E94] resize-none"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="url" className="text-white/70">
                URL
              </Label>
              <Input
                id="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#791E94]"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="url_text" className="text-white/70">
                Link Text
              </Label>
              <Input
                id="url_text"
                name="url_text"
                value={form.url_text}
                onChange={handleChange}
                placeholder="e.g. Apply Now!"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#791E94]"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!form.title.trim()}
              className="bg-[#791E94] hover:bg-[#9a26bc] text-white cursor-pointer disabled:opacity-40"
            >
              {editingId !== null ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}