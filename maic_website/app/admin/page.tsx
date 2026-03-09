"use client";
import React, { useState } from "react";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import AdminTabs from "@/app/components/admin/AdminTabs";
import ResourceManager from "@/app/components/admin/ResourceManager";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("members");

    return (
        <div className="min-h-screen bg-black flex flex-col text-white">
            <Nav />

            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8 font-kode text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Admin Dashboard
                </h1>

                <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="mt-6">
                    {activeTab === "members" && (
                        <ResourceManager
                            title="Members"
                            apiEndpoint="/api/members"
                            columns={[
                                { key: "name", label: "Name" },
                                { key: "role", label: "Role" },
                                { key: "email", label: "Email" },
                            ]}
                            formFields={[
                                { key: "name", label: "Name", type: "text", required: true },
                                { key: "role", label: "Role", type: "text", required: true },
                                { key: "email", label: "Email", type: "text", required: true },
                                { key: "image", label: "Image URL", type: "text", required: false },
                                { key: "linkedin", label: "LinkedIn URL", type: "text", required: false },
                            ]}
                        />
                    )}

                    {activeTab === "events" && (
                        <ResourceManager
                            title="Events"
                            apiEndpoint="/api/events"
                            columns={[
                                { key: "title", label: "Title" },
                                { key: "date", label: "Date", type: "date" },
                                { key: "location", label: "Location" },
                            ]}
                            formFields={[
                                { key: "title", label: "Title", type: "text", required: true },
                                { key: "date", label: "Date", type: "date", required: true },
                                { key: "location", label: "Location", type: "text", required: true },
                                { key: "description", label: "Description", type: "textarea", required: true },
                                { key: "image", label: "Image URL", type: "text", required: false },
                                { key: "link", label: "Event Link", type: "text", required: false },
                            ]}
                        />
                    )}

                    {activeTab === "projects" && (
                        <ResourceManager
                            title="Projects"
                            apiEndpoint="/api/projects"
                            columns={[
                                { key: "title", label: "Title" },
                                { key: "status", label: "Status" },
                            ]}
                            formFields={[
                                { key: "title", label: "Title", type: "text", required: true },
                                { key: "description", label: "Description", type: "textarea", required: true },
                                { key: "status", label: "Status", type: "text", required: true },
                                { key: "image", label: "Image URL", type: "text", required: false },
                                { key: "github", label: "GitHub URL", type: "text", required: false },
                                { key: "demo", label: "Demo URL", type: "text", required: false },
                            ]}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
