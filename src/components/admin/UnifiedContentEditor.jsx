import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Edit, Upload, Search, Filter } from 'lucide-react';
import { getAllPages, getPageContentKeys } from './ContentRegistry';
import VideoEmbed from '@/components/ui/VideoEmbed';

export default function UnifiedContentEditor({ userEmail }) {
  const [selectedPage, setSelectedPage] = useState('Home');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const queryClient = useQueryClient();

  const allPages = getAllPages();
  const pageDefinitions = getPageContentKeys(selectedPage);

  // Fetch existing content
  const { data: existingContent = [], isLoading } = useQuery({
    queryKey: ['editableContent', selectedPage],
    queryFn: async () => {
      const all = await base44.entities.EditableContent.list();
      return all.filter(item => item.page_id === selectedPage);
    }
  });

  // Merge definitions with existing content
  const contentItems = pageDefinitions.map(def => {
    const existing = existingContent.find(c => c.component_id === def.key);
    return {
      ...def,
      id: existing?.id,
      content_value: existing?.content_value || def.default,
      last_updated_by: existing?.last_updated_by,
      exists: !!existing
    };
  });

  // Filter content
  const filteredContent = contentItems.filter(item => {
    const matchesSearch = !searchTerm || 
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Create or update mutation
  const saveMutation = useMutation({
    mutationFn: async ({ item, newValue }) => {
      if (item.exists) {
        // Update existing
        await base44.entities.EditableContent.update(item.id, {
          content_value: newValue,
          last_updated_by: userEmail
        });
      } else {
        // Create new
        await base44.entities.EditableContent.create({
          page_id: selectedPage,
          component_id: item.key,
          content_type: item.type,
          content_value: newValue,
          label: item.label,
          last_updated_by: userEmail
        });
      }

      // Log the change
      await base44.entities.AdminAuditLog.create({
        admin_email: userEmail,
        action: `${item.exists ? 'Updated' : 'Created'} ${item.type}`,
        page_id: selectedPage,
        component_id: item.key,
        old_value: item.content_value,
        new_value: newValue
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['editableContent']);
      toast.success('Content updated successfully');
      setEditingId(null);
      setEditValue('');
    },
    onError: (error) => {
      toast.error('Failed to update content');
      console.error(error);
    }
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setEditValue(file_url);
      toast.success('File uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload file');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.key);
    setEditValue(item.content_value);
  };

  const handleSave = (item) => {
    if (editValue !== item.content_value) {
      saveMutation.mutate({ item, newValue: editValue });
    } else {
      setEditingId(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Site Content
          </CardTitle>
          <p className="text-sm text-zinc-400 mt-2">
            Manage all editable content across your website. Changes take effect immediately.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Page Selector */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Select Page</label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {allPages.map(page => (
                    <SelectItem key={page} value={page} className="text-white">
                      {page}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Filter by Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  <SelectItem value="all" className="text-white">All Types</SelectItem>
                  <SelectItem value="text" className="text-white">Text</SelectItem>
                  <SelectItem value="image" className="text-white">Images</SelectItem>
                  <SelectItem value="video" className="text-white">Videos</SelectItem>
                  <SelectItem value="link" className="text-white">Links</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-zinc-400 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search content..."
                  className="bg-zinc-800 border-zinc-700 text-white pl-10"
                />
              </div>
            </div>
          </div>

          {/* Content Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">
                Showing {filteredContent.length} of {contentItems.length} items
              </p>
            </div>

            {filteredContent.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">
                No content found matching your filters.
              </p>
            ) : (
              filteredContent.map((item) => (
                <Card key={item.key} className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-white font-bold mb-1">{item.label}</h3>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span>Type: {item.type}</span>
                          <span>•</span>
                          <span>Key: {item.key}</span>
                          {!item.exists && (
                            <>
                              <span>•</span>
                              <span className="text-yellow-500">Not yet created</span>
                            </>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${
                        item.type === 'text' ? 'bg-blue-900/50 text-blue-300' :
                        item.type === 'image' ? 'bg-green-900/50 text-green-300' :
                        item.type === 'video' ? 'bg-purple-900/50 text-purple-300' :
                        'bg-orange-900/50 text-orange-300'
                      }`}>
                        {item.type}
                      </span>
                    </div>

                    {/* Content Display/Edit */}
                    {editingId === item.key ? (
                      <div className="space-y-3">
                        {/* Text Editor */}
                        {item.type === 'text' && (
                          <Textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-zinc-900 border-zinc-600 text-white min-h-[100px]"
                            placeholder="Enter text content..."
                          />
                        )}

                        {/* Image Editor */}
                        {item.type === 'image' && (
                          <>
                            <div className="bg-zinc-900 p-4 rounded">
                              <img 
                                src={editValue} 
                                alt={item.label}
                                className="max-w-full h-auto max-h-48 object-contain mx-auto"
                              />
                            </div>
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="bg-zinc-900 border-zinc-600 text-white"
                              placeholder="https://..."
                            />
                            <div>
                              <label className="text-sm text-zinc-400 mb-2 block">Or Upload New</label>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="bg-zinc-900 border-zinc-600 text-white"
                                disabled={uploading}
                              />
                            </div>
                          </>
                        )}

                        {/* Video Editor */}
                        {item.type === 'video' && (
                          <>
                            <div className="bg-zinc-900 p-4 rounded">
                              <VideoEmbed url={editValue} title={item.label} />
                            </div>
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="bg-zinc-900 border-zinc-600 text-white"
                              placeholder="https://www.youtube.com/watch?v=..."
                            />
                            <p className="text-xs text-zinc-500">
                              Accepts: YouTube watch URLs, embed URLs, or youtu.be links
                            </p>
                          </>
                        )}

                        {/* Link Editor */}
                        {item.type === 'link' && (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-zinc-900 border-zinc-600 text-white"
                            placeholder="Page name or URL..."
                          />
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleSave(item)}
                            size="sm"
                            disabled={saveMutation.isPending || uploading}
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save Changes
                          </Button>
                          <Button 
                            onClick={handleCancel}
                            variant="outline"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Current Value Display */}
                        {item.type === 'text' && (
                          <p className="text-zinc-300 text-sm bg-zinc-900 p-3 rounded">
                            {item.content_value}
                          </p>
                        )}

                        {item.type === 'image' && (
                          <div className="bg-zinc-900 p-4 rounded">
                            <img 
                              src={item.content_value} 
                              alt={item.label}
                              className="max-w-full h-auto max-h-32 object-contain mx-auto"
                            />
                          </div>
                        )}

                        {item.type === 'video' && (
                          <div className="bg-zinc-900 p-2 rounded">
                            <VideoEmbed url={item.content_value} title={item.label} />
                          </div>
                        )}

                        {item.type === 'link' && (
                          <p className="text-zinc-300 text-sm bg-zinc-900 p-3 rounded font-mono">
                            {item.content_value}
                          </p>
                        )}

                        <Button 
                          onClick={() => handleEdit(item)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>

                        {item.last_updated_by && (
                          <p className="text-xs text-zinc-500">
                            Last updated by: {item.last_updated_by}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}