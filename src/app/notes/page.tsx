'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification, type Note } from '@/store/useGamification';
import {
    Plus,
    Search,
    Trash2,
    Edit2,
    Save,
    X,
    FileText,
    Tag,
    Calendar,
    BookOpen
} from 'lucide-react';

const categories = [
    { id: 'dsa', label: 'DSA', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { id: 'system-design', label: 'System Design', color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'behavioral', label: 'Behavioral', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'development', label: 'Development', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { id: 'general', label: 'General', color: 'text-gray-400', bg: 'bg-gray-400/10' },
] as const;

function NoteCard({
    note,
    onEdit,
    onDelete
}: {
    note: Note;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const category = categories.find(c => c.id === note.category) || categories[4];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-card rounded-xl p-5 border border-gray-700/30 hover:border-purple-500/30 transition-all group"
        >
            <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${category.bg} ${category.color}`}>
                    {category.label}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{note.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-3 whitespace-pre-wrap">{note.content}</p>

            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
        </motion.div>
    );
}

function NoteEditor({
    note,
    onSave,
    onCancel,
}: {
    note?: Note;
    onSave: (data: { title: string; content: string; category: Note['category'] }) => void;
    onCancel: () => void;
}) {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');
    const [category, setCategory] = useState<Note['category']>(note?.category || 'general');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({ title: title.trim(), content: content.trim(), category });
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 border border-purple-500/30 space-y-4"
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                    {note ? 'Edit Note' : 'New Note'}
                </h3>
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 outline-none text-white placeholder-gray-500"
                autoFocus
            />

            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${category === cat.id
                                ? `${cat.bg} ${cat.color} border border-current`
                                : 'bg-gray-800/50 text-gray-400 hover:text-white'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notes here... (Markdown supported)"
                rows={10}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 outline-none text-white placeholder-gray-500 resize-none font-mono text-sm"
            />

            <div className="flex gap-3">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Save Note
                </motion.button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </motion.form>
    );
}

export default function NotesPage() {
    const { notes, addNote, updateNote, deleteNote } = useGamification();
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [isEditing, setIsEditing] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | undefined>();

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            const matchesSearch = search === '' ||
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.content.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    }, [notes, search, categoryFilter]);

    const handleSave = (data: { title: string; content: string; category: Note['category'] }) => {
        if (editingNote) {
            updateNote(editingNote.id, data);
        } else {
            addNote(data);
        }
        setIsEditing(false);
        setEditingNote(undefined);
    };

    const handleEdit = (note: Note) => {
        setEditingNote(note);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditingNote(undefined);
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            📝 Notes & Journal
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        Capture your learnings, interview prep notes, and insights
                    </p>
                </motion.div>

                {/* Editor or Controls */}
                <AnimatePresence mode="wait">
                    {isEditing ? (
                        <NoteEditor
                            key="editor"
                            note={editingNote}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <motion.div
                            key="controls"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {/* Add Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsEditing(true)}
                                className="w-full py-4 rounded-xl border-2 border-dashed border-purple-500/30 text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Create New Note
                            </motion.button>

                            {/* Search and Filter */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search notes..."
                                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 outline-none text-white placeholder-gray-500"
                                    />
                                </div>
                                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                                    <button
                                        onClick={() => setCategoryFilter('all')}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === 'all'
                                                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                                : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        All
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setCategoryFilter(cat.id)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === cat.id
                                                    ? `${cat.bg} ${cat.color}`
                                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notes Grid */}
                {!isEditing && (
                    <>
                        {filteredNotes.length > 0 ? (
                            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <AnimatePresence>
                                    {filteredNotes.map((note) => (
                                        <NoteCard
                                            key={note.id}
                                            note={note}
                                            onEdit={() => handleEdit(note)}
                                            onDelete={() => deleteNote(note.id)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <BookOpen className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                    {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
                                </h3>
                                <p className="text-gray-500">
                                    {notes.length === 0
                                        ? 'Start capturing your learnings and interview prep!'
                                        : 'Try adjusting your search or filter'}
                                </p>
                            </motion.div>
                        )}
                    </>
                )}

                {/* Stats */}
                {!isEditing && notes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-xl p-6 border border-purple-500/20"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">{notes.length}</div>
                                <p className="text-sm text-gray-400">Total Notes</p>
                            </div>
                            {categories.map((cat) => {
                                const count = notes.filter(n => n.category === cat.id).length;
                                if (count === 0) return null;
                                return (
                                    <div key={cat.id} className="text-center">
                                        <div className={`text-2xl font-bold ${cat.color}`}>{count}</div>
                                        <p className="text-sm text-gray-400">{cat.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
