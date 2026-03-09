"use client";

import React, { useState } from "react";
import Nav from "../Nav";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, ExternalLink } from "lucide-react";
import {Announcement} from "@/app/(public)/components/Nav";

// Sample Data

//
// const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
//   {
//     id: 1,
//     title: "Placeholder Announcement 1",
//     url: "https://example.com",
//     url_text: "Apply Now!",
//     desc: "Applications are now open for our new project. Click the link below to apply.",
//   },
//   {
//     id: 2,
//     title: "Placeholder Announcement 2",
//     url: "https://example.com",
//     url_text: "Register Here",
//     desc: "Tickets are now available for our upcoming event. Click the link below to purchase.",
//   },
//   {
//     id: 3,
//     title: "Placeholder Announcement 3",
//     url: "https://example.com",
//     url_text: "Save Your Spot",
//     desc: "Tickets are now available for our upcoming event. Click the link below to purchase.",
//   },
//   {
//     id: 4,
//     title: "Placeholder Announcement 4",
//     url: "NULL",
//     url_text: "NULL",
//     desc: "Example of an announcement without a link.",
//   },
// ];

// Empty Form State


const emptyForm = (): Omit<Announcement, "_id" | "createdAt"> => ({
  title: "",
  url: "",
  url_text: "",
  message: "",
  priority:0
});

// Main Component



export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Announcement, "_id"|"createdAt" >>(emptyForm());

  // Helpers

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setAnnouncements(result.data);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  const openEdit = (announcement: Announcement) => {
    setEditingId(announcement._id.toString());
    setForm({
      title: announcement.title || "",
      url: announcement.url || "",
      url_text: announcement.url_text || "",
      message: announcement.message || "",
      priority: announcement.priority ?? 0,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Delete failed");
      }

      // remove from UI
      setAnnouncements(prev => prev.filter(a => a._id !== id));

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;

    try {
      // Determine method and URL
      const isEdit = !!editingId;
      const url = isEdit
          ? `/api/announcements/${editingId}`
          : `/api/announcements`;
      const method = isEdit ? "PUT" : "POST";

      // Send request
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed request");
      }

      // Ensure _id is a string
      const updatedAnnouncement = {
        ...result.data,
        _id: result.data._id.toString(),
      };

      // Update frontend state
      if (isEdit) {
        setAnnouncements((prev) =>
            prev.map((a) => (a._id === editingId ? updatedAnnouncement : a))
        );
      } else {
        setAnnouncements((prev) => [...prev, updatedAnnouncement]);
      }

      // Reset form/dialog
      setDialogOpen(false);
      setForm(emptyForm());
      setEditingId(null);

    } catch (err) {
      console.error("Error saving announcement:", err);
    }
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
              <TableBody>
                {announcements.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-12">
                        No announcements yet. Create one to get started.
                      </TableCell>
                    </TableRow>
                )}

                {announcements.map((a) => {
                  if (!a?._id) return null; // skip invalid entries
                  return (
                      <TableRow
                          key={a._id.toString()}
                          onClick={() => openEdit(a)}
                          className="cursor-pointer border-b border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <TableCell className="text-white font-medium px-4 py-2 truncate">
                          {a.title}
                        </TableCell>
                        <TableCell className="text-gray-300 px-4 py-2 truncate">
                          {a.message}
                        </TableCell>
                        <TableCell className="text-gray-300 px-4 py-2 truncate">
                          {a.priority}
                        </TableCell>
                        <TableCell className="px-4 py-2">
                          {a.url ? (
                              <a
                                  href={a.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()} // stop row click
                                  className="flex items-center gap-1 text-[#b44fd4] hover:text-[#d07de8] transition-colors text-sm"
                              >
                                {a.url_text || "Link"}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                          ) : (
                              <span className="text-gray-500 text-sm">No Link</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center px-4 py-2">
                          <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleDelete(a._id.toString(), e)}
                              className="text-white/40 hover:text-red-400 hover:bg-red-400/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                  );
                })}
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
                    value={form.title || ""}
                    onChange={handleChange}
                    placeholder="Announcement title"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#791E94]"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="message" className="text-white/70">
                  Description
                </Label>
                <Textarea
                    id="message"
                    name="message"
                    value={form.message || ""}
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
                    value={form.url || ""}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#791E94]"
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="url" className="text-white/70">
                  Priority
                </Label>
                <Input
                    id="priority"
                    name="priority"
                    value={form.priority}
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
                    value={form.url_text || ""}
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