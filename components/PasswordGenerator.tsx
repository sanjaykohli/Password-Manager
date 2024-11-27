'use client';

import { useState } from 'react';
import { generatePassword } from '@/lib/crypto';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Copy, RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);

  const generateNewPassword = () => {
    const newPassword = generatePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecial
    );
    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Password Generator</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Password Length: {length}</span>
          <div className="w-64">
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              min={8}
              max={32}
              step={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Include Uppercase</span>
            <Switch
              checked={includeUppercase}
              onCheckedChange={setIncludeUppercase}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Include Lowercase</span>
            <Switch
              checked={includeLowercase}
              onCheckedChange={setIncludeLowercase}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Include Numbers</span>
            <Switch
              checked={includeNumbers}
              onCheckedChange={setIncludeNumbers}
            />
          </div>
          <div className="flex items-center justify-between">
            <span>Include Special Characters</span>
            <Switch
              checked={includeSpecial}
              onCheckedChange={setIncludeSpecial}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button onClick={generateNewPassword} className="flex items-center space-x-2">
            <RefreshCw size={16} />
            <span>Generate</span>
          </Button>
          {password && (
            <Button variant="outline" onClick={copyToClipboard} className="flex items-center space-x-2">
              <Copy size={16} />
              <span>Copy</span>
            </Button>
          )}
        </div>

        {password && (
          <div className="p-4 bg-muted rounded-md font-mono break-all">
            {password}
          </div>
        )}
      </div>
    </Card>
  );
}