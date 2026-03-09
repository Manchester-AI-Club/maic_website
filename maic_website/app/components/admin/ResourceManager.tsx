import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Column {
    key: string;
    label: string;
    type?: 'text' | 'date' | 'image';
}

interface FormField {
    key: string;
    label: string;
    type: 'text' | 'date' | 'textarea';
    required?: boolean;
}

interface ResourceManagerProps {
    title: string;
    apiEndpoint: string;
    columns: Column[];
    formFields: FormField[];
}

const ResourceManager: React.FC<ResourceManagerProps> = ({
    title,
    apiEndpoint,
    columns,
    formFields,
}) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<any | null>(null);
    const [formData, setFormData] = useState<any>({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(apiEndpoint);
            const json = await res.json();
            if (json.success) {
                setData(json.data);
            } else {
                setError(json.error || 'Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiEndpoint]);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const res = await fetch(`${apiEndpoint}?id=${id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
                fetchData();
            } else {
                alert(json.error || 'Failed to delete item');
            }
        } catch (err) {
            alert('An error occurred while deleting item');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = currentItem ? `${apiEndpoint}?id=${currentItem._id}` : apiEndpoint;
            const method = currentItem ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const json = await res.json();

            if (json.success) {
                setIsModalOpen(false);
                setFormData({});
                setCurrentItem(null);
                fetchData();
            } else {
                alert(json.error || 'Failed to save item');
            }
        } catch (err) {
            alert('An error occurred while saving item');
        }
    };

    const openModal = (item: any = null) => {
        setCurrentItem(item);
        setFormData(item || {});
        setIsModalOpen(true);
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-red-500 py-8">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <FaPlus /> Add New
                </button>
            </div>

            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800 text-gray-400 uppercase text-sm">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} className="px-6 py-3">
                                        {col.label}
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {data.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-800/50 transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-6 py-4">
                                            {col.type === 'date'
                                                ? new Date(item[col.key]).toLocaleDateString()
                                                : item[col.key]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button
                                            onClick={() => openModal(item)}
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-500">
                                        No items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold mb-6">
                            {currentItem ? `Edit ${title.slice(0, -1)}` : `Add New ${title.slice(0, -1)}`}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {formFields.map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">
                                        {field.label}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={formData[field.key] || ''}
                                            onChange={(e) =>
                                                setFormData({ ...formData, [field.key]: e.target.value })
                                            }
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                            rows={4}
                                            required={field.required}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            value={formData[field.key] || ''}
                                            onChange={(e) =>
                                                setFormData({ ...formData, [field.key]: e.target.value })
                                            }
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                                            required={field.required}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResourceManager;
