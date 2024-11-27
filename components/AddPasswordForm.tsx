'use client';

import { useState } from 'react';
import { PasswordEntry } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';

interface AddPasswordFormProps {
  onAdd: (entry: Omit<PasswordEntry, 'id'>) => void;
}

export default function AddPasswordForm({ onAdd }: AddPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      title: '',
      username: '',
      password: '',
      url: '',
      notes: '',
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Input
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
        <div>
          <Input
            type="url"
            placeholder="URL (optional)"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
        <div>
          <Input
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
        <Button type="submit" className="w-full">
          Add Password
        </Button>
      </form>
    </Card>
  );
}