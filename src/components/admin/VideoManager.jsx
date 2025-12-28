import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Edit, Video as VideoIcon } from 'lucide-react';
import VideoEmbed from '@/components/ui/VideoEmbed';

const PAGES = ['Home', 'Services', 'Memberships', 'Team', 'About', 'Schedule', 'StartNow'];

export default function VideoManager({ userEmail }) {
  const [selectedPage, setSelectedPage] = useState('Home');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const queryClient = useQueryClient();

  const { data: videoContent = [], isLoading } = useQuery({
    queryKey: ['editableContent', 'video', selectedPage],
    queryFn: async () => {
      const all = await base44.entities.EditableContent.list();
      return all.filter(item => 
        item.content_type === 'video' && 
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
        action: 'Updated video',
        page_id: selectedPage,
        component_id: componentId,
        old_value: oldValue,
        new_value: newValue
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['editableContent']);
      toast.success('Video updated successfully');
      setEditingId(null);
      setEditValue('');
    },
    onError: (error) => {
      toast.error('Failed to update video');
      console.error(error);
    }
  });

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
            <VideoIcon className="w-5 h-5" />
            Manage Videos
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
            {videoContent.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">
                No editable videos found for this page.
              </p>
            ) : (
              videoContent.map(item => (
                <Card key={item.id} className="bg-zinc-800 border-zinc-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold">{item.label}</h3>
                      <span className="text-xs text-zinc-500">ID: {item.component_id}</span>
                    </div>

                    <div className="bg-zinc-900 p-4 rounded">
                      <VideoEmbed
                        url={editingId === item.id ? editValue : item.content_value}
                        title={item.label}
                      />
                    </div>

                    {editingId === item.id ? (
                      <>
                        <div>
                          <label className="text-sm text-zinc-400 mb-2 block">YouTube URL</label>
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="bg-zinc-900 border-zinc-600 text-white"
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                          <p className="text-xs text-zinc-500 mt-1">
                            Accepts: YouTube watch URLs, embed URLs, or youtu.be links
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleSave(item)}
                            size="sm"
                            disabled={updateMutation.isPending}
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
                          Change Video
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