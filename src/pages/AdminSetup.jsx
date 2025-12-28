import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminSetup() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const inviteAdmin = async () => {
    setStatus('loading');
    try {
      await base44.users.inviteUser('kyberstrategygroup@gmail.com', 'admin');
      setStatus('success');
      setMessage('Admin user invited successfully! Check kyberstrategygroup@gmail.com for the invitation email with login instructions.');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to invite admin user. They may already be invited.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <Card className="max-w-lg w-full bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            Admin Setup
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Invite the admin user to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-zinc-800 border border-zinc-700 p-4 rounded space-y-2">
            <p className="text-sm text-zinc-300">
              <strong>Admin Email:</strong> kyberstrategygroup@gmail.com
            </p>
            <p className="text-sm text-zinc-300">
              <strong>Role:</strong> Admin
            </p>
          </div>

          {status === 'idle' && (
            <Button onClick={inviteAdmin} className="w-full">
              Send Admin Invitation
            </Button>
          )}

          {status === 'loading' && (
            <div className="text-center text-zinc-400 py-4">
              Sending invitation...
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-900/20 border border-green-700 p-4 rounded">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-medium mb-2">Success!</p>
                  <p className="text-sm text-zinc-300">{message}</p>
                  <p className="text-sm text-zinc-400 mt-3">
                    The admin user will receive an email with a link to set their password and access the Admin Dashboard.
                  </p>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-900/20 border border-red-700 p-4 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium mb-2">Error</p>
                  <p className="text-sm text-zinc-300">{message}</p>
                  <Button 
                    onClick={inviteAdmin} 
                    variant="outline" 
                    size="sm"
                    className="mt-3"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-zinc-500 space-y-1">
            <p>• This page sends an invitation through Base44's user management system</p>
            <p>• The admin will set their own password via the invitation email</p>
            <p>• Access this page at: /AdminSetup</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}