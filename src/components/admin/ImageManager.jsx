import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Edit, Image as ImageIcon, Upload } from 'lucide-react';

const PAGES = ['Home', 'Services', 'Memberships', 'Team', 'About', 'Schedule', 'StartNow'];

export default function ImageManager({ userEmail }) {
  const [selectedPage, setSelectedPage] = useState('Home');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: imageContent = [], isLoading } = useQuery({
    queryKey: ['editableContent', 'image', selectedPage],
    queryFn: async () => {
      const all = await base44.entities.EditableContent.list();
      return all.filter(item => 
        item.content_type === 'image' && 
        item.page_id === selectedPage
      );
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, newValue, oldValue, componentId }) => {
      await base44.entities.EditableContent.update(id, {
        content_value: newValue,
        last_updated_by: userEmail
      });

      await base44.entities.AdminAuditLog.create({
        admin_email: userEmail,
        action: 'Updated image',
        page_id: selectedPage,
        component_id: componentId,
        old_value: oldValue,
        new_value: newValue
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['editableContent']);
      toast.success('Image updated successfully');
      setEditingId(null);
      setEditValue('');
    },
    onError: (error) => {
      toast.error('Failed to update image');
      console.error(error);
    }
  });

  const handleFileUpload = async (e, item) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setEditValue(file_url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValue(item.content_value);
  };

  const handleSave = (item) => {
    if (editValue !== item.content_value) {
      updateMutation.mutate({
        id: item.id,
        newValue: editValue,
        oldValue: item.content_value,
        componentId: item.component_id
      });
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
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Manage Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Select Page</label>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {PAGES.map(page => (
                  <SelectItem key={page} value={page} className="text-white">
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 mt-6">
            {imageContent.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">
                No editable images found for this page.
              </p>
            ) : (
              imageContent.map(item => (
                <Card key={item.id} className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold">{item.label}</h3>
                      <span className="text-xs text-zinc-500">ID: {item.component_id}</span>
                    </div>

                    <div className="bg-zinc-900 p-4 rounded">
                      <img 
                        src={editingId === item.id ? editValue : item.content_value} 
                        alt={item.label}
                        className="max-w-full h-auto max-h-48 object-contain"
                      />
                    </div>

                    {editingId === item.id ? (
                      <>
                        <div>
                          <label className="text-sm text-zinc-400 mb-2 block">Image URL</label>
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-zinc-900 border-zinc-600 text-white"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="text-sm text-zinc-400 mb-2 block">Or Upload New Image</label>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, item)}
                            className="bg-zinc-900 border-zinc-600 text-white"
                            disabled={uploading}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleSave(item)}
                            size="sm"
                            disabled={updateMutation.isPending || uploading}
                          >
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button 
                            onClick={handleCancel}
                            variant="outline"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Button 
                          onClick={() => handleEdit(item)}
                          size="sm"
                          variant="outline"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Change Image
                        </Button>
                      </>
                    )}

                    {item.last_updated_by && (
                      <p className="text-xs text-zinc-500">
                        Last updated by: {item.last_updated_by}
                      </p>
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