import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Key, Mail, Shield } from 'lucide-react';

export default function AdminSettings({ user }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordMutation = useMutation({
    mutationFn: async () => {
      // Note: Base44's password update functionality
      // This would need to be implemented via Base44's auth system
      throw new Error('Password update requires Base44 backend implementation');
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update password');
    }
  });

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    updatePasswordMutation.mutate();
  };

  return (
    <div className="space-y-6">
      {/* Account Info */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Account Information
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Your admin account details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Email</label>
            <Input
              value={user?.email || ''}
              disabled
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            <p className="text-xs text-zinc-500 mt-1">
              Email cannot be changed from the dashboard
            </p>
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Full Name</label>
            <Input
              value={user?.full_name || ''}
              disabled
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Role</label>
            <Input
              value={user?.role || ''}
              disabled
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Password Update */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Key className="w-5 h-5" />
            Change Password
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Update your password for enhanced security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="Enter new password (min 8 characters)"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="Confirm new password"
            />
          </div>

          <Button 
            onClick={handlePasswordUpdate}
            disabled={updatePasswordMutation.isPending}
          >
            Update Password
          </Button>

          <div className="bg-zinc-800 border border-zinc-700 p-4 rounded mt-4">
            <p className="text-sm text-zinc-400">
              <Shield className="w-4 h-4 inline mr-2" />
              Note: Password management is handled through Base44's authentication system.
              For full password reset functionality, contact Base44 support.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>• Your account has admin privileges with allowlist-based access</p>
            <p>• All actions are logged in the Audit Log</p>
            <p>• If you need to change your email, contact Base44 support</p>
            <p>• For initial login, use temporary password: <code className="bg-zinc-800 px-2 py-1 rounded">liftlab1!</code></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}