import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, User, FileEdit } from 'lucide-react';
import { format } from 'date-fns';

export default function AuditLog() {
  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: async () => {
      const all = await base44.entities.AdminAuditLog.list('-created_date', 100);
      return all;
    }
  });

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Audit Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-zinc-500 text-center py-8">No audit logs yet</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div 
                key={log.id}
                className="bg-zinc-800 border border-zinc-700 p-4 rounded space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileEdit className="w-4 h-4 text-blue-500" />
                      <span className="text-white font-medium">{log.action}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {log.admin_email}
                      </span>
                      <span>Page: {log.page_id}</span>
                      {log.component_id && <span>ID: {log.component_id}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {format(new Date(log.created_date), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>

                {(log.old_value || log.new_value) && (
                  <div className="mt-3 space-y-1 text-xs">
                    {log.old_value && (
                      <div className="bg-zinc-900 p-2 rounded">
                        <span className="text-zinc-500">Old: </span>
                        <span className="text-zinc-400">{log.old_value.substring(0, 100)}...</span>
                      </div>
                    )}
                    {log.new_value && (
                      <div className="bg-zinc-900 p-2 rounded">
                        <span className="text-zinc-500">New: </span>
                        <span className="text-zinc-400">{log.new_value.substring(0, 100)}...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}