'use client';

import { useState } from 'react';
import { PasswordEntry } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Copy, ExternalLink } from 'lucide-react';

interface PasswordListProps {
  passwords: PasswordEntry[];
  onDelete: (id: string) => void;
}

export default function PasswordList({ passwords, onDelete }: PasswordListProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      {passwords.map((entry) => (
        <Card key={entry.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{entry.title}</h3>
              <p className="text-sm text-muted-foreground">{entry.username}</p>
              <div className="flex items-center space-x-2">
                <span className="font-mono">
                  {visiblePasswords[entry.id] ? entry.password : '••••••••'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePasswordVisibility(entry.id)}
                >
                  {visiblePasswords[entry.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(entry.password)}
                >
                  <Copy size={16} />
                </Button>
              </div>
              {entry.url && (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 flex items-center space-x-1"
                >
                  <ExternalLink size={14} />
                  <span>{entry.url}</span>
                </a>
              )}
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(entry.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}